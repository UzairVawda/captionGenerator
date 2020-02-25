var express = require('express');
var router = express.Router();
var firebase = require("firebase/app");

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', { title: 'CC: Home' });
});

module.exports = router;