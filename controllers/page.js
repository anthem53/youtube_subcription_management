const { google } = require('googleapis');
const OAuth2 = google.auth.OAuth2
const { isLoggedIn } = require('../middlewares');
const { processItemsPromise , getSubscriptionList } = require('../services/youtube')
const { getChannels } = require('../services/channel')

const User = require('../models/user')
const Channel = require('../models/channel')

exports.renderMain = async (req,res) =>{

    res.render('main',{title: '메인 페이지 - YSM'})
}

exports.renderSubscription = async (req,res)=>{
    
    var oauth2Client = new OAuth2(
        process.env.GOOGLE_ID,
        process.env.GOOGLE_SECRET,
        process.env.CALLBACK
    );

    oauth2Client.credentials = {
        access_token: req.user.accessToken,
        refresh_token: req.user.refreshToken
    };
    
    
    const channels = await getChannels(req.user.id)

    res.render('subscription',{title:'메인페이지 - YSM' ,
    channels: channels})
    return    
}

exports.renderTest = (req,res)=>{
    res.render('subscription',{title: '테스트 페이지 - YSM'})
}

exports.renderLogin = (req,res) =>{
    res.render('login',{title: 'Home page - YSM'})
}

