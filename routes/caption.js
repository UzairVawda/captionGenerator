var express = require('express');
var router = express.Router();
var firebase = require("firebase/app");

/* GET home page. */
router.get('/', function(req, res, next) {
    const user = firebase.auth().currentUser;
    // res.setHeader('content-type', 'text/html');
    if (user) {
        console.log("Caption.js render method, user is logged in");
        res.render('caption', {
            title: 'CC: Home',
            loginFlag: true
        });
    } else {
        console.log("Caption.js render method, user is NOT logged in");
        res.redirect('signin');
    };
});

router.post('/', function(req, res, next) {
    var caption = {
        caption: req.body.caption,
        hashtagOne: req.body.hashtagOne,
        hashtagTwo: req.body.hashtagTwo,
        hashtagThree: req.body.hashtagThree,
        username: firebase.auth().currentUser.email
    };
    // console.log(caption);
    let addCaption = firebase.firestore().collection('captions').add(caption);
    // res.setHeader('content-type', 'text/html');
    console.log("Caption.js submit method, Adding Caption");
    return addCaption.then(function() {
        res.render('caption', {
            title: 'CC: Caption',
            message: 'Successfull added your caption!',
            loginFlag: true
        });
    });
});
module.exports = router;