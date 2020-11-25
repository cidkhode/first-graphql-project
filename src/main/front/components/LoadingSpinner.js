import React from 'react';
import '../styles/Components/LoadingSpinner.less';

export const LoadingSpinner = () => (
  <div className="loading-spinner-component-container">
    <div className="spinner" />
    <span>Loading...</span>
  </div>
);

export default LoadingSpinner;