import {refferanceNumberCheck, mobNumCheck, createNewuser} from "../query/newUser.query.js" ;
import { sendOTP, generateOTP, setOTP, getOTP, clearOTP,otpStore } from "../utils/OTP_utils.js";
import { setTempData, getTempData, clearTempData, tempDataStore } from "../utils/tempDataUtils.js";
import ApiError from "../utils/ApiError.js" ;
import ApiResponse from "../utils/ApiResponse.js" ;

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

        if (user.length > 0) {
            return res.send(new ApiResponse(400, null, "Mobile number already exists"));
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

        // Retrieve reference mobile number from temporary storage
        const reference_mobile_number = await getTempData("reference_mobile_number");

        // Check OTP
        const storedOtp = getOTP("otp");

        if (storedOtp !== otp) {
            return res.send(new ApiResponse(400, null, "Invalid OTP"));
        }

        // Create user
        const userId = await createNewuser(mobile_number, password, reference_mobile_number);

        // Clear OTP and temporary data
        clearOTP(mobile_number);
        clearTempData("reference_mobile_number");
        clearTempData("user_mobile_number");

        return res.send(new ApiResponse(201, { user_id: userId }, "User created successfully"));
    } catch (error) {
        return res.send(new ApiResponse(500, null, `Error: ${error.message}`));
    }
};
