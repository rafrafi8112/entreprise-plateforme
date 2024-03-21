// Loading.jsx

import React from 'react';
import './Loading.css'; // This will be your CSS file for styling the loading component

const Loading = ({ message }) => {
  return (
    <div className="loading-container">
      <div className="loading-spinner"></div> {/* You can add a spinner icon here if you like */}
      <p className="loading-message">{message}</p>
    </div>
  );
};

export default Loading;
