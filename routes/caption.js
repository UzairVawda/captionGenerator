var express = require('express');
var router = express.Router();
var firebase = require("firebase/app");

/* GET home page. */
router.get('/', function(req, res, next) {
    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
            res.render('caption', { title: 'CC: Home' });
        } else {
            res.render('signIn', { title: 'CC: Sign In', error: "Please sign in first!" })
        }
    });
});

module.exports = router;