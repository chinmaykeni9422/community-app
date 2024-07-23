import React, { useState } from 'react';
import Sidebar from './Sidebar';
import Navbar from './NavBar';
import Profile from "./Profile"
import AddNumber from './AddNumber';
import Inbox from './Inbox';

const HomePage = () => {

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