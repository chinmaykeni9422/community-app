import React, { useState, useEffect } from 'react';
import axios from "axios" ;
import { useNavigate, useLocation } from 'react-router-dom';

const UserProfilePage = () => {

    const navigate = useNavigate();
    const location = useLocation(); 
    const user_id = location.state?.user_id ; // Get user_id from state

    const [formData, setFormData] = useState({
        caste: '',
        currentVillageCity: '',
        currentPinCode: '',
        nativeVillageCity: '',
        firstName: '',
        middleName: '',
        lastName: '',
        birthdate: '',
        gender: '',
        marital_status: '',
        occupation: '',
        workingPlace: '',
        hobbies: '',
        email_id: '',
        photo: null // For handling file upload
    });

    const [enumValues, setEnumValues] = useState({
        gender: [],
        maritalStatus: [],
        occupation: [],
        caste: [],
        nativeVillageCity: [],
        currentVillageCity: []
    });

    const fetchEnumValues = async (columnName) => {
        try {
            const response = await axios.get(`/api/newuser/enums/${columnName}`);
            return response.data.data || [];
        } catch (error) {
            console.error(`Error fetching ${columnName} values:`, error);
            return [];
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setFormData(prevState => ({
            ...prevState,
            photo: file
        }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();
    
        const data = new FormData();
        data.append('user_id', user_id);
        Object.keys(formData).forEach(key => {
            data.append(key, formData[key]);
        });
    
        axios.post('/api/newuser/create-profile', data, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
        .then((response) => {
            console.log(response.data);
            if (response.data.statusCode === 400) {
                console.log(response.data.message);
            } else if (response.data.statusCode === 201) {
                navigate('/home');
            }
        })
        .catch((error) => {
            console.error('Error occurred:', error.message);
        });
    };

    useEffect(() => {
        const loadEnumValues = async () => {
            setEnumValues({
                gender: await fetchEnumValues('gender'),
                maritalStatus: await fetchEnumValues('marital_status'),
                occupation: await fetchEnumValues('occupation'),
                caste: await fetchEnumValues('caste'),
                nativeVillageCity: await fetchEnumValues('native_village_city'),
                currentVillageCity: await fetchEnumValues('current_village_city')
            });
        };

        loadEnumValues();
    }, []);

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="max-w-4xl w-full bg-white shadow-md rounded-lg p-8">
                <h1 className="text-3xl font-bold text-center mb-8">User Profile</h1>
                <form onSubmit={handleSubmit} className="space-y-6" encType='multipart/form-data'>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        {/* Left Column */}
                        <div className="col-span-1">
                            <label htmlFor="firstName" className="block text-lg font-medium text-gray-700 ">
                                First Name <span className="text-red-500">*</span>
                            </label>
                            <input
                                id="firstName"
                                name="firstName"
                                type="text"
                                value={formData.firstName}
                                onChange={handleChange}
                                className="p-1 w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-lg"
                                placeholder="Enter First Name"
                                required
                            />
                        </div>
                        <div className="col-span-1">
                            <label htmlFor="lastName" className="block text-lg font-medium text-gray-700">
                                Last Name <span className="text-red-500">*</span>
                            </label>
                            <input
                                id="lastName"
                                name="lastName"
                                type="text"
                                value={formData.lastName}
                                onChange={handleChange}
                                className="p-1 border w-full border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-lg"
                                placeholder="Enter Last Name"
                                required
                            />
                        </div>
                        <div className="col-span-1">
                            <label htmlFor="middleName" className="block text-lg font-medium text-gray-700">
                                Middle Name <span className="text-red-500">*</span>
                            </label>
                            <input
                                id="middleName"
                                name="middleName"
                                type="text"
                                value={formData.middleName}
                                onChange={handleChange}
                                className="p-1 border w-full border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-lg"
                                placeholder="Enter Middle Name"
                                required
                            />
                        </div>
                        <div className="col-span-1">
                            <label htmlFor="birthdate" className="block text-lg font-medium text-gray-700 ">
                                Birthdate <span className="text-red-500">*</span>
                            </label>
                            <input
                                id="birthdate"
                                name="birthdate"
                                type="date"
                                value={formData.birthdate}
                                onChange={handleChange}
                                className="p-1 border w-full border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-lg"
                                required
                            />
                        </div>
                        <div className="col-span-1">
                            <label htmlFor="gender" className="block text-lg font-medium text-gray-700 ">
                                Gender <span className="text-red-500">*</span>
                            </label>
                            <select
                                id="gender"
                                name="gender"
                                value={formData.gender}
                                onChange={handleChange}
                                className="p-1 border w-full border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-lg"
                                required
                            >
                                <option value="">Select Gender</option>
                                {enumValues.gender.map((option) => (
                                    <option key={option} value={option.toLowerCase()}>
                                        {option}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="col-span-1">
                            <label htmlFor="marital_status" className="block text-lg font-medium text-gray-700 ">
                                Marital Status <span className="text-red-500">*</span>
                            </label>
                            <select
                                id="marital_status"
                                name="marital_status"
                                value={formData.marital_status}
                                onChange={handleChange}
                                required
                                className="p-1 border w-full border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-lg"
                            >
                                <option value="">Select Marital Status</option>
                                {enumValues.maritalStatus.map((option) => (
                                    <option key={option} value={option.toLowerCase()}>
                                        {option}
                                    </option>
                                ))}
                            </select>
                        </div>
                        {/* Right Column */}
                        <div className="col-span-1">
                            <label htmlFor="caste" className="block text-lg font-medium text-gray-700 ">
                                Caste <span className="text-red-500">*</span>
                            </label>
                            <select
                                id="caste"
                                name="caste"
                                value={formData.caste}
                                onChange={handleChange}
                                required
                                className="p-1 border w-full border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-lg"
                            >
                                <option value="">Select Caste</option>
                                {enumValues.caste.map((option) => (
                                    <option key={option} value={option.toLowerCase()}>
                                        {option}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="col-span-1">
                            <label htmlFor="currentVillageCity" className="block text-lg font-medium text-gray-700">
                                Current Village/City <span className="text-red-500">*</span>
                            </label>
                            <select
                                id="currentVillageCity"
                                name="currentVillageCity"
                                value={formData.currentVillageCity}
                                onChange={handleChange}
                                required
                                className="p-1 border w-full border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-lg"
                            >
                                <option value="">Select Current Village/City</option>
                                {enumValues.currentVillageCity.map((option) => (
                                    <option key={option} value={option.toLowerCase()}>
                                        {option}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="col-span-1">
                            <label htmlFor="currentPinCode" className="block text-lg font-medium text-gray-700 ">
                                Current Pin-Code <span className="text-red-500">*</span>
                            </label>
                            <input
                                id="currentPinCode"
                                name="currentPinCode"
                                type="text"
                                value={formData.currentPinCode}
                                onChange={handleChange}
                                required
                                className="p-1 border w-full border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-lg"
                                placeholder="Enter Current Pin-Code"
                            />
                        </div>
                        <div className="col-span-1">
                            <label htmlFor="nativeVillageCity" className="block text-lg font-medium text-gray-700">
                                Native Village/City <span className="text-red-500">*</span>
                            </label>
                            <select
                                id="nativeVillageCity"
                                name="nativeVillageCity"
                                value={formData.nativeVillageCity}
                                onChange={handleChange}
                                required
                                className="p-1 border w-full border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-lg"
                            >
                                <option value="">Select Native Village/City</option>
                                {enumValues.nativeVillageCity.map((option) => (
                                    <option key={option} value={option.toLowerCase()}>
                                        {option}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="col-span-1">
                            <label htmlFor="occupation" className="block text-lg font-medium text-gray-700 ">
                                Occupation <span className="text-red-500">*</span>
                            </label>
                            <select
                                id="occupation"
                                name="occupation"
                                value={formData.occupation}
                                onChange={handleChange}
                                required
                                className="p-1 border w-full border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-lg"
                            >
                                <option value="">Select Occupation</option>
                                {enumValues.occupation.map((option) => (
                                    <option key={option} value={option.toLowerCase()}>
                                        {option}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="col-span-1">
                            <label htmlFor="workingPlace" className="block text-lg font-medium text-gray-700 ">
                                Working Place <span className="text-red-500">*</span>
                            </label>
                            <input
                                id="workingPlace"
                                name="workingPlace"
                                type="text"
                                value={formData.workingPlace}
                                onChange={handleChange}
                                className="p-1 border w-full border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-lg"
                                placeholder="Enter Working Place"
                                required
                            />
                        </div>
                        <div className="col-span-1">
                            <label htmlFor="hobbies" className="block text-lg font-medium text-gray-700">
                                Hobbies
                            </label>
                            <input
                                id="hobbies"
                                name="hobbies"
                                type="text"
                                value={formData.hobbies}
                                onChange={handleChange}
                                className="p-1 border w-full border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-lg"
                                placeholder="Enter Hobbies (comma-separated)"
                            />
                        </div>
                        <div className="col-span-1">
                            <label htmlFor="email_id" className="block text-lg font-medium text-gray-700">
                                Email ID
                            </label>
                            <input
                                id="email_id"
                                name="email_id"
                                type="email_id"
                                value={formData.email_id}
                                onChange={handleChange}
                                className="p-1 border w-full border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-lg"
                                placeholder="Enter Email ID"
                            />
                        </div>
                        <div className="col-span-1">
                            <label htmlFor="photo" className="block text-lg font-medium text-gray-700">
                                Photo <span className="text-red-500">*</span>
                            </label>
                            <input
                                id="photo"
                                name="photo"
                                type="file"
                                onChange={handleFileChange}
                                required
                                className="p-1 border w-full border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-lg"
                            />
                        </div>
                    </div>
                    <div className="text-center mt-8">
                        <button
                            type="submit"
                            className="w-full bg-blue-500 text-white py-3 px-6 rounded-md shadow-md hover:bg-blue-600 transition-colors duration-300 ease-in-out focus:outline-none"
                        >
                            Save Profile
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default UserProfilePage;
