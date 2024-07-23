import React, { useState } from 'react';
import { FaBars, FaBell, FaUserCircle } from 'react-icons/fa'

const Navbar = ({ sideBarTogggle, setSideBarToggle }) => {

    return (
        <>
            <nav className={`bg-gray-800 ${sideBarTogggle ? "" : "ml-64"} px-4 py-3 flex justify-between`}>

                <div className='flex items-center text-xl'>
                    <FaBars
                        onClick={() => setSideBarToggle(!sideBarTogggle)}
                        className='text-white me-4 cursor-pointer'
                    ></FaBars>
                    <span className='text-white hidden md:block font-semibold'>E-community</span>
                </div>

                <div className='flex items-center gap-x-5 mr-4'>


                    <div className='text-white mr-4'>
                        <FaBell className='w-6 h-6' />
                    </div>

                    <div className='relative'>
                        <button className='text-white group'>
                            <FaUserCircle className='w-10 h-10 mt-1' />
                            <div className='z-10 hidden absolute bg-white rounded-lg shadow w-48 group-focus:block top-full right-0'>
                                <ul className="p-3 text-sm text-gray-950">
                                    <li>
                                        <button className="block  w-full px-4 py-2 hover:bg-blue-100 transition">Log Out</button>
                                    </li>
                                </ul>
                            </div>
                        </button>
                    </div>
                </div>
            </nav>
        </>
    );
};

export default Navbar;

