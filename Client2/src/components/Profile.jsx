import React, { useState } from 'react';

const ProfilePage = () => {

    const userData = {
        first_name: "John",
        last_name: "Doe",
        middle_name: "A",
        birthdate: "1990-01-01",
        gender: "Male",
        marital_status: "Single",
        caste: "General",
        current_village_city: "New York",
        current_pin_code: "10001",
        native_village_city: "Los Angeles",
        occupation: "Developer",
        working_place: "Google",
        hobbies: "Reading, Traveling",
        email_id: "john.doe@example.com",
        photo_upload: "https://via.placeholder.com/150"
    };

    const [editModalOpen, setEditModalOpen] = useState(false);
    const [formData, setFormData] = useState(userData);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleEditClick = () => {
        setEditModalOpen(true);
    };

    const handleSaveClick = () => {
        // Save the changes logic
        setEditModalOpen(false);
    };

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col items-center py-8">
            <div className="bg-white shadow-xl rounded-lg p-8 w-full max-w-5xl">
                <div className="flex items-center justify-between mb-8">
                    <h1 className="text-4xl font-bold text-indigo-800">Profile</h1>
                    <img
                        src={formData.photo_upload}
                        alt="Profile"
                        className="w-30 h-30 rounded-full border-4 border-indigo-500"
                    />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {Object.keys(userData).map((key) => (
                        key !== 'photo_upload' && (
                            <div key={key} className="flex justify-between bg-indigo-50 p-4 rounded-lg shadow-sm">
                                <span className="font-medium text-gray-700">{key.replace(/_/g, ' ')}</span>
                                <span className="text-gray-900">{formData[key]}</span>
                            </div>
                        )
                    ))}
                </div>
                <button
                    onClick={handleEditClick}
                    className="mt-8 bg-indigo-600 text-white py-3 px-6 rounded-lg hover:bg-indigo-700 transition"
                >
                    Edit
                </button>
            </div>

            {editModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
                    <div className="bg-white p-8 rounded-lg w-full max-w-3xl">
                        <h2 className="text-2xl font-bold mb-6">Edit Profile</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {Object.keys(userData).map((key) => (
                                key !== 'photo_upload' && (
                                    <div key={key}>
                                        <label className="block text-gray-700 mb-2">{key.replace(/_/g, ' ')}</label>
                                        <input
                                            type="text"
                                            name={key}
                                            value={formData[key]}
                                            onChange={handleInputChange}
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500"
                                        />
                                    </div>
                                )
                            ))}
                        </div>
                        <div className="flex justify-end mt-6">
                            <button
                                onClick={() => setEditModalOpen(false)}
                                className="mr-4 bg-gray-400 text-white py-2 px-4 rounded hover:bg-gray-500 transition"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleSaveClick}
                                className="bg-indigo-600 text-white py-2 px-4 rounded hover:bg-indigo-700 transition"
                            >
                                Save
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ProfilePage;

