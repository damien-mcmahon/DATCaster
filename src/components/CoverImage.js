import React, { Component } from 'react';

class CoverImage extends Component {
  handleFile = event => {
    console.log("DM => EV", event);
  }


  render() {
    const { props: { editMode, image }} = this;

    return (
      <div className="cover-image__wrapper">
        {editMode &&
          <div className="cover-image__uploader">
            <input 
              accept="image/*"
              type="file" 
              onChange={this.handleFile} />
          </div>
        }
      </div>
    );
  }
}

export default CoverImage
