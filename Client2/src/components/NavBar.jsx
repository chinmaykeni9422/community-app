import React, { useState } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';
import { UserState } from '../Context/userContext';
import { useNavigate } from 'react-router-dom';

const Navbar = ({ sideBarTogggle, setSideBarToggle }) => {

    const navigate = useNavigate();
    const { user } = UserState();

    const photoUrl = user?.profile?.photo_url || "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg";
    const [dropdownOpen, setDropdownOpen] = useState(false);

    return (
        <>
            <div>
                <nav className={`bg-white px-3 py-2 border-b-2 border-slate-700  flex justify-between`}>
                    <div className='flex items-center text-xl'>
                        {sideBarTogggle ? (
                            <FaTimes
                                onClick={() => setSideBarToggle(!sideBarTogggle)}
                                className='text-black me-4 cursor-pointer'
                            />
                        ) : (
                            <FaBars
                                onClick={() => setSideBarToggle(!sideBarTogggle)}
                                className='text-black me-4 cursor-pointer'
                            />
                        )}
                        <span className='text-black block font-semibold'>E-community</span>
                    </div>

                    <div className='flex items-center gap-x-5'>

                        <div className='relative'>
                            <div
                                className='text-white flex items-center cursor-pointer'
                                onClick={() => setDropdownOpen(!dropdownOpen)}
                            >
                                <img className="w-14 h-14 rounded-full" src={photoUrl} alt="Rounded avatar" />
                            </div>
                            
                        </div>
                    </div>
                </nav>
            </div>
        </>
    );
};

export default Navbar;


