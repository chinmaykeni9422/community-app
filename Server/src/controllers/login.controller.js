import { mobNumCheck, checkUserProfile, addMobNum, mobNumCheck2 } from "../query/newUser.query.js";
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
            return res.send(new ApiResponse(400, null, "Mobile number or password is missing"));
        }

        // Check if the user with the given mobile number exists
        const user = await mobNumCheck2(mobile_number);

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

        // Prepare the response data
        const responseData = {
            user_id: user[0].user_id,
            token,
            profile: userProfile.length > 0 ? userProfile[0] : null, // Include profile data if exists
            redirectTo: userProfile.length === 0 ? '/profile' : '/home' // Redirect based on profile completion
        };

        return res.send(new ApiResponse(200, responseData, "Login successful"));
    } catch (error) {
        throw new ApiError(500, `Error: ${error.message}`);
    }
};

export const addUserNumber = async (req, res) => {
    const {mobile_number, user_id} = req.body ;

    try {
        if (!mobile_number || !user_id) {
            return res.send(new ApiResponse(400, null, "Mobile number or user_id is missing"));
        }

        const result = await mobNumCheck(mobile_number);

        if (result.length > 0) {
            return res.send(new ApiResponse(400, null, "Mobile number alredy exists"));
        }

        const result2 = await mobNumCheck2(mobile_number);

        if (result2.length > 0) {
            return res.send(new ApiResponse(400, null, "Registered mobile number"));
        }

        const user = await addMobNum(user_id, mobile_number)

        if (user.length === 0) {
            return res.send(new ApiResponse(400, null, "mobile number was not added"));
        }

        return res.send(new ApiResponse(200, {}, "Mobile number added successfully"));
    } catch (error) {
        throw new ApiError(500, `Error: ${error.message}`);
    }
}
