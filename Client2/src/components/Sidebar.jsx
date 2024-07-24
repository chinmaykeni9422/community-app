import React from 'react'
import {FaUser, FaMobile, FaRegEnvelope} from 'react-icons/fa' 

const Sidebar = ({sideBarTogggle, setActiveComponent, activeComponent}) => {

    const getActiveClass = (component) => component === activeComponent ? 'bg-blue-500' : '';

  return (
    <>
        <div className={`${sideBarTogggle? "hidden" : "block"} w-64 bg-gray-800 fixed h-full px-4 py-2`}>
            
            <div className='my-9 mb-4'>
                <h1 className='text-2x text-white font-bold'>BrandLogo</h1>
            </div>
            <hr />

            <ul className='mt-3 text-white font-bold'>
                <li className={`mb-2 rounded hover:shadow  py-2 ${getActiveClass('profile')}`}>
                    <button onClick={() => setActiveComponent('profile')} className='px-3'>
                        <FaUser className='inline-block w-6 h-6 mr-2 -mt-2'></FaUser>
                        Profile
                    </button>
                </li>

                <li className={`mb-2 rounded hover:shadow  py-2 ${getActiveClass('addNumber')}`}>
                    <button onClick={() => setActiveComponent('addNumber')} className='px-3'>
                        <FaMobile className='inline-block w-6 h-6 mr-2 -mt-2'></FaMobile>
                        Add Number
                    </button>
                </li>

                <li className={`mb-2 rounded hover:shadow  py-2 ${getActiveClass('inbox')}`}>
                    <button onClick={() => setActiveComponent('inbox')} className='px-3'>
                        <FaRegEnvelope className='inline-block w-6 h-6 mr-2 -mt-2'></FaRegEnvelope>
                        Inbox
                    </button>
                </li>
            </ul>

        </div>
    </>
  )
}

export default Sidebar
