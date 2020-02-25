var express = require('express');
var router = express.Router();
var firebase = require("firebase/app");

/* GET home page. */
router.get('/', function(req, res, next) {
    console.log("SHOULD LOG OUT")
    firebase.auth().signOut().then(function() {
        res.render('signin', { title: 'CC: Logging Out', error: 'You were logged out!' });
    }).catch(function() {
        res.render('index', { title: 'CC: Logging Out', message: 'You were never logged in!' });
    });
});

module.exports = router;