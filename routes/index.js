var express = require('express');
var router = express.Router();
var firebase = require("firebase/app");

/* GET home page. */
router.get('/', function(req, res, next) {
    // res.setHeader('content-type', 'text/html');
    const user = firebase.auth().currentUser;
    if (user) {
        console.log("Index.js render method, user is logged in");
        res.render('index', {
            title: 'CC: Home',
            loginFlag: true
        });
    } else {
        console.log("Index.js render method, user is NOT logged in");
        res.render('index', {
            title: 'CC: Home',
            loginFlag: false
        })
    }
});

module.exports = router;