const { google } = require('googleapis');
const OAuth2 = google.auth.OAuth2
const axios = require('axios')

function print(a){
    console.log(a)
}

async function updateChannelInfo ( channelId,channel){

    return new Promise(async (resolve,reject) =>{
      const service = google.youtube({version: 'v3' })
      playlistId = channelId[0] + "ULF"+channelId.substr(2)
      const params = {
        key: process.env.API_KEY,
        part: 'snippet',
        playlistId: playlistId     
      }
      await axios.get("https://www.googleapis.com/youtube/v3/playlistItems",{
        params
      })
      .then((response) =>{
          temp = {}
          temp.title = channel.snippet.title
          temp.channelId = channel.snippet.resourceId.channelId
          temp.description = channel.snippet.description.substring(0,40)
          temp.publishedAt = response.data.items[0].snippet.publishedAt
          temp.videoId = response.data.items[0].snippet.resourceId.videoId
          temp.videoTitle = response.data.items[0].snippet.title
          //console.log("Channel title:", temp.title)
          console.log(">>> publishAt type ",typeof(temp.publishedAt))
          resolve(temp)
      })
      .catch((err)=>{
          //console.error(err)
          console.error(">>>>>>>>> axios part, error")
          if (axios.isAxiosError(error)) {
            temp = {}
            temp.title = channel.snippet.title
            temp.channelId = channel.snippet.resourceId.channelId
            temp.description = channel.snippet.description.substring(0,40)
            temp.publishedAt = undefined
            temp.videoId = undefined
            temp.videoTitle = undefined
            resolve(temp)
          }
          else{
            reject(err)
          }
      })

    } )

}

const processItems = async (items) =>{
  let promiseList = []
  let result = []
  for (let index in items) {
    let channel = items[index]

    promiseList.push(updateChannelInfo(channel.snippet.resourceId.channelId,channel))
  }

  result = Promise.all(promiseList)
  console.log("Result of processed promise: ",result)
  return result

}

exports.processItemsPromise =  async (items) =>{
    
  return new Promise(async function(resolved,rejected){
    
    try{
      let tempResultList  = await processItems(items)
      let resultList  = []

      resolved(tempResultList)
    }
    catch(error){
      console.error(error)      
      rejected(error)
    }
    //console.log(result)
    
  })


  
}