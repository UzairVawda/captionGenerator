const express = require('express');
const router = express.Router();
const firebase = require("firebase/app");

/* GET home page. */
router.get('/', function(req, res, next) {
    const user = firebase.auth().currentUser;
    if (user) {
        res.render('index', {
            title: 'CC: Home',
            loginFlag: true
        });
    } else {
        res.render('index', {
            title: 'CC: Home',
            loginFlag: false
        })
    }
});

module.exports = router;