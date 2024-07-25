import React, { useState } from 'react';
import axios from 'axios' ;
import {UserState} from '../Context/userContext'

const AddNumber = () => {

    const {user} = UserState() ;

    const [mobile_number, setMobileNumber] = useState('');
    const [toast, setToast] = useState({ message: '', type: '' });

    const handleSubmit = (event) => {
        event.preventDefault();

        const user_id = user?.profile?.user_id;
        
        axios.post('/api/existedUser/addNumber', {
            mobile_number: mobile_number,
            user_id: user_id,
          })
            .then((response) => {
              if (response.data.statusCode === 200) {
                setToast({ message: response.data.message, type: 'success' });
              } else {
                setToast({ message: response.data.message, type: 'error' });
              }
              setMobileNumber('')
            })
            .catch(() => {
              setToast({ message: 'An error occurred. Please try again.', type: 'error' });
            });
    };

    return (

        <div className="flex flex-col p-4 items-center h-[600px] justify-center md:h-[865px] bg-whitep-4">

            <div className="bg-white border-solid border-2 border-black shadow-md rounded-lg p-8 max-w-md w-full">

                <h1 className="text-2xl font-bold text-center mb-6">Add Mobile Number</h1>

                <form onSubmit={handleSubmit} className="space-y-4">

                    <div>
                        <label htmlFor="mobile_number" className="block text-lg font-medium text-gray-700">Mobile Number</label>
                        <input
                            id="mobile_number"
                            type="text"
                            value={mobile_number}
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
