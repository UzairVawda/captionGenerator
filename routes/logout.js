var express = require('express');
var router = express.Router();
var firebase = require("firebase/app");

/* GET home page. */
router.get('/', function(req, res, next) {
    firebase.auth().signOut().then(function() {
        console.log("Logout.js render method, user is logged OUT");
        res.redirect('index');
    });
});
module.exports = router;