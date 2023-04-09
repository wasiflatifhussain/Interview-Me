//jshint esversion:6
const express = require("express");
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt");
const Joi = require("joi");
const jwt = require("jsonwebtoken");
const aws = require("aws-sdk");
const multer = require('multer');
const multerS3 = require('multer-s3');
require("dotenv").config();

JWTPRIVATEKEY = "urppissmol";

const cors = require("cors");

const app = express();

const s3 = new aws.S3({
  accessKeyId: process.env.REACT_APP_ACCESS,
  secretAccessKey: process.env.REACT_APP_SECRET
});

const upload = multer();

app.set('view engine','ejs');
// app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(express.static("public"));
app.use(cors());
app.use(express.json())

const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/interview-me',{useNewURLParser: true});

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, "Email address is needed for sign-up-schema"],
        unique: [true, "This email address already exists"]
    },
    password: {
        type: String,
        required: [true, "Password is needed for sign-up-schema"]
    }
});

userSchema.methods.generateAuthToken = function () {
	const token = jwt.sign({ _id: this._id }, JWTPRIVATEKEY, {
		expiresIn: "1y",
	});
	return token;
};

const User = new mongoose.model("User",userSchema);

app.post("/users/upload/cv",upload.single("file"),(req,res) => {
  // extract the uploaded file from the form data
  const file = req.file;
  
  // extract the user ID from the form data
  const userName = req.body.userName;
  
  // upload the file to the user's folder in the S3 bucket
  const bucketName = 'interview-me-wasif';
  const userFolder = `user_uploads/${userName}/resumes`;
  const params = {
    Bucket: bucketName,
    Key: `${userFolder}/${file.originalname}`,
    Body: file.buffer
  };
  
  s3.upload(params, (err, data) => {
    if (err) {
	  console.log("error bro")
      console.error(err);
      res.status(500).send('Error uploading file to S3');
    } else {
      console.log(`File uploaded successfully to ${data.Location}`);
      res.send('File uploaded successfully');
    }
  });
})

app.post("/users/upload/cover",upload.single("file"),(req,res) => {
  // extract the uploaded file from the form data
  const file = req.file;
  
  // extract the user ID from the form data
  const userName = req.body.userName;
  console.log(req.file);
  
  // upload the file to the user's folder in the S3 bucket
  const bucketName = 'interview-me-wasif';
  const userFolder = `user_uploads/${userName}/covers`;
  const params = {
    Bucket: bucketName,
    Key: `${userFolder}/${file.originalname}`,
    Body: file.buffer
  };
  
  s3.upload(params, (err, data) => {
    if (err) {
	  console.log("error bro")
      console.error(err);
      res.status(500).send('Error uploading file to S3');
    } else {
      console.log(`File uploaded successfully to ${data.Location}`);
      res.send('File uploaded successfully');
    }
  });
})

app.get("/users/resumes", async (req, res) => {
    //extract the uploaded file from the form data
	// const file = req.file;
	
	// extract the user ID from the form data
	const userName = req.query.userName;

	// const userName = "newbro@gmail.com";
	
	// upload the file to the user's folder in the S3 bucket
	const bucketName = 'interview-me-wasif';
	const userFolder = `user_uploads`;
	const params = {
		Bucket: bucketName,
		Prefix: `${userFolder}/${userName}/resumes`
	};
	let files = await s3.listObjectsV2(params).promise()

			let fileData = files.Contents.map(item => item);
			res.send(fileData)
		
})

// https://www.youtube.com/watch?v=hpO_3GwmBAk&ab_channel=AdityaJoshi
app.get("/download/resumes", async (req, res) => {
  const fileName = req.params.fileName;
  const userName = req.query.userName;
  // Key : `${userFolder}/${userName}/resumes/${fileName}`
	const bucketName = 'interview-me-wasif';
	const userFolder = `user_uploads`;
	const params = {
		Bucket: bucketName,
    Key: `${userFolder}/${userName}/resumes/${fileName}`
  }
  let fileRetrieved = await s3.getObject(params).promise();
  res.send(fileRetrieved.Body);
})

app.get("/users/covers", async (req, res) => {
    //extract the uploaded file from the form data
	// const file = req.file;
	
	// extract the user ID from the form data
	const userName = req.query.userName;

	// const userName = "newbro@gmail.com";
	
	// upload the file to the user's folder in the S3 bucket
	const bucketName = 'interview-me-wasif';
	const userFolder = `user_uploads`;
	const params = {
		Bucket: bucketName,
		Prefix: `${userFolder}/${userName}/covers`
	};
	let files = await s3.listObjectsV2(params).promise()

			let fileData = files.Contents.map(item => item);
			res.send(fileData)
		
})

// https://www.youtube.com/watch?v=hpO_3GwmBAk&ab_channel=AdityaJoshi
app.get("/download/covers", async (req, res) => {
  const fileName = req.params.fileName;
  const userName = req.query.userName;
  // Key : `${userFolder}/${userName}/resumes/${fileName}`
	const bucketName = 'interview-me-wasif';
	const userFolder = `user_uploads`;
	const params = {
		Bucket: bucketName,
    Key: `${userFolder}/${userName}/coverss/${fileName}`
  }
  let fileRetrieved = await s3.getObject(params).promise();
  res.send(fileRetrieved.Body);
})

app.get("/users", (req,res) => {
    res.json(users)
})

app.post("/users/register", async (req,res) => {
    console.log(req.body.email)
	try {
		const { error } = validateReg(req.body);
		if (error)
			return res.status(400).send({ message: error.details[0].message });

        const user = await User.findOne({ email: req.body.email });
		if (user)
			return res
				.status(409)
				.send({ message: "User with given email already Exist!" });
		const salt = await bcrypt.genSalt(Number(process.env.SALT));
		const hashPassword = await bcrypt.hash(req.body.password, salt);
        const emailAddr = req.body.email
        console.log("Password salted and email ready for entering into database!")
        const obj = new User({email: emailAddr, password: hashPassword})
        obj.save(function (err) {
            if (err) throw err;
        });
		res.status(201).send({ message: "User created successfully" });
	} catch (error) {
		res.status(500).send({ message: "Internal Server Error" });
	}

});

app.post("/users/login", async (req,res) => {
	try {
		const { error } = validateLogin(req.body);
		if (error)
			return res.status(400).send({ message: error.details[0].message });

		const user = await User.findOne({ email: req.body.email });
		if (!user)
			return res.status(401).send({ message: "Invalid Email or Password" });

		const validPassword = await bcrypt.compare(
			req.body.password,
			user.password
		);
		if (!validPassword)
			return res.status(401).send({ message: "Invalid Password" });
        
        console.log("User verified")
		const token = user.generateAuthToken();
        console.log("Generated auth token")
		res.status(200).send({ email: req.body.email, token: token, message: "Logged in successfully" });
	} catch (error) {
		res.status(500).send({ message: "Internal Server Error" });
	}
})

const validateReg = (data) => {
	const schema = Joi.object({
		email: Joi.string().email().required().label("Email"),
		password: Joi.string().required().label("Password"),
        // confirm: Joi.string().required().label("Confirm")
	});
	return schema.validate(data);
};

const validateLogin = (data) => {
	const schema = Joi.object({
		email: Joi.string().email().required().label("Email"),
		password: Joi.string().required().label("Password"),
	});
	return schema.validate(data);
};

//starts server at TCP port 8000
app.listen(8000, () => {
    console.log("Server started on port 8000.");
})