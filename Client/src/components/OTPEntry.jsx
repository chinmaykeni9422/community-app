import React from 'react';

const OTPEntry = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <input
        type="text"
        className="border border-gray-300 px-4 py-2 rounded mb-4"
        placeholder="Enter OTP"
      />
      <input
        type="password"
        className="border border-gray-300 px-4 py-2 rounded mb-4"
        placeholder="Enter Password"
      />
      <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded">
        Submit
      </button>
    </div>
  );
};

export default OTPEntry;