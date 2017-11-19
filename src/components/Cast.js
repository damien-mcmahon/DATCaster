import React from 'react';

const Cast = ({controls, name,  onDelete, src}) => (
  <div className="cast__wrapper">
    <h1>{name}</h1>
    <audio src={src} controls={controls} />
    <button className="cast__delete-button" onClick={() => onDelete(name)}>X</button>
  </div>
);

export default Cast;
