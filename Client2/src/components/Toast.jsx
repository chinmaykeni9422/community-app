import React from 'react';

const Toast = ({ message, type }) => {
  return (
    <div className={`fixed top-4 right-4 p-4 rounded-md shadow-md text-white ${type === 'error' ? 'bg-red-500' : 'bg-green-500'}`}>
      {message}
    </div>
  );
};

export default Toast;