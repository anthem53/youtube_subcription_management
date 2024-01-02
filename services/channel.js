const Channel = require('../models/channel')


exports.getChannels = async(userId) =>{

    const channels = await Channel.findAll({where:{ userId:userId }})
    
    console.log(">>>> publishedAt : ",channels[0].dataValues.publishedAt, new Date(channels[0].dataValues.publishedAt),  )
    for (const channelIndex in channels){
        let channel = channels[channelIndex]
        let channelDate = new Date(channel.dataValues.publishedAt)
        let result = channelDate.getFullYear()+"-"+channelDate.getMonth()+"-"+channelDate.getDate()

        channel.dataValues.publishedAt = result
    }

    return channels

}