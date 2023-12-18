const express = require('express');
const passport = require('passport');
const { isLoggedIn, isNotLoggedIn } = require('../middlewares');


const router = express.Router()

router.get('/google', isNotLoggedIn,passport.authenticate('google',{
     scope: ['profile', 'email', 'https://www.googleapis.com/auth/youtube.readonly'] 
    }));

router.get('/google/callback',isNotLoggedIn, passport.authenticate('google', {
  failureRedirect: '/',
}), (req, res) => {
  res.redirect('/main');
});

module.exports = router