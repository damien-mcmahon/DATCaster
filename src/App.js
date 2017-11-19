/* globals MediaRecorder navigator */
import React, { Component } from 'react';

import Archive from './utilities/archive';
import Visualiser from './components/Visualiser';
import Recorder from './components/Recorder';
import DATList from './components/DATList';
import {
  CASTS_DIR,
  MEDIA_CONSTRAINTS
} from './config';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);

    const archive = new Archive();

    this.state = {
      archive,
      casts: [],
      mediaRecorder: null,
      stream: null
    }
  }

  doSetup = stream => {
    const mediaRecorder = new MediaRecorder(stream);
    const { state: { archive }} = this;

    archive.getFiles(CASTS_DIR)
      .then(casts => {
        this.setState(state => ({
          ...state,
          mediaRecorder,
          casts,
          stream
        }));
      })
      .catch(err => console.log("DM => get file err", err));
  }

  handleNoSetup = err => {
    console.log("DM => ERR", err);
  }

  componentWillMount() {
    //create an archive or retrieve one
    const { archive } = this.state;
    archive.createDir(CASTS_DIR);

    //request the user permissions
    navigator.mediaDevices.getUserMedia(MEDIA_CONSTRAINTS)
      .then(this.doSetup, this.handleNoSetup)
  }

  saveAudio = (name, audioBlob) => {
    const { state: { archive }} = this;
    archive.saveFile(CASTS_DIR, name, audioBlob)
      .catch(err => console.log("DM => ERR", err));
  }

  deleteFile = fileName => {
    const { state: { archive }} = this;
    archive.deleteFile(CASTS_DIR, fileName);
  }

  render() {
    const { props, state } = this;
    const { casts, stream, mediaRecorder } = state;

    return (
      <div className="App">
        <header className="App-header">
          <h1>DATCaster</h1>
        </header>
        {stream && stream.active &&
          <Visualiser stream={stream} />
        }

        {mediaRecorder &&
          <Recorder recorder={mediaRecorder} onSave={this.saveAudio}/>
        }

        {casts.length > 0 &&
          <DATList 
            directory={CASTS_DIR} 
            casts={casts}
            onDelete={this.deleteFile}/>
        }
      </div>
    );
  }
}

export default App;
