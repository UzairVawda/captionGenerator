var express = require('express');
var router = express.Router();
var firebase = require("firebase/app");

/* GET home page. */
router.get('/', function(req, res, next) {
    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
            console.log("was logged in, now to upload page");
            res.render('image', { title: 'CC: Upload Image' });
        } else {
            console.log("was never logged in, now to login ");
            res.render('signIn', { title: 'CC: Sign In', error: "Please sign in first!" })
        }
    });
});

module.exports = router;