import React, { Component }  from 'react';

import Channel from '../models/channel';
import ChannelForm from './ChannelForm';

class ChannelPage extends Component {
  constructor(props) {
    super(props);

    const channel = new Channel(window.location.origin);
    this.state = {
      channel,
      channelInfo: null
    };

    channel.userHasChannel()
      .then(channelInfo => this.setState(state => ({...state, channelInfo})));
  }

  render() {
    const { state: { channelInfo }} = this;

    return (
      <div className="channel__wrapper">
        <ChannelForm channel={channelInfo} />
      </div>
    );
  }
}

export default ChannelPage;
