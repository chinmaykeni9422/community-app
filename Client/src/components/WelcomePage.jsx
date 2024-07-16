import React from 'react';

const WelcomePage = () => {
    return (
        <>

            <div className="flex items-center justify-center min-h-screen bg-gray-100">
                <div className="max-w-lg mx-auto px-4">
                    <div className="bg-white shadow-md rounded-lg p-6">
                        <h1 className="text-3xl font-bold text-center mb-8">Welcome!</h1>
                        <div className="flex flex-col items-center space-y-4">
                            <p className="text-lg text-gray-700">Welcome to the Community App.</p>
                            <p className="text-lg text-gray-700">You are now logged in.</p>
                            <button
                                className="bg-blue-500 text-white py-3 px-6 rounded-md shadow-md hover:bg-blue-600 transition-colors duration-300 ease-in-out focus:outline-none"
                                onClick={() => {
                                    // Handle navigation or action on button click
                                    console.log('Redirect to dashboard or next page');
                                }}
                            >
                                Go to Dashboard
                            </button>
                        </div>
                    </div>
                </div>
            </div>

        </>
    );
};

export default WelcomePage;