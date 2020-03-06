const functions = require('../public/javascript/functions');
const firebase = require('firebase/app');
const vision = require('@google-cloud/vision');
const client = new vision.ImageAnnotatorClient({
    keyFilename: 'CaptionGenerator.json'
});

function render(req, res, next) {
    const user = firebase.auth().currentUser;
    if (user) {
        res.render('image', {
            title: 'CC: Upload Image',
            loginFlag: true
        });
    } else {
        res.redirect('signin');
    };
}

async function checkImage(req, res, next) {
    //setup lables array and get arrary
    var unique = [];
    const imageHashtags = [];
    const userCaptions = [];
    const userImage = req.body.userImage;
    const captionRef = firebase.firestore().collection('captions');

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

    if (userCaptions.length == 0) {
        userCaptions.push('Failed to find a caption for this image! Try uploading a caption!');
        res.render('imageCaption', {
            title: 'CC: Upload Image',
            hashtags: imageHashtags,
            captions: userCaptions,
            image: userImage,
            loginFlag: true
        });

    } else {
        unique = functions.cleanArray(userCaptions)
        res.render('imageCaption', {
            title: 'CC: Upload Image',
            hashtags: imageHashtags,
            captions: unique,
            image: userImage,
            loginFlag: true
        });
    }
}


module.exports = {
    checkImage: checkImage,
    render: render
}