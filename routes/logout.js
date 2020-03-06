const express = require('express');
const router = express.Router();
const firebase = require("firebase/app");

/* GET home page. */
router.get('/', function(req, res, next) {
    firebase.auth().signOut().then(function() {
        res.redirect('/');
    });
});
module.exports = router;