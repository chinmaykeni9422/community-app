import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Toast from "./Toast.jsx"
import axios from "axios" ;

function RefNum() {

    // Hooks
    const [referenceMobileNumber, setReferenceMobileNumber] = useState('');
    const [toast, setToast] = useState({ message: '', type: '' });
    const navigate = useNavigate();

    // Function
    const handleSubmit = async (event) => {
        event.preventDefault();
    
        axios.post('/api/newuser/checkref', { reference_mobile_number: referenceMobileNumber })
            .then((response) => {
                if (response.data.statusCode === 404) {
                    setToast({ message: response.data.message, type: 'error' });
                } else if (response.data.statusCode === 201) {
                    setToast({ message: response.data.message, type: 'success' });
                    navigate('/userNum');
                    setReferenceMobileNumber('');
                }
            })
            .catch((error) => {
                console.error('Error occurred:', error.message); // Debug log
                setToast({ message: 'An error occurred. Please try again.', type: 'error' });
                setReferenceMobileNumber('');
            });
    };
    
    
    return (
        <>
            <div className="flex items-center justify-center min-h-screen bg-gray-100">
                <div className="max-w-lg mx-auto px-4">
                    {toast.message && <Toast message={toast.message} type={toast.type} />}
                    <div className="bg-white shadow-md rounded-lg p-6">
                        <h1 className="text-3xl font-bold text-center mb-8">Enter Reference Number</h1>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label htmlFor="reference_number" className="block text-lg font-medium text-gray-700">Reference Mobile Number</label>
                                <input
                                    id="reference_number"
                                    type="text"
                                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-lg"
                                    placeholder="Enter reference mobile number"
                                    value={referenceMobileNumber}
                                    onChange={(e) => setReferenceMobileNumber(e.target.value)}
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
                    </div>
                </div>
            </div>
        </>
    )
}

export default RefNum
