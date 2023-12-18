const { google } = require('googleapis');
const OAuth2 = google.auth.OAuth2
const axios = require('axios')

function print(a){
    console.log(a)
}

async function updateChannelInfo ( channelId,temp,result,channel){

    const service = google.youtube({version: 'v3' })
    playlistId = channelId[0] + "ULF"+channelId.substr(2)

    const params = {
      key: process.env.API_KEY,
      part: 'snippet',
      playlistId: playlistId     
    }

    console.log("TESTTESTTEST >>>>>> ", playlistId)

    await axios.get("https://www.googleapis.com/youtube/v3/playlistItems",{
        params
    })
    .then((response) =>{
        console.log(response.data.items[0])
        console.log(response.data.items[0].snippet.publishedAt)
        
        temp.title = channel.snippet.title
        temp.channelId = channel.snippet.resourceId.channelId
        temp.description = channel.snippet.description.substring(0,40)
        temp.publishedAt = response.data.items[0].snippet.publishedAt
        temp.videoId = response.data.items[0].snippet.resourceId.videoId
        temp.videoTitle = response.data.items[0].snippet.title
        result.push(temp)
        console.log("Temp : ", temp)
        //res.send(response.data.items)
        
        return;
    })
    .catch((err)=>{
        console.error(err)
    })
   
    console.log(">>>> 끝")
}

async function getChannelAsync(items, result){
  for (let index in items) {
    let channel = items[index]
    let temp = {}

    await updateChannelInfo(channel.snippet.resourceId.channelId,temp,result,channel)
    if (index == 3){
      break
    }
  }

  return 
}

exports.processItems =  (oauth2Client,items, result) =>{
    
    getChannelAsync(items,result).then((value)=>{
      console.log("--------------------- test -------------------")
      console.log(value,value[0],value[1])
      console.log("--------------------- ---- -------------------")
    })

  
}