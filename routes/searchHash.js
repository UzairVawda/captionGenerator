const express = require('express');
const router = express.Router();
const firebase = require('firebase/app');

router.get('/', function(req, res, next) {
    console.log("here")
    res.render('searchedHash');
    // const search = req.query.search;
    // console.log("search: " + search)
    // res.render('searchedHashtags', {
    //     title: 'CC: Search for ' + search,
    //     searchedTag: search,
    //     loginFlag: true
    // });
});