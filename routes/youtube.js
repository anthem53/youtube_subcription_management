const express = require('express');
const { google } = require('googleapis');
const OAuth2 = google.auth.OAuth2
const axios = require('axios')

const { isLoggedIn } = require('../middlewares');

const router = express.Router()

router.get('/subscription',isLoggedIn, (req,res)=>{


    const params = {
        key: process.env.API_KEY,
        part: 'snippet',
        playlistId: 'UULFe6i2WT1bCAxo0F0FYhB_iQ'
    }

    axios.get("https://www.googleapis.com/youtube/v3/playlistItems",{
        params
    })
    .then((response) =>{
        console.log(response.data.items[0])
        console.log(response.data.items[0].snippet.publishedAt)
        res.send(response.data.items)
        
    })
    .catch((err)=>{
        console.error(err)
    })
    


})

module.exports = router
