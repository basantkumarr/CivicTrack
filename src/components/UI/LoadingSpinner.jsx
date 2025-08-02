import React from 'react';

const LoadingSpinner = ({ text = 'Loading...' }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      <div className="relative">
        <div className="spinner"></div>
      </div>
      <p className="mt-4 text-sm text-gray-600 font-medium">{text}</p>
    </div>
  );
};

export default LoadingSpinner;
