import { uploadOnCloudinary } from '../utils/cloudnary.js';
import {refferanceNumberCheck, mobNumCheck, createNewuser, createUserProfile, getEnumValues, mobNumCheck2} from "../query/newUser.query.js" ;
import { sendOTP, generateOTP, setOTP, getOTP, clearOTP,otpStore } from "../utils/OTP_utils.js";
import { setTempData, getTempData, clearTempData, tempDataStore } from "../utils/tempDataUtils.js";
import ApiError from "../utils/ApiError.js" ;
import ApiResponse from "../utils/ApiResponse.js" ;
import { generateToken } from '../utils/generateToken.js';

export const checkRefNum = async (req, res) => {
    const { reference_mobile_number } = req.body;

    if (reference_mobile_number === '') {
        return res.send(new ApiResponse(404, {}, "Enter reference mobile number"));
    }

    try {
        const refUser = await refferanceNumberCheck(reference_mobile_number);

        if (refUser.length === 0) {
            return res.send(new ApiResponse(404, {}, "Reference User not found"));
        }

        // Save reference_mobile_number in temporary storage
        await setTempData("reference_mobile_number", reference_mobile_number);

        const user = refUser[0]; // Access the first user from the array

        return res
            .status(201)
            .json(new ApiResponse(201, {
                user_id: user.user_id,
                mobile_number: user.mobile_number,
                reference_mobile_number: user.reference_mobile_number
            }, "Reference User found"));
    } catch (error) {
        console.error('Error occurred:', error);
        return res
            .status(500)
            .json(new ApiError(500, `Error: ${error.message}`));
    }
};

export const checkUserMobNum = async (req, res) => {
    const { mobile_number } = req.body;

    try {
        if (!mobile_number) {
            return res.send(new ApiResponse(400, null, "Mobile number is required"));
        }

        const user = await mobNumCheck(mobile_number);

        if (user.length === 0) {
            return res.send(new ApiResponse(400, null, "Mobile number not exists"));
        }

        const user1 = await mobNumCheck2(mobile_number);

        if (user1.length > 0) {
            return res.send(new ApiResponse(400, null, "Mobile number alredy registered"));
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

        // Create user
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
            return res.send(new ApiResponse(500, {}, 'Failed to upload image'));
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
        const token = generateToken({ user_id: userId, email_id });

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