import React, { Component }  from 'react';

import Timer from './Timer';
import { AUDIO_FILE_OPTS, CASTS_DIR } from '../config';

const RECORDER_INACTIVE = 'inactive';
const RECORDER_PAUSED = 'paused';
const RECORDER_RECORDING = 'recording';
const ONE_SECOND = 1000;

export default class Recorder extends Component {
  constructor(props) {
    super(props);
    
    const { recorder } = props;
    this.input = null;

    this.state = {
      audioBlob: null,
      audioURL: null,
      recorder,
      chunks: [],
      duration: 0,
      recordButtonDisabled: false,
      timer: null,
      showSaveDialog: false
    };

    recorder.onstop = this.cacheAudio;
    recorder.ondataavailable = this.chunkData;
  }

  cacheAudio = event => {
    // write to a blob
    const audioBlob = new Blob(this.state.chunks, AUDIO_FILE_OPTS);
    this.setState(state => ({...state, audioBlob, showSaveDialog: true}), () => {
      const audioURL = window.URL.createObjectURL(this.state.audioBlob);
      this.setState(state => ({...state, audioURL, chunks: []}));
    });
  }

  chunkData = ({data}) => {
    this.setState(state => ({...state, chunks: state.chunks.concat(data)}));
  }

  record = () => {
    const { state: { recorder }} = this;

    if (recorder.state === RECORDER_INACTIVE) {
      recorder.start();
    } else if (recorder.state === RECORDER_PAUSED) {
      recorder.resume();
    }
    
    this.setState(state => ({
      ...state,
      recordButtonDisabled: true
    }), () => {
      this.startTimer();            
    });
  }

  startTimer = () => {
    this.setState(state => ({
      ...state,
      timer: setInterval(() => {
        this.setState(state => ({...state, duration: state.duration + 1}));
      }, ONE_SECOND)
    })); 
  }

  stopTimer = () => {
    clearTimeout(this.state.timer);
  }

  componentWillUnmount() {
    clearTimeout(this.state.timer);
  }

  pauseRecording = () => {
    const { state: { recorder }} = this;

    this.stopTimer();
    recorder.pause();
    this.setState(state => ({...state, recordButtonDisabled: false}));
  }

  stopRecording = () => {
    const { state: { recorder }} = this;

    recorder.stop();
    this.stopTimer();
    this.setState(state => ({...state, duration: 0, recordButtonDisabled: false}));
  }

  saveRecording = () => {
    const { props: { onSave}, state: { archive, audioBlob } } = this;
    onSave(this.input.value, audioBlob);

    this.setState(state => ({...state, showSaveDialog: false}));
  }

  render() {
    const { state } = this;
    const { duration, recordButtonDisabled, showSaveDialog } = state;

    return (
      <div className="datcaster__recorder-wrapper">
        <Timer duration={duration} />
        <button 
          className="recorder__record-button"
          onClick={this.record}
          disabled={recordButtonDisabled}>Record</button> 
        <button 
          className="recorder__pause-button"
          onClick={this.pauseRecording}>Pause</button> 
        <button 
          className="recorder__stop-button"
          onClick={this.stopRecording}>Stop</button> 
        {showSaveDialog &&
          <div className="recorder__save-dialog">
            <h1>Save this Recording</h1>
            <audio src={state.audioURL} controls={true} />
            <input ref={(input) => {this.input = input}} placeholder="Name of the file" />
            <button className="recorder__save-button" onClick={this.saveRecording}>Save</button>
          </div>
        }
      </div>
    );
  }
}
