import React from 'react'
import {FaUser, FaMobile, FaRegEnvelope, FaArrowLeft} from 'react-icons/fa' 
import { useNavigate } from 'react-router-dom';

const Sidebar = ({sideBarTogggle, setActiveComponent, activeComponent,setSideBarToggle}) => {

    const navigate = useNavigate();

    const getActiveClass = (component) => component === activeComponent ? 'bg-slate-300' : '';

    const handleComponentChange = (component) => {
        setActiveComponent(component);
        setSideBarToggle(false); 
    };

    const logoutHandler = () => {
        localStorage.removeItem("userInfo");
        navigate("/"); // Redirect to homepage or login page
    }

  return (
    <>
        <div className={`sidebar ${sideBarTogggle ? 'open' : ''} border-r-2 border-slate-200 bg-slate-100 w-64 bg-ehite fixed h-full px-4 py-2`}>
            
            <ul className='mt-3 text-black  font-bold'>
                <li className={`mb-2 rounded hover:shadow  py-2 ${getActiveClass('profile')}`}>
                    <button onClick={() => handleComponentChange('profile')} className='px-3'>
                        <FaUser className='inline-block w-6 h-6 mr-2 -mt-2'></FaUser>
                        Profile
                    </button>
                </li>

                <li className={`mb-2 rounded hover:shadow  py-2 ${getActiveClass('addNumber')}`}>
                    <button onClick={() => handleComponentChange('addNumber')} className='px-3'>
                        <FaMobile className='inline-block w-6 h-6 mr-2 -mt-2'></FaMobile>
                        Add Number
                    </button>
                </li>

                <li className={`mb-2 rounded hover:shadow  py-2 ${getActiveClass('inbox')}`}>
                    <button onClick={() => handleComponentChange('inbox')} className='px-3'>
                        <FaRegEnvelope className='inline-block w-6 h-6 mr-2 -mt-2'></FaRegEnvelope>
                        Inbox
                    </button>
                </li>

                <li className={`mb-2 rounded hover:shadow  py-2`}>
                    <button onClick={logoutHandler} className='px-3'>
                        <FaArrowLeft className='inline-block w-6 h-6 mr-2 -mt-2'></FaArrowLeft>
                        Log out
                    </button>
                </li>
            </ul>

        </div>
    </>
  )
}

export default Sidebar
