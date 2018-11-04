'use strict'

/**
* For connecting `mongoose` with MongoDB Atlas
*
* CHECK: https://stackoverflow.com/questions/41213148/mongoose-with-replicaset-on-atlas
*/

let chalk = require('chalk')
let async = require('async')
let MongoClient = require('mongodb').MongoClient
// let mongoose = require('mongoose')
let fs = require('fs')
let request = require('request')

async.auto({
  db: function(callback) {
    /**
    * This URL connects us to our MongoDB Atlass
    *
    * CHECK: https://cloud.mongodb.com/v2/5bdde9fe014b76b64b0dc144#clusters/commandLineTools/GeoStoriesCluster1
    */
    let uri = "mongodb+srv://874n7EI7cRxCbi9y:n088uAF08JYL9sco@geostoriescluster1-zu1m0.mongodb.net/test?retryWrites=true"
    
    MongoClient.connect(uri,{
      useNewUrlParser: true
    }, callback)
  },
  get_videos: function(callback) {
    request({
      method: 'GET',
      url: 'https://stage-api.nbcuni.com/networks/telemundocms/j/videos',
      headers: {
        "api_key": "B6JORCtfWI35R457al8N78n64aFSL6JI265U7DrZ"
      }
    }, function(error, response, body) {
      callback(error, JSON.parse(body))
    })
  },
  video_links: ["get_videos", function(results, callback) {
    async.map(results.get_videos.data, function(video, callback) {
      callback(null, "https://player.theplatform.com/p/0L7ZPC/D7AjRZyan6zo/embed/select/" + video.attributes.mediaId)
    }, callback)
  }],
  store_videos: ["db", "video_links", function(results, callback) {
    let Videos = results.db.db("Telemundo").collection("Videos")
    Videos.insertOne({ videos: results.video_links }, callback)
  }]
}, function(error, results) {
  if(error) {
    console.log(chalk.red("Error: ") + error)
  } else {
    console.log(results.store_videos.insertedCount)
  }
  results.db.close()
})




// mongoose.connect(uri, {
//   useNewUrlParser: true
// })

/**
* Telemundo's API has no consistent structure to their `events` so we upload without a schema.
*
* CHECK: https://concertojsonapi.docs.apiary.io/#reference/events/retrieve-all-videos
*
* Telemundo's API Endpoint is different from the one provided in the documentation
*
* API ENDPOINT: https://stage-api.nbcuni.com/networks/telemundocms/j/videos
* API KEYS: {api_key: B6JORCtfWI35R457al8N78n64aFSL6JI265U7DrZ}
*/
// let Video = mongoose.model("Video", new mongoose.Schema({}))

// request({
//     method: 'GET',
//     url: 'https://stage-api.nbcuni.com/networks/telemundocms/j/videos',
//     headers: {
//       "api_key": "B6JORCtfWI35R457al8N78n64aFSL6JI265U7DrZ"
//     }
//   }, function(error, response, body) {
//   if(error) {
//     console.log(chalk.red("Error making request to Telemundo: "))
//   } else {
//     console.log(chalk.green("Retrieved videos from Telemundo"))
//     Video.create(JSON.parse(body), function(error, video) {
//       if(error) {
//         fs.writeFileSync("error.txt", error)
//       } else {
//         console.log(chalk.green("Created a videos object in MongoDB Atlas"))
//       }
//     })
//   }
// })




