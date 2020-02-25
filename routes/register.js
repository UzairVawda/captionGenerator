var express = require('express');
var router = express.Router();
var firebase = require("firebase/app");

// GET home page.
router.get('/', function(req, res, next) {
    res.render('register', { title: 'CC: Register' });
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
                res.render('image', { title: 'CC: Upload Image' })
            });
        });
    } else {
        // if password and confirm dont match
        res.render('register', { title: "CC: Register Failed", error: "Password and Confirm password do not match!" })
    }
});

module.exports = router;