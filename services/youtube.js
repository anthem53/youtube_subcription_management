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
      const descriptionList  =channel.snippet.description.split('\n')
      const curDescription = descriptionList[0]


      await axios.get("https://www.googleapis.com/youtube/v3/playlistItems",{
        params
      })
      .then((response) =>{
          temp = {}
          temp.title = channel.snippet.title
          temp.channelId = channel.snippet.resourceId.channelId
          temp.description = curDescription
          temp.publishedAt = response.data.items[0].snippet.publishedAt
          temp.videoId = response.data.items[0].snippet.resourceId.videoId
          temp.videoTitle = response.data.items[0].snippet.title
          console.log("Channel title:", temp.title)
          resolve(temp)
      })
      .catch((err)=>{
          //console.error(err)
          console.error(">>>>>>>>> axios part, error")
          if (axios.isAxiosError(err)) {
            temp = {}
            temp.title = channel.snippet.title
            temp.channelId = channel.snippet.resourceId.channelId
            temp.description = curDescription
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
  for (let index in items) {
    let channel = items[index]

    promiseList.push(updateChannelInfo(channel.snippet.resourceId.channelId,channel))
  }

  let result = Promise.all(promiseList)
  
  return result

}

exports.processItemsPromise =  async (items) =>{
    
  return new Promise(async function(resolved,rejected){
    
    try{
      let resultList  = await processItems(items)

      resolved(resultList)
    }
    catch(error){
      console.error(error)      
      rejected(error)
    }
    
  })
}

exports.getSubscriptionList = async (oauth2Client)=>{

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
      result = [...result,...youtubeRes.data.items]

      if (youtubeRes.data.nextPageToken == undefined){
          break
      }
      else{
          params.pageToken = youtubeRes.data.nextPageToken
      }
  }
  return result
}