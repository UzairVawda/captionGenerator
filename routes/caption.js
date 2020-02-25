var express = require('express');
var router = express.Router();
var firebase = require("firebase/app");

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('caption', { title: 'CC: Home' });
});

module.exports = router;