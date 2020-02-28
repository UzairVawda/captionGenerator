var express = require('express');
var router = express.Router();
var firebase = require('firebase/app');
const vision = require('@google-cloud/vision');
const client = new vision.ImageAnnotatorClient({
    keyFilename: 'CaptionGenerator.json'
});

/* GET home page. */
router.get('/', function(req, res, next) {
    const user = firebase.auth().currentUser;
    // res.setHeader('content-type', 'text/html');
    if (user) {
        console.log("Image.js render method, user is logged in");
        res.render('image', {
            title: 'CC: Upload Image',
            loginFlag: true
        });
    } else {
        console.log("Image.js render method, user is NOT logged in");
        res.redirect('signin')
    }
});

router.post('/', async function(req, res, next) {
    const imageLables = [];
    const image = req.body.userImage
    const [result] = await client.labelDetection(image);
    const labels = result.labelAnnotations;
    labels.forEach(label => imageLables.push(label.description));
    res.render('image', {
        title: 'CC: Upload Image',
        labels: imageLables,
        loginFlag: true
    });
});

module.exports = router;