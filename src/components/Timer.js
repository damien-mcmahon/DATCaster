import React from 'react';

const padNum = num => num < 10 ? '0'+num : num;

const setTimer = duration => {
	const secs = duration%60;
  const mins = Math.floor(duration/60);
  const hours = Math.floor(duration/(60 * 60));
  
  return `${padNum(hours)}:${padNum(mins)}:${padNum(secs)}`;
};

const Timer = ({duration}) => (
  <div className="datcaster__timer-wrapper">
    {setTimer(duration)} 
  </div>
);

export default Timer 
