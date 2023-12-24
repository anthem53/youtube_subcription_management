const { google } = require('googleapis');
const OAuth2 = google.auth.OAuth2
const { isLoggedIn } = require('../middlewares');
const { processItemsPromise , getSubscriptionList } = require('../services/youtube')


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
    
    console.log(getSubscriptionList)
    let subscriptionList = await getSubscriptionList(oauth2Client)
    console.log("list[0]",subscriptionList)
    console.log('>>> subscription end ')
    console.log("list[0]",subscriptionList,subscriptionList[0].snippet)

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
    res.render('test',{title: '테스트 페이지 - YSM'})
}

exports.renderLogin = (req,res) =>{
    res.render('login',{title: 'Home page - YSM'})
}

