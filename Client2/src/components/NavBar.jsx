import React, {useState} from 'react';
import { FaBars, FaBell } from 'react-icons/fa';
import { UserState } from '../Context/userContext';
import { useNavigate } from 'react-router-dom';

const Navbar = ({ sideBarTogggle, setSideBarToggle }) => {

    const navigate = useNavigate();
    const { user } = UserState();

    const photoUrl = user?.profile?.photo_url || "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg";
    const [dropdownOpen, setDropdownOpen] = useState(false);

    // log out handler
    const logoutHandler = () => {
        localStorage.removeItem("userInfo");
        navigate("/"); // Redirect to homepage or login page
    }

    return (
        <>
            <nav className={`bg-gray-800 ${sideBarTogggle ? "" : "ml-64"} px-4 py-3 flex justify-between`}>
                <div className='flex items-center text-xl'>
                    <FaBars
                        onClick={() => setSideBarToggle(!sideBarTogggle)}
                        className='text-white me-4 cursor-pointer'
                    />
                    <span className='text-white hidden md:block font-semibold'>E-community</span>
                </div>

                <div className='flex items-center gap-x-5 mr-4'>
                    <div className='text-white mr-4'>
                        <FaBell className='w-6 h-6' />
                    </div>

                    <div className='relative'>
                        <div
                            className='text-white flex items-center cursor-pointer'
                            onClick={() => setDropdownOpen(!dropdownOpen)}
                        >
                            <img className="w-14 h-14 rounded-full mr-2" src={photoUrl} alt="Rounded avatar" />
                        </div>
                        {dropdownOpen && (
                            <div className='z-10 absolute bg-white rounded-lg shadow w-48 top-full right-0'>
                                <ul className="p-3 text-sm text-gray-950">
                                    <li>
                                        <button
                                            onClick={logoutHandler}
                                            className="block w-full px-4 py-2 hover:bg-blue-100 transition"
                                        >
                                            Log Out
                                        </button>
                                    </li>
                                </ul>
                            </div>
                        )}
                    </div>
                </div>
            </nav>
        </>
    );
};

export default Navbar;


