import React, { Component } from 'react';

class Visualiser extends Component {
  constructor(props) {
    super(props);
    this.canvas = null;
  }

  doSetup = stream => {
    const audioCtx = new AudioContext();

    //use refs to get the canvas
    const canvasCtx = this.canvas.getContext('2d');
    const analyser = audioCtx.createAnalyser();
		analyser.fftSize = 2048;
		const bufferLength = analyser.frequencyBinCount;
		const dataArray = new Uint8Array(bufferLength);
    const source = audioCtx.createMediaStreamSource(stream);

    source.connect(analyser);
    
    this.setState(state => ({
      ...state,
      analyser,
			audioCtx,
      bufferLength,
      canvasCtx,
      dataArray,
      source
    }), () => {
      this.draw()
    });

  }

  componentDidMount() {
    const { props } = this;
    this.doSetup(props.stream);  
  }

  componentWillUnmount() {
    //clean up 
    this.canvas = null;
  }

  draw = () => {
    const { 
      analyser,
      bufferLength,
      canvasCtx,
      dataArray
    } = this.state;

		let WIDTH = this.canvas.width
    let HEIGHT = this.canvas.height;

    requestAnimationFrame(this.draw);

    analyser.getByteTimeDomainData(dataArray);

    canvasCtx.fillStyle = 'rgb(200, 200, 200)';
    canvasCtx.fillRect(0, 0, WIDTH, HEIGHT);

    canvasCtx.lineWidth = 2;
    canvasCtx.strokeStyle = 'rgb(0, 0, 0)';

    canvasCtx.beginPath();

    let sliceWidth = WIDTH * 1.0 / bufferLength;
    let x = 0;


    for(var i = 0; i < bufferLength; i++) {
      var v = dataArray[i] / 128.0;
      var y = v * HEIGHT/2;

      if(i === 0) {
        canvasCtx.moveTo(x, y);
      } else {
        canvasCtx.lineTo(x, y);
      }

      x += sliceWidth;
    }

    canvasCtx.lineTo(this.canvas.width, this.canvas.height/2);
    canvasCtx.stroke();
  }

  render() {
    return (
       <div className="datcaster__visualiser-wrapper">
         <canvas 
          ref={(canvas) => {this.canvas = canvas}}
          className="datcaster__visualiser"></canvas>
      </div>
    );
  }
}

export default Visualiser;

