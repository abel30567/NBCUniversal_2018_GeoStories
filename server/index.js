
'use strict'

let dotenv = require('dotenv').config()
let _ = require('lodash') // CHECK: https://lodash.com/docs/
let async = require('async') // CHECK: https://caolan.github.io/async/docs.html
let cors = require('cors') 
let express = require('express')
let request = require('request')
let bodyParser = require('body-parser')

let app = express()
let options = {
  host: process.env.HOST || 'localhost',
  port: process.env.PORT || 8080
}

app.use(cors())
app.use(bodyParser.json())

/**
* Returns a list of 20 events near the user and videos associated with them.
*
* @request
* @params {Object} req.body - JSON Request body
* @params {String} req.body.lat - Latitude of user's current location
* @params {String} req.body.lng - Longitude of user's current location
*
* @response
* @schema {
*   "markers": [{
*     "lat": Number,
*     "lng": Number,
*     "url": String
*   }]
* }
*/
app.post('/markers', function(req, res) {
  async.auto({
    // Returns the user's position or Miami as a center, if no user location is provided
    "get_position": function(callback) {
      // console.log(req.body);
      callback(null, {
        lat: req.body.lat || 25.7617,
        lng: req.body.lng || -80.1918
      })
    },
    // Returns a page of 50 videos
    "get_videos": function(callback) {
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
    // Returns an array with 50 links to the videos
    "video_links": ["get_videos", function(results, callback) {
      async.map(results.get_videos.data, function(video, callback) {
      callback(null, "https://player.theplatform.com/p/0L7ZPC/D7AjRZyan6zo/embed/select/" + video.attributes.mediaId)
    }, callback)
    }],
    // Returns 50 random geo location markers near the user
    "markers": ["get_position", "video_links", function(results, callback) {
      async.map(results.video_links, function(video, callback) {
        // New marker is shifted N or S
        let latSign = Math.round(Math.random()) ? 1 : -1
        // How N or S is new marker shifted
        let latChange = Math.random() / 100
        // New marker is shifted E or W
        let lngSign = Math.round(Math.random()) ? 1 : -1
        // How E or W is new marker shifted
        let lngChange = Math.random() / 100
        callback(null, {
          position: {
            // Shifts a new marker vertically from user's position
            lat: results.get_position.lat + latSign * latChange,
            // Shifts a new marker horizontally from user's position
            lng: results.get_position.lng + lngSign * lngChange,
          },
                  
          // Sends video
          url: video || "https://player.theplatform.com/p/0L7ZPC/D7AjRZyan6zo/embed/select/k80SJhYjr7UK"
        })
      }, callback)
    }]
  }, function(error, results) {
    if(error) {
      res.status(500).send({
        error: new Error("We blew something up!!")
      })
    } else {
      res.send({
        markers: results.markers
      })
    }
  })
})

app.use(function(req, res) {
  res.json({
    "message": "You made a succesful call to the Yories HTTP Server"
  })
})

app.listen(options.port, function() {
  console.log(`Listening in on http://${options.host}:${options.port}/`)
})