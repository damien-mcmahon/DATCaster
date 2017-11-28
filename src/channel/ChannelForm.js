import React, { Component } from 'react';

import CoverImage from '../components/CoverImage';
import FormField from '../components/FormField';

class ChannelForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      channelInfo: {}
    };
  }

  updateFormField = name => ({target: {value}}) => {
    this.setState(state => ({...state, channelInfo: {
      ...state.channelInfo,
      [name]: value}
    }));
  }

  render() {
    const { props: { channel }} = this;

    return (
      <div className="channel-form__wrapper">
        <div className="channel-form__cover-wrapper">
          <CoverImage editMode={true} />
        </div>
        <div className="channel-form__channel-info-wrapper">
          <FormField 
            label="Channel Name"
            onChange={this.updateFormField('name')}
            inputType="text" />

          <FormField
            label="Description"
            onChange={this.updateFormField('description')}
            />
        </div>
      </div>
    );
  }
}

export default ChannelForm
