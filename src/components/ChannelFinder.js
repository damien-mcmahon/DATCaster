import React, { Component } from 'react';

class ChannelFinder extends Component {
  constructor(props) {
    super(props);
    this.input = null;
  }
  
  render() {
    const { props: { onAddChannel }} = this;
    return (
      <div className="datcaster__channel-finder-wrapper">
        <p>Add a DATCast URL to find DATCasts</p>
        <input 
          type="text" 
          placeholder="dat://" 
          ref={(input) => { this.input = input}}/>
        <button onClick={() => { onAddChannel(this.input.value)}}>Add</button>

      </div>
    );
  }
}

export default ChannelFinder;
