import React from 'react';

import Channel from './Channel';

const ChannelList = props => (
  <div className="channel-list__wrapper">
    {props.channels.length > 0 && 
      props.channels.map(c => (<Channel info={c} />))
    }

    {props.channels.length === 0 &&
      <h1>Nothing here</h1>
    }
  </div>
);

export default ChannelList;
