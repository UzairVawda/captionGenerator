var express = require('express');
var router = express.Router();
var firebase = require("firebase/app");

/* GET home page. */
router.get('/', function(req, res, next) {
    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
            res.render('caption', { title: 'CC: Home' });
        } else {
            res.render('signin', { title: 'CC: Sign In', error: "Please sign in first!" });
        }
    });
});

router.post('/', function(req, res, next) {
    var caption = {
        caption: req.body.caption,
        hashtagOne: req.body.hashtagOne,
        hashtagTwo: req.body.hashtagTwo,
        hashtagThree: req.body.hashtagThree,
        username: firebase.auth().currentUser.email
    };
    console.log(caption);
    let addCaption = firebase.firestore().collection('captions').add(caption);
    return addCaption.then(function() {
        res.render('caption', { title: 'CC: Caption', message: 'Success' });
    });
});

module.exports = router;