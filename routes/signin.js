const express = require('express');
const router = express.Router();
const firebase = require("firebase/app");

/* GET home page. */
router.get('/', function(req, res, next) {
    const user = firebase.auth().currentUser;
    // res.setHeader('content-type', 'text/html');
    if (user) {
        console.log("Signin.js render method, user is logged in");
        res.redirect('image');
    } else {
        console.log("Signin.js render method, user is NOT logged in");
        res.render('signin', {
            title: 'CC: Sign In',
            loginFlag: false
        });
    };
});

router.post('/', function(req, res, next) {
    const item = {
        email: req.body.emailSignin,
        password: req.body.passwordSiginin,
    };
    //signin users
    firebase.auth().signInWithEmailAndPassword(item.email, item.password).then(function() {
        console.log("Sigin.js submit method, login successful");
        res.redirect('image');
    }).catch(function(error) {
        var errorMessage = error.message;
        // res.setHeader('content-type', 'text/html');
        console.log("Sigin.js submit method, Failed to login");
        res.render('signIn', {
            title: 'CC: Failed Sign In',
            error: errorMessage,
            loginFlag: false
        });
    });
});

module.exports = router;