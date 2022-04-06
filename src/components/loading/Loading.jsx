import React from 'react';
import './Loading.css'
const Loading = () => {
  return (
    <div className='container-loading'>
      <p className="text">LOADING</p>
      <div className='dotList'>
        <div className='dot' style={{ animationDelay: "0.125s" }}></div>
        <div className='dot' style={{ animationDelay: "0.25s" }}></div>
        <div className='dot' style={{ animationDelay: "0.375s" }}></div>
        <div className='dot' style={{ animationDelay: "0.5s" }}></div>
      </div>
    </div>
  )

};

export default Loading;
