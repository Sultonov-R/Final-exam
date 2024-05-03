import React, { useEffect } from 'react'
import './index.css'

const WatchList = (props) => {
  const { image, amount, btn, click } = props;

  return (
    <div className='watchList'>
      <img width={100} src={image} alt="" />
      <span>₹ {amount}</span>
      <button onClick={click}>{btn}</button>
    </div>
  );
};

export default WatchList