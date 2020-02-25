var express = require('express');
var router = express.Router();
var firebase = require("firebase/app");

/* GET home page. */
router.get('/', function(req, res, next) {
    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
            firebase.auth().signOut();
            console.log("was logged in, now logged out");
            res.render('index', { title: 'CC: Logging Out', message: 'You are now logged out!' });
        } else {
            console.log("was never logged in, render");
            res.render('signin', { title: 'CC: Logging Out', message: 'You were never logged in!' });
        };
    });
});
module.exports = router;