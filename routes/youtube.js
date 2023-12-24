const express = require('express');
const { google } = require('googleapis');
const OAuth2 = google.auth.OAuth2
const axios = require('axios')

const { isLoggedIn } = require('../middlewares');

const router = express.Router()

const getSubscriptionList = async (oauth2Client)=>{

    let result = []
    let params =  {
        part: 'snippet',
        mine: true,
        order:'unread',
        maxResults:50,
        headers: {}
    }

    while (true){
        let youtubeRes = await google.youtube({
            version: 'v3',
            auth: oauth2Client
        }).subscriptions.list(params );
    
        console.log("nextToken : ",youtubeRes.data.nextPageToken)
        result.push(youtubeRes.data.items)

        if (youtubeRes.data.nextPageToken == undefined){
            break
        }
        else{
            params.pageToken = youtubeRes.data.nextPageToken
        }
    }
    return result
}

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
