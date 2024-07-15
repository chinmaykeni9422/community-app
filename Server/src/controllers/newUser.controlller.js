import {refferanceNumberCheck, mobNumCheck} from "../query/newUser.query.js" ;
import { sendOTP, generateOTP } from "../utils/OTP_utils.js";
import ApiError from "../utils/ApiError.js" ;
import ApiResponse from "../utils/ApiResponse.js" ;

export const checkRefNum = async (req, res) => {
    const { reference_mobile_number } = req.body;

    try {
        const refUser = await refferanceNumberCheck(reference_mobile_number);

        if (refUser.length === 0) {
            return res
                .status(200)
                .json(new ApiResponse(404, {}, "Reference User not found"));
        }

        return res
            .status(201)
            .json(new ApiResponse(201, { refUser }, "Reference User found"));
    } catch (error) {
        return res
            .status(500)
            .json(new ApiError(500, `Error: ${error.message}`));
    }
};

export const checkUserMobNum = async (req,res) => {
    const {mobile_number} = req.body ;

    try {
        const user = await mobNumCheck(mobile_number) ;

        if (user.length > 0) {
            return res.status(400).json(new ApiResponse(400, null, "Mobile number already exists"));
        }

        // Generate OTP
        const otp = generateOTP();

        // Send OTP (replace with actual sending logic)
        const otpSent = await sendOTP(mobile_number, otp);

        if (!otpSent) {
            throw new ApiError(500, "Failed to send OTP");
        }

        return res.status(200).json(new ApiResponse(200, { otp }, "OTP sent successfully"));
    } catch (error) {
        throw new ApiError(500,`error is -> ${error}`) ;
    }
}  ;

