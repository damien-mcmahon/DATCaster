import React, { Component } from 'react';

import DATList from '../components/DATList';
import Archive from '../utilities/archive';
import { CASTS_DIR } from '../config';

class IndexPage extends Component {
  constructor(props) {
    super(props);
    const archive = new Archive();
    archive.createDir(CASTS_DIR);

    this.state = {
      archive,
      casts: []
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

  render() {
    const { state: { casts }} = this;

    return (
      <div className="datcaster__index-page-wrapper">
        <h1>INDEX</h1>
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
