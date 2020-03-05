const express = require('express');
const router = express.Router();
const firebase = require("firebase/app");

// GET home page.
router.get('/', function(req, res, next) {
    const user = firebase.auth().currentUser;
    // // res.setHeader('content-type', 'text/html');
    if (user) {
        res.redirect('image');
    } else {
        res.render('register', {
            title: 'CC: Register',
            loginFlag: false
        });
    };
});

// post information to db
router.post('/', function(req, res, next) {
    //get user information
    const username = req.body.usernameRegister
    const email = req.body.emailRegister
    const password = req.body.passwordRegister
    const confirmPassword = req.body.confirmPasswordRegister

    //register users
    if (password === confirmPassword) {
        //create user and login
        firebase.auth().createUserWithEmailAndPassword(email, password).then(function() {
            const addUser = firebase.firestore().collection('users').add({
                username: username,
                email: email,
                password: password
            });
            return addUser.then(function() {
                res.redirect('image');
            });
        });
    } else {
        // if password and confirm dont match
        res.render('register', {
            title: "CC: Register Failed",
            error: "Password and Confirm password do not match!",
            loginFlag: false
        })
    }
});

module.exports = router;