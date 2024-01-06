const Channel = require('../models/channel')
const Sequelize = require('sequelize');
const { Op } = require("sequelize");

exports.getChannels = async(userId,inactiveTime) =>{

    const curDate = Date.now()

    const channels = await Channel.findAll({
                                            where:{ 
                                                userId:userId ,
                                                publishedAt :{
                                                 [Op.lt]   : new Date() - 24 * 60 * 60 * 1000 * inactiveTime
                                                }
                                            },
                                            order: [
                                                ['publishedAt','ASC']
                                            ]
                                        
                                        
                                        })
    

    for (const channelIndex in channels){
        let channel = channels[channelIndex]
        let channelDate = new Date(channel.dataValues.publishedAt)
        const month = channelDate.getMonth()+1
        let result = channelDate.getFullYear()+"-"+month+"-"+channelDate.getDate()

        channel.dataValues.publishedAt = result
        
    }

    return channels

}