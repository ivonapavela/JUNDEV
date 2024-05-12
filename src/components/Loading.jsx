import React from 'react';

const Loading = ({ text }) => (
  <div className="loading">
    <div className="spinner"></div>
    {text && <p className="loading-text">{text}</p>}
  </div>
);

export default Loading;
