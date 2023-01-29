//jshint esversion:6
const express = require("express");
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt");

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

const User = new mongoose.model("User",userSchema);

app.get("/users", (req,res) => {
    res.json(users)
})

app.post("/users/register", async (req,res) => {
    try {
        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(req.body.password, salt)
        console.log(salt)
        console.log(hashedPassword)
        const user = new User({
            email: req.body.email, 
            password: hashedPassword
        });
        user.save(function(err) {
            if (err) {
                console.log("Unsuccessful Sign-Up Attempt.")
            } else {
                console.log("Successful Sign-Up.")
            }
        })
        // users.push(user)
        res.status(201).send()
    } catch {
        res.status(500).send()
    }

});

app.post("/users/login", (req,res) => {

    const emailAdd = req.body.email;
    const password = req.body.password;
    User.findOne({email: emailAdd}, function(err,foundUser) {
        if (err) {
            console.log(err);
        }
        else {
            if (foundUser) {
                bcrypt.compare(password, foundUser.password,function(err, result) {
                    if (result === true) {
                        console.log("Login Successful!")
                        res.send(foundUser)
                        //res.render("Login Success!");
                    }
                    else {
                        console.log("Incorrect Password!")
                        //res.render("Incorrect Password!")
                    }
                })
            }
        }
    })
})

//starts server at TCP port 8000
app.listen(8000, () => {
    console.log("Server started on port 8000.");
})