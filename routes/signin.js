var express = require('express');
var router = express.Router();
var firebase = require("firebase/app");

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('signin', { title: 'CC: Sign In' });
});

router.post('/', function(req, res, next) {
    var item = {
        email: req.body.emailSignin,
        password: req.body.passwordSiginin,
    };
    //signin users
    firebase.auth().signInWithEmailAndPassword(item.email, item.password).then(function() {
        res.render('image', { title: 'CC: Upload Image' })
    }).catch(function(error) {
        var errorMessage = error.message;
        res.render('signIn', { title: 'CC: Failed Sign In', error: errorMessage })
    });

});

module.exports = router;