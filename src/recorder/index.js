/* globals MediaRecorder navigator */
import React, { Component } from 'react';

import Archive from '../models/archive';
import Visualiser from '../components/Visualiser';
import Recorder from '../components/Recorder';
import {
  CASTS_DIR,
  MEDIA_CONSTRAINTS
} from '../config';

class RecorderPage extends Component {
  constructor(props) {
    super(props);

    const archive = new Archive();
    const isDat = window.location.protocol === 'dat:';

    this.state = {
      archive,
      casts: [],
      mediaRecorder: null,
      stream: null,
      isDat
    }
  }

  doSetup = stream => {
    const mediaRecorder = new MediaRecorder(stream);

    this.setState(state => ({
      ...state,
      mediaRecorder,
      stream
    }));

  }

  handleNoSetup = err => {
    console.log("DM => ERR", err);
  }

  componentWillMount() {

    //request the user permissions
    navigator.mediaDevices.getUserMedia(MEDIA_CONSTRAINTS)
      .then(this.doSetup, this.handleNoSetup)
  }

  saveAudio = (name, audioBlob) => {
    const { state: { archive }} = this;
    archive.saveFile(CASTS_DIR, name, audioBlob)
      .catch(err => console.log("DM => ERR", err));
  }


  render() {
    const { state } = this;
    const { isDat, stream, mediaRecorder } = state;

    return (
      <div className="App">
        <header className="App-header">
          <h1>DATCaster</h1>
        </header>

        {stream && stream.active &&
          <Visualiser stream={stream} />
        }

        {mediaRecorder &&
          <Recorder isDat={isDat} recorder={mediaRecorder} onSave={this.saveAudio}/>
        }

      </div>
    );
  }
}

export default RecorderPage;
