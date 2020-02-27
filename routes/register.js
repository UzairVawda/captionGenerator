var express = require('express');
var router = express.Router();
var firebase = require("firebase/app");

// GET home page.
router.get('/', function(req, res, next) {
    const user = firebase.auth().currentUser;
    // // res.setHeader('content-type', 'text/html');
    if (user) {
        console.log("Register.js render method, user is logged in");
        res.redirect('image');
    } else {
        console.log("Resgister.js render method, user is NOT logged in");
        res.render('register', {
            title: 'CC: Register',
            loginFlag: false
        });
    };
});

// post information to db
router.post('/', function(req, res, next) {
    //get user information
    var item = {
        username: req.body.usernameRegister,
        email: req.body.emailRegister,
        password: req.body.passwordRegister,
        confirmPassword: req.body.confirmPasswordRegister
    };

    var user = {
        username: req.body.usernameRegister,
        email: req.body.emailRegister,
        password: req.body.passwordRegister,
    };

    //register users
    if (item.password === item.confirmPassword) {
        //create user and login
        firebase.auth().createUserWithEmailAndPassword(item.email, item.password).then(function() {
            let addUser = firebase.firestore().collection('users').add(user);
            return addUser.then(function() {
                // res.setHeader('content-type', 'text/html');
                console.log("register.js submit method, Registering a users");
                res.redirect('image');
            });
        });
    } else {
        // if password and confirm dont match
        // res.setHeader('content-type', 'text/html');
        console.log("register.js submit method, FAILED to register a users");
        res.render('register', {
            title: "CC: Register Failed",
            error: "Password and Confirm password do not match!",
            loginFlag: false
        })
    }
});

module.exports = router;