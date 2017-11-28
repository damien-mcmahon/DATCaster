import React, { Component } from 'react';

import DATList from '../components/DATList';
import Archive from '../models/archive';
import Subscription from '../models/subscription';
import ChannelFinder from '../components/ChannelFinder';
import ChannelList from '../components/ChannelList';
import { CASTS_DIR } from '../config';

class IndexPage extends Component {
  constructor(props) {
    super(props);
    const archive = new Archive();
    const subscription = new Subscription();

    archive.createDir(CASTS_DIR);

    this.state = {
      archive,
      casts: [],
      subscription
    };
  }

  componentWillMount() {
    const { archive } = this.state;

    archive.getFiles(CASTS_DIR)
      .then(casts => {
        this.setState(state => ({
          ...state,
          casts
        }));
      })
      .catch(err => console.log("DM => get file err", err));
  }

  deleteFile = fileName => {
    const { state: { archive }} = this;
    archive.deleteFile(CASTS_DIR, fileName);
  }

  findChannel = channelURL => {
    const { state: { subscription }} = this;
    subscription.subscribeToChannel(channelURL);
  }

  render() {
    const { state: { casts }} = this;

    return (
      <div className="datcaster__index-page-wrapper">
        <ChannelFinder onAddChannel={this.findChannel}/>
        <ChannelList channels={[]} />
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

export default IndexPage
