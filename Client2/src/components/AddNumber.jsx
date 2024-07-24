import React, { useState } from 'react';

const AddNumber = () => {
    const [mobileNumber, setMobileNumber] = useState('');
    const [toast, setToast] = useState({ message: '', type: '' });

    const handleSubmit = (event) => {
        event.preventDefault();
        if (!mobileNumber) {
            setToast({ message: 'Please enter a mobile number.', type: 'error' });
            return;
        }
        // Add your submit logic here
        setToast({ message: 'Mobile number added successfully!', type: 'success' });
        setMobileNumber(''); // Clear the input after submission
    };

    return (

        <div className="flex flex-col items-center justify-center h-[865px] bg-gray-300 p-4">

            <div className="bg-white shadow-md rounded-lg p-8 max-w-md w-full">

                <h1 className="text-2xl font-bold text-center mb-6">Add Mobile Number</h1>

                <form onSubmit={handleSubmit} className="space-y-4">

                    <div>
                        <label htmlFor="mobile_number" className="block text-lg font-medium text-gray-700">Mobile Number</label>
                        <input
                            id="mobile_number"
                            type="text"
                            value={mobileNumber}
                            onChange={(e) => setMobileNumber(e.target.value)}
                            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-lg"
                            placeholder="Enter your mobile number"
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

    );
};

export default AddNumber;
