const { google } = require('googleapis');
const OAuth2 = google.auth.OAuth2
const { isLoggedIn } = require('../middlewares');
const { processItemsPromise , getSubscriptionList } = require('../services/youtube')

const User = require('../models/user')
const Channel = require('../models/channel')

exports.renderMain = async (req,res) =>{

    let curUser = await User.findOne({where:{id:req.user.id}})
    console.log(curUser, curUser.email)

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
    
    const channels = Channel.findAll({where:{UserId:req.user.id}})
    console.log(">>>> channel info!",channels)

    const chanenls = await Channel.findAll({where:{ userId:req.user.id }})
    console.log(">>>>> Channels list ", channels)
    res.render('subscription',{title:'메인페이지 - YSM' ,
    channels: chanenls})
    return

    let subscriptionList = await getSubscriptionList(oauth2Client)


    let processPromise = processItemsPromise(subscriptionList)

    processPromise.then(function(promiseResult){
        console.log("############# promise result #############")
                //console.log(promiseResult)
                res.render('subscription',{title:'메인페이지 - YSM' ,
                                        channels: promiseResult})
    }, function(err){
        console.log("############# promise Fail #############")
        //console.error(err)
        console.log("############# promise Fail END #############")
    })

    
}

exports.renderTest = (req,res)=>{
    res.render('subscription',{title: '테스트 페이지 - YSM'})
}

exports.renderLogin = (req,res) =>{
    res.render('login',{title: 'Home page - YSM'})
}

