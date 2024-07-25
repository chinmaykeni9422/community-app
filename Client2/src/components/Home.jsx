import React, { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import Navbar from './NavBar';
import Profile from "./Profile"
import AddNumber from './AddNumber';
import Inbox from './Inbox';
import { useNavigate } from 'react-router-dom';


const HomePage = () => {

    const navigate = useNavigate();

    useEffect(() => {
        const userInfo = JSON.parse(localStorage.getItem('userInfo'));

        if (!userInfo || !userInfo.token) {
            // If no token or userInfo is found, redirect to login or profile page
            navigate('/login'); // or any other page you want to redirect to
        }
    }, [navigate]);

    const [sideBarTogggle, setSideBarToggle] = useState(false);
    const [activeComponent, setActiveComponent] = useState('profile');

    const renderComponent = () => {
        switch (activeComponent) {
            case 'profile':
                return <Profile />;
            case 'addNumber':
                return <AddNumber />;
            case 'inbox':
                return <Inbox />;
            default:
                return <Profile />;
        }
    };

    return (
        <>
            <div>
                <div>
                    <Sidebar
                        sideBarTogggle={sideBarTogggle} 
                        setActiveComponent={setActiveComponent}
                        activeComponent={activeComponent}
                    />
                </div>
                <div>
                    <Navbar
                            sideBarTogggle={sideBarTogggle}
                            setSideBarToggle={setSideBarToggle}
                    />
                    <div className={`${sideBarTogggle ? "" : "ml-64"}`}>
                        {renderComponent()}
                    </div>
                </div>
            </div>
        </>
    );
};

export default HomePage;