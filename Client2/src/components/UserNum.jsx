import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function UserNum() {
    const [mobileNumber, setMobileNumber] = useState('');
    const [toast, setToast] = useState({ message: '', type: '' });
    const navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault();

        axios.post('/api/newuser/checkMobNum', { mobile_number: mobileNumber })
            .then((response) => {
                console.log(response.data)
                if (response.data.statusCode === 400) { 
                    setToast({ message: response.data.message, type: 'error' });
                } else if (response.data.statusCode === 200) { 
                    setToast({ message: response.data.message, type: 'success' });
                    navigate('/otp', { state: { otp: response.data.data.otp } });
                }
            })
            .catch((error) => {
                console.error('Error occurred:', error.message);
                setToast({ message: 'An error occurred. Please try again.', type: 'error' });
            });
    };

    return (
        <>
            <div className="flex items-center justify-center min-h-screen bg-blue-600">

                <div className="max-w-lg mx-auto px-4">

                    <div className="bg-white shadow-md rounded-lg p-6">

                        <h1 className="text-3xl font-bold text-center mb-8">Enter Mobile Number</h1>

                        <form className="space-y-4" onSubmit={handleSubmit}>
                            <div>
                                <label htmlFor="mobile_number" className="block text-lg font-medium text-gray-700">Your Mobile Number</label>
                                <input
                                    id="mobile_number"
                                    type="text"
                                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-lg"
                                    placeholder="Enter mobile number"
                                    value={mobileNumber}
                                    onChange={(e) => setMobileNumber(e.target.value)}
                                />
                            </div>
                            <div>
                                <button
                                    type="submit"
                                    className="w-full bg-blue-500 text-white py-3 px-6 rounded-md shadow-md hover:bg-blue-600 transition-colors duration-300 ease-in-out focus:outline-none"
                                >
                                    Submit
                                </button>
                            </div>
                        </form>

                        {toast.message && (
                            <div className={`mt-4 p-4 rounded-md ${toast.type === 'error' ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'}`}>
                                {toast.message}
                            </div>
                        )}

                    </div>

                </div>

            </div>
        </>
    );
}

export default UserNum;

