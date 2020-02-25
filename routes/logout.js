var express = require('express');
var router = express.Router();
var firebase = require("firebase/app");

/* GET home page. */
router.get('/', function(req, res, next) {
    console.log("SHOULD LOG OUT")
    firebase.auth().signOut().then(function() {
        res.render('index', { title: 'CC: Logging Out', message: 'You are now logged out!' });
    }).catch(function(error) {
        res.render('index', { title: 'CC: Logging Out', message: 'You were never logged in!' });
    });
});

module.exports = router;