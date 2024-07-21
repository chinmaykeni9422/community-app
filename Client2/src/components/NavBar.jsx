import React, { useState } from 'react';
import { MenuIcon, XIcon } from '@heroicons/react/outline';

const Navbar = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const [dropdownOpen, setDropdownOpen] = useState(false);

    return (
        <nav className="flex  justify-between items-center p-4 bg-gradient-to-r from-blue-600 to-indigo-600 shadow-md md:m-1 md:rounded-lg">

            <div className="text-white font-bold text-2xl">
                <a href="/">BrandLogo</a>
            </div>

            <div className="md:hidden flex items-center">
                <button
                    onClick={() => setMenuOpen(!menuOpen)}
                    className="text-white focus:outline-none"
                >
                    {menuOpen ? <XIcon className="h-6 w-6" /> : <MenuIcon className="h-6 w-6" />}
                </button>
            </div>

            <ul className={`flex-col mr-4 md:flex md:flex-row md:space-x-8 ${menuOpen ? 'block' : 'hidden'} md:flex md:items-center absolute md:static top-16 right-0 md:top-auto md:right-auto w-full md:w-auto  md:bg-transparent z-10`}>
                <li>
                    <a href="/home" className="text-white hover:text-gray-300 transition block md:inline">Home</a>
                </li>
                <li>
                    <a href="/about" className="text-white hover:text-gray-300 transition block md:inline">About</a>
                </li>
                <li className="relative">
                    <button
                        onClick={() => setDropdownOpen(!dropdownOpen)}
                        className="text-white hover:text-gray-300 transition focus:outline-none block md:inline"
                    >
                        Account
                    </button>
                    {dropdownOpen && (
                        <div className="absolute right-0 mt-2 bg-white shadow-lg rounded-md w-40 md:w-48 z-20">
                            <a href="/profile" className="block px-4 py-2 text-gray-800 hover:bg-gray-100">Profile</a>
                            <a href="/add-number" className="block px-4 py-2 text-gray-800 hover:bg-gray-100">Add Number</a>
                            <a href="/logout" className="block px-4 py-2 text-gray-800 hover:bg-gray-100">Logout</a>
                        </div>
                    )}
                </li>
            </ul>
            
        </nav>
    );
};

export default Navbar;

