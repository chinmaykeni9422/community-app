import React from 'react';

const LoginPage = () => {
    return (
        <>

            <div className="flex items-center justify-center min-h-screen bg-gray-100">
                <div className="max-w-lg mx-auto px-4">
                    <div className="bg-white shadow-md rounded-lg p-6">
                        <h1 className="text-3xl font-bold text-center mb-8">Login</h1>
                        <form className="space-y-4">
                            <div>
                                <label htmlFor="mobile_number" className="block text-lg font-medium text-gray-700">Mobile Number</label>
                                <input
                                    id="mobile_number"
                                    type="text"
                                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-lg"
                                    placeholder="Enter your mobile number"
                                />
                            </div>
                            <div>
                                <label htmlFor="password" className="block text-lg font-medium text-gray-700">Password</label>
                                <input
                                    id="password"
                                    type="password"
                                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-lg"
                                    placeholder="Enter your password"
                                />
                            </div>
                            <div>
                                <button
                                    type="submit"
                                    className="w-full bg-blue-500 text-white py-3 px-6 rounded-md shadow-md hover:bg-blue-600 transition-colors duration-300 ease-in-out focus:outline-none"
                                >
                                    Login
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

        </>
    );
};

export default LoginPage;
