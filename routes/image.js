var express = require('express');
var router = express.Router();
var firebase = require("firebase/app");

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('image', { title: 'CC: Upload Image' });
});

module.exports = router;