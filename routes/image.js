const express = require('express');
const router = express.Router();
const firebase = require('firebase/app');
const vision = require('@google-cloud/vision');

router.get('/', function(req, res, next) {
    const user = firebase.auth().currentUser;
    if (user) {
        res.render('image', {
            title: 'CC: Upload Image',
            loginFlag: true
        });
    } else {
        res.redirect('signin')
    }
});

router.post('/', async function(req, res, next) {
    //setup lables array and get arrary
    const imageHashtags = [];
    const userCaptions = [];
    const userImage = req.body.userImage;

    //vision lable detection
    const [result] = await client.labelDetection(userImage);
    const hashtag = result.labelAnnotations;
    hashtag.forEach(label => imageHashtags.push(label.description));

    //get all captions then compare 
    await captionRef.get().then(snapshot => {
            snapshot.forEach(doc => {
                for (var i = 0; i < imageHashtags.length; i++) {
                    if (imageHashtags[i] == doc.data().hashtagOne) {
                        userCaptions.push(doc.data().caption)
                    } else if (imageHashtags[i] == doc.data().hashtagTwo) {
                        userCaptions.push(doc.data().caption)
                    } else if (imageHashtags[i] == doc.data().hashtagThree) {
                        userCaptions.push(doc.data().caption)
                    }
                }
            });
        })
        .catch(err => {
            userCaptions.push('Error getting documents', err);
        });

    res.render('imageCaption', {
        title: 'CC: Upload Image',
        hashtags: imageHashtags,
        captions: userCaptions,
        image: userImage,
        loginFlag: true
    });
});

module.exports = router;