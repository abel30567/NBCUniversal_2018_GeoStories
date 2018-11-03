/**
* For displaying videos from Cloudinary see the following.
*
* CHECK: https://cloudinary.com/documentation/video_manipulation_and_delivery#generating_video_thumbnails
*/

/**
* For uploading videos to cloudinary, see the following.
*
* CHECK: https://codepen.io/luis-carbonell/pen/oQNjBR
*/

/**
* For recording videos, see the following.
*
* CHECK: https://mozdevs.github.io/MediaRecorder-examples/index.html
* CHECK: https://codepen.io/luis-carbonell/pen/bQGEwM
* CHECK: https://www.npmjs.com/package/react-multimedia-capture
* CHECK: https://developer.mozilla.org/en-US/docs/Web/API/MediaRecorder
*/

import React from "react";
import { Image, Video, Transformation, CloudinaryContext } from "cloudinary-react";


class VideoPlayer extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {
      recording: false,
      recorder: undefined,
      liveStream: undefined
    }
    
    this.startRecording = this.startRecording.bind(this);
  }
  
  startRecording() {
    // this.state.recorder = new MediaRecorder();
    
    
  }
  
  render() {
    return (
      <div>
        
        
        
        
        {/* <Image cloudName="dcs3c9dvw" publicId="samples/bike.jpg" width="500">
        </Image> */}
        <Video style={{ zIndex: '110', position: 'absolute' }} cloudName="dcs3c9dvw" publicId="samples/sea-turtle" format="mp4" width="80%" height="80%" controls>
          <Transformation width="80%" height="80%" />
        </Video>
      </div>
    );
  }
}

export default VideoPlayer;