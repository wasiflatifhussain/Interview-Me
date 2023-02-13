//jshint esversion:6
const express = require("express");
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt");
const Joi = require("joi");
const jwt = require("jsonwebtoken");

JWTPRIVATEKEY = "urppissmol";

const cors = require("cors");

const app = express();

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

app.get("/users", (req,res) => {
    res.json(users)
})

app.post("/users/register", async (req,res) => {
    // try {
    //     const salt = await bcrypt.genSalt();
    //     const hashedPassword = await bcrypt.hash(req.body.password, salt)
    //     console.log(salt)
    //     console.log(hashedPassword)
    //     const user = new User({
    //         email: req.body.email, 
    //         password: hashedPassword
    //     });
    //     user.save(function(err) {
    //         if (err) {
    //             console.log("Unsuccessful Sign-Up Attempt.")
    //         } else {
    //             console.log("Successful Sign-Up.")
    //         }
    //     })
    //     // users.push(user)
    //     res.status(201).send()
    // } catch {
    //     res.status(500).send()
    // }
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

    // const emailAdd = req.body.email;
    // const password = req.body.password;
    // User.findOne({email: emailAdd}, function(err,foundUser) {
    //     if (err) {
    //         console.log(err);
    //     }
    //     else {
    //         if (foundUser) {
    //             bcrypt.compare(password, foundUser.password,function(err, result) {
    //                 if (result === true) {
    //                     console.log("Login Successful!")
    //                     res.send(foundUser)
    //                     //res.render("Login Success!");
    //                 }
    //                 else {
    //                     console.log("Incorrect Password!")
    //                     //res.render("Incorrect Password!")
    //                 }
    //             })
    //         }
    //     }
    // })
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
		res.status(200).send({ token: token, message: "Logged in successfully" });
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