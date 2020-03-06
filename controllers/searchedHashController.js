const firebase = require('firebase/app');
const functions = require('../public/javascript/functions');

async function searchedHash(req, res, next) {
    const captions = [];
    const search = req.body.search;
    const user = firebase.auth().currentUser;
    const captionRef = firebase.firestore().collection('captions');

    await captionRef.get().then(snapshot => {
            snapshot.forEach(doc => {
                if (search == doc.data().hashtagOne.toLowerCase()) {
                    errorFlag = true;
                    captions.push(doc.data().caption);
                } else if (search == doc.data().hashtagTwo.toLowerCase()) {
                    captions.push(doc.data().caption);
                } else if (search == doc.data().hashtagThree.toLowerCase()) {
                    captions.push(doc.data().caption);
                }
            });
        })
        .catch(err => {
            userCaptions.push('Error getting documents', err);
        });

    if (captions.length == 0) {
        captions.push('Failed to find a caption related to ' + search);
    }

    if (user) {
        res.render('searchedHash', {
            title: 'CC: Search for ' + search,
            search: search,
            captions: captions,
            loginFlag: true
        });
    } else {
        res.render('searchedHash', {
            title: 'CC: Search for ' + search,
            search: search,
            captions: captions,
            loginFlag: false
        });
    }
}

module.exports.searchedHash = searchedHash;