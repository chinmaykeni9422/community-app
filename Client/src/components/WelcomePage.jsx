import React from 'react';

const WelcomePage = () => {
    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <h2 className="text-2xl font-bold mb-4">Welcome to Community App!</h2>
            <p className="text-lg mb-4">You are now logged in.</p>
            <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded">
                Logout
            </button>
        </div>
    );
};

export default WelcomePage;