import { mobNumCheck, checkUserProfile } from "../query/newUser.query.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import {generateToken} from '../utils/generateToken.js'

const verifyPassword = (password, UserPassword) => {
    if(password != UserPassword){
        return false ;
    }
    return true ;
};

// Controller function to check user login
export const checkUserLogin = async (req, res) => {
    const { mobile_number, password } = req.body;

    try {
        if (!mobile_number || !password) {
            return res.send(new ApiResponse(400, null, "Mobile number and password are required"));
        }

        // Check if the user with the given mobile number exists
        const user = await mobNumCheck(mobile_number);

        if (user.length === 0) {
            return res.send(new ApiResponse(400, null, "User not found"));
        }

        // Verify the password
        const passwordMatch = verifyPassword(password, user[0].password);

        if (!passwordMatch) {
            return res.send(new ApiResponse(400, null, "Incorrect password"));
        }

        // Check if user profile is completed
        const userProfile = await checkUserProfile(user[0].user_id);

        const token = generateToken({ user_id: user[0].user_id, mobile_number: user[0].mobile_number });

        if (userProfile.length === 0) {
            return res.send(new ApiResponse(200, { user_id: user[0].user_id, token, redirectTo: '/profile' }, "Profile incomplete, please complete your profile"));
        } else {
            return res.send(new ApiResponse(200, { user_id: user[0].user_id, token, redirectTo: '/home' }, "Login successful"));
        }
    } catch (error) {
        throw new ApiError(500, `Error: ${error.message}`);
    }
};
