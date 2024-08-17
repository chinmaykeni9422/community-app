import { uploadOnCloudinary } from '../utils/cloudnary.js';
import {mobNumCheck, createNewuser, createUserProfile, getEnumValues, mobNumCheck2} from "../query/newUser.query.js" ;
import { sendOTP, generateOTP, setOTP, getOTP, clearOTP,otpStore } from "../utils/OTP_utils.js";
import { setTempData, getTempData, clearTempData, tempDataStore } from "../utils/tempDataUtils.js";
import ApiResponse from "../utils/ApiResponse.js" ;
import { generateToken } from '../utils/generateToken.js';

export const checkUserMobNum = async (req, res) => {
    const { mobile_number } = req.body;

    try {
        if (!mobile_number) {
            return res.send(new ApiResponse(400, null, "Mobile number is required"));
        }

        const user1 = await mobNumCheck2(mobile_number);

        if (user1.length > 0) {
            return res.send(new ApiResponse(400, null, "Mobile number alredy registered"));
        }

        const user = await mobNumCheck(mobile_number);

        if (user.length === 0) {
            return res.send(new ApiResponse(400, null, "Mobile number not exists"));
        }

        // Generate OTP
        const otp = generateOTP();

        // Store OTP
        setOTP("otp", otp);

        // Send OTP
        const otpSent = await sendOTP(mobile_number, otp);

        if (!otpSent) {
            return res.send(new ApiResponse(400, null, "Failed to send OTP"));
        }

        // Store the mobile number in temporary storage
        await setTempData("user_mobile_number", mobile_number);

        return res.send(new ApiResponse(200, { otp }, "OTP sent successfully"));
    } catch (error) {
        return res.send(new ApiResponse(400, null, `Error: ${error.message}`));
    }
};

export const verifyOTP = async (req, res) => {
    const { otp, password } = req.body;

    try {
        // Retrieve the mobile number from temporary storage
        const mobile_number = await getTempData("user_mobile_number");

        if (!mobile_number) {
            return res.send(new ApiResponse(400, null, "Mobile number is required"));
        }

        if (!otp || !password) {
            return res.send(new ApiResponse(400, null, "All fields are required"));
        }

        // Check OTP
        const storedOtp = getOTP("otp");

        if (storedOtp !== otp) {
            return res.send(new ApiResponse(400, null, "Invalid OTP"));
        }

        // Create user`
        const userId = await createNewuser(mobile_number, password);

        // Clear OTP and temporary data
        clearOTP(mobile_number);
        clearTempData("user_mobile_number");

        return res.send(new ApiResponse(201, { user_id: userId}, "User created successfully"));
    } catch (error) {
        return res.send(new ApiResponse(500, null, `Error: ${error.message}`));
    }
};

export const createUserProfileController = async (req, res) => {
    try {
        const {
            user_id,
            firstName,
            middleName,
            lastName,
            birthdate,
            gender,
            marital_status,
            caste,
            currentVillageCity,
            currentPinCode,
            nativeVillageCity,
            occupation,
            workingPlace,
            hobbies,
            email_id
        } = req.body;

        const File = req.file;

        if (!File) {
            return res.send(new ApiResponse(400, {}, 'Photo is required'));
        }

        const filePath = req.file.path;

        const uploadResult = await uploadOnCloudinary(filePath);

        if (!uploadResult) {
            return res.send(new ApiResponse(400, {}, 'Failed to upload image'));
        }

        const photo_url = uploadResult.url;

        const profile = {
            user_id,
            firstName,
            middleName,
            lastName,
            birthdate,
            gender,
            marital_status,
            caste,
            currentVillageCity,
            currentPinCode,
            nativeVillageCity,
            occupation,
            workingPlace,
            hobbies,
            email_id,
            photo_url
        };

        const userId = await createUserProfile(profile);

        // Generate token
        const token = generateToken({ user_id: userId, mobile_number });

        return res.send(new ApiResponse(201, {userId, profile, token}, 'User profile created successfully'));
    } catch (error) {
        console.error('Error creating user profile:', error);
        return res.status(500).json(new ApiResponse(500, {}, 'Internal server error'));
    }
};

export const fetchEnumValues = async (req, res) => {
    const { columnName } = req.params;

    try {
        const values = await getEnumValues(columnName);

        if (values.length > 0) {
            return res.send(new ApiResponse(200, values, 'Enum values fetched successfully'));
        } else {
            return res.send(new ApiResponse(404, null, 'No enum values found'));
        }
    } catch (error) {
        return res.send(new ApiResponse(500, null, `Error: ${error.message}`));
    }
};