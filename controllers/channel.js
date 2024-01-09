const { google } = require('googleapis');
const OAuth2 = google.auth.OAuth2
const { isLoggedIn } = require('../middlewares');
const { processItemsPromise , getSubscriptionList } = require('../services/youtube')

const User = require('../models/user');
const { Channel } = require('../models');
exports.saveSubscriptChannel = async (req,res,next) =>{
    try{
        const user = await User.findOne({where:{id:req.user.id}})
        if (user){
            var oauth2Client = new OAuth2(
                process.env.GOOGLE_ID,
                process.env.GOOGLE_SECRET,
                process.env.CALLBACK
            );
        
            oauth2Client.credentials = {
                access_token: req.user.accessToken,
                refresh_token: req.user.refreshToken
            };
            
            
            User.update({
                subsUpdateAt: new Date()
            },{
                where:{id :req.user.id}
            })

            const destroyResult = await Channel.destroy({
                where: {
                    userId: req.user.id
                }
            });
            

            let subscriptionList = await getSubscriptionList(oauth2Client)

            for (let channel in subscriptionList){
                
            }
        
            let processPromise = processItemsPromise(subscriptionList)
        
            processPromise.then( function(promiseResult){
                console.log("############# promise result #############")
                        
                let promiseList = []
                console.log(">>> user id :", req.user.id)
                for (let resultIndex in promiseResult){
                    const result = promiseResult[resultIndex]
                    if ( result.publishedAt == undefined){
                        result.publishedAt = '2000-01-01T00:00:00Z'
                    }
                    const promise =  Channel.create({
                        title: result.title,
                        channelId: result.channelId,
                        description: result.description,
                        publishedAt: new Date(result.publishedAt),
                        videoId: result.videoId,
                        videoTitle: result.videoTitle,
                        userId: req.user.id,
                    })
                    promiseList.push(promise)
                    
                }
                Promise.all(promiseList)
                console.log("subscript List Complete")
                var status = {
                    "status": 200,
                    "message": 'Update Complete'
                }
                res.json(status)
                
    
            }, function(err){
                
                console.error(err)
                
            })

        }
        else{
            res.status(404).send("No User")
        }
        

    }
    catch (error){
        console.error(error)
        next(error)
    }


    

}

exports.test = (req,res)=>{

    console.log("Channel file , TEST")


    var status = {
        "status": 205,
        "message": 'test OK'
    }
    
    return res.json(JSON.stringify(status));

}