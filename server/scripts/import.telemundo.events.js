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
  load_videos: ["db", function(results, callback) {
    // This will be the last page of videos at Telemundo
    let last 
    // This is the first page of videos at Telemundo
    let self = 'https://stage-api.nbcuni.com/networks/telemundocms/j/videos'
    
    async.until(function() {
      return last === self
    }, function(callback) {
      console.log(chalk.green("Link to `self`: ") + self)
      console.log(chalk.cyan("Link to `last`: ") + last)
      request({
        method: 'GET',
        url: self,
        headers: {
          "api_key": "B6JORCtfWI35R457al8N78n64aFSL6JI265U7DrZ"
        }
      }, function(error, response, body) {
        // Moves video page cursor to the next page
        body = JSON.parse(body)
        self = body.links.next
        last = body.links.last
        
        let Videos = results.db.db("Telemundo").collection("Videos")
        
        // Inserts the current page of videos to MongoDB Atlass
        async.map(body.data, function(video, callback) {
          callback(null, { url: "https://player.theplatform.com/p/0L7ZPC/D7AjRZyan6zo/embed/select/" + video.attributes.mediaId })
        }, function(error, results) {
          Videos.insertMany(results, function(error, results) {
            if(error) {
              console.log(chalk.red("Error: ") + error)
            } else {
              console.log("Added " + results.result.n + " new records")
              callback()
            }
          })
        })
      })
    }, callback)
  }],
}, function(error, results) {
  if(error) {
    console.log(chalk.red("Error: ") + error)
  } else {
    console.log(results.store_videos.result.n)
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




