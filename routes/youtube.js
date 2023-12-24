const express = require('express');
const { google } = require('googleapis');
const OAuth2 = google.auth.OAuth2
const axios = require('axios')

const { isLoggedIn } = require('../middlewares');

const router = express.Router()



router.get('/subscription',isLoggedIn,async  (req,res)=>{

    var oauth2Client = new OAuth2(
        process.env.GOOGLE_ID,
        process.env.GOOGLE_SECRET,
        process.env.CALLBACK
    );

    oauth2Client.credentials = {
        access_token: req.user.accessToken,
        refresh_token: req.user.refreshToken
    };

    const result = await getSubscriptionList(oauth2Client)
    
    console.log(">>> result :", result)
    res.json(result)

})

module.exports = router
