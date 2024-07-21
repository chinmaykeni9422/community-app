import React from 'react';
import Navbar from './NavBar.jsx';

const HomePage = () => {
    return (
        <div className="overflow-hidden h-screen">
        
        <div className="p-8 bg-gray-100 min-h-screen">
            {/* Hero Section */}
            <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
                <h1 className="text-4xl font-bold mb-4">Welcome to Our Website</h1>
                <p className="text-lg text-gray-600">Explore our features and services</p>
            </div>

            {/* Other Sections */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="bg-white h-32 rounded-lg shadow-md"></div>
                <div className="bg-white h-32 rounded-lg shadow-md"></div>
                <div className="bg-white h-32 rounded-lg shadow-md"></div>
            </div>
        </div>
    </div>
    );
};

export default HomePage;