const express = require('express');
const router = express.Router();
const firebase = require('firebase/app');

router.post('/', async function(req, res, next) {
    const captions = [];
    const search = req.body.search;
    const captionRef = firebase.firestore().collection('captions');

    await captionRef.get().then(snapshot => {
            snapshot.forEach(doc => {
                if (search == doc.data().hashtagOne.toLowerCase()) {
                    captions.push(doc.data().caption)
                } else if (search == doc.data().hashtagTwo.toLowerCase()) {
                    captions.push(doc.data().caption)
                } else if (search == doc.data().hashtagThree.toLowerCase()) {
                    captions.push(doc.data().caption)
                } else {
                    captions.push("Failed to find captions relating to " + search)
                }
            });
        })
        .catch(err => {
            userCaptions.push('Error getting documents', err);
        });

    res.render('searchedHash', {
        title: 'CC: Search for ' + search,
        search: search,
        captions: captions,
        loginFlag: true
    });
});
module.exports = router;