import React, { Component } from 'react';

import Cast from './Cast';

export default class DATList extends Component {
  render() {
    const { props: {casts, directory, onDelete}} = this;
    return (
      <div className="datcaster__datlist-wrapper">
        {casts.map((c, i) => (
          <Cast 
            controls={true}
            name={c} 
            src={`${directory}/${c}`} 
            onDelete={onDelete} />
        ))}
      </div>
    );
  }
}
