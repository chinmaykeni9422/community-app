import React from 'react'
import { useNavigate } from 'react-router-dom';
import './App.css'


function App() {

  const navigate = useNavigate();

  const handleJoinClick = () => {
    navigate('/userNum');
  };

  return (
    <>
      <div className="flex items-center justify-center min-h-screen bg-gray-100">

        <div className="max-w-4xl mx-auto px-4">

          <div className="bg-white shadow-md rounded-lg p-6">

            <h1 className="text-4xl font-bold text-center mb-8">Welcome to Community App</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

              <div className="p-6 bg-blue-500 rounded-lg text-center text-white">
                <h2 className="text-2xl font-bold mb-4">New User</h2>
                <p className="text-lg">Join our community now!</p>
                <button onClick={handleJoinClick} className="mt-4 bg-white text-blue-500 hover:bg-blue-100 px-6 py-3 rounded-md shadow-md transition-colors duration-300 ease-in-out focus:outline-none">
                  Join
                </button>
              </div>

              <div className="p-6 bg-gray-200 rounded-lg text-center">
                <h2 className="text-2xl font-bold mb-4">Existing User</h2>
                <p className="text-lg">Already a member? Log in here.</p>
                <button onClick={() => navigate('/login')} className="mt-4 bg-blue-500 text-white hover:bg-blue-600 px-6 py-3 rounded-md shadow-md transition-colors duration-300 ease-in-out focus:outline-none">
                  Log In
                </button>
              </div>

            </div>
          </div>

        </div>

      </div>
    </>
  )
}

export default App
