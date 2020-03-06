const firebase = require("firebase/app");

function render(req, res, next) {
    const user = firebase.auth().currentUser;
    if (user) {
        res.render('caption', {
            title: 'CC: Home',
            loginFlag: true
        });
    } else {
        req.session.message = 'Please login first!';
        res.redirect('signin');
    };
}

function addCaption(req, res, next) {
    const caption = {
        caption: req.body.caption,
        hashtagOne: req.body.hashtagOne,
        hashtagTwo: req.body.hashtagTwo,
        hashtagThree: req.body.hashtagThree,
        username: firebase.auth().currentUser.email
    };
    const addCaption = firebase.firestore().collection('captions').add(caption);
    return addCaption.then(function() {
        res.render('caption', {
            title: 'CC: Caption',
            message: 'Successfull added your caption!',
            loginFlag: true
        });
    });
}

module.exports = {
    addCaption: addCaption,
    render: render
}