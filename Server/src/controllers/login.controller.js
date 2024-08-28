import { mobNumCheck, checkUserProfile, UpdateUserProfile, addMobNum, mobNumCheck2, getUserNumbers } from "../query/newUser.query.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import { generateToken } from '../utils/generateToken.js'

const verifyPassword = (password, UserPassword) => {
    if (password != UserPassword) {
        return false;
    }
    return true;
};

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

        // If the profile is not completed, return an appropriate response
        if (userProfile.length === 0) {
            return res.send(new ApiResponse(200, {
                user_id: user[0].user_id,
                redirectTo: 'ProfileForm'
            }, "Profile is incomplete. Please complete your profile."));
        }

        const token = generateToken({ user_id: user[0].user_id, mobile_number: user[0].mobile_number });

        // Prepare the response data
        const responseData = {
            user_id: user[0].user_id,
            token,
            profile: userProfile[0],
        };

        return res.send(new ApiResponse(200, responseData, "Login successful"));
    } catch (error) {
        throw new ApiError(500, `Error: ${error.message}`);
    }
};

export const addUserNumber = async (req, res) => {
    const { mobile_number, user_id } = req.body;

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

export const getNumbers = async (req, res) => {
    const { user_id } = req.params;

    try {
        if (!user_id) {
            return res.send(new ApiResponse(400, null, "User ID is missing"));
        }

        // Fetch the mobile numbers for the given user
        const numbers = await getUserNumbers(user_id);

        // If no numbers are found
        if (numbers.length === 0) {
            return res.send(new ApiResponse(404, null, "No mobile numbers found for this user"));
        }

        return res.send(new ApiResponse(200, numbers, "Mobile numbers fetched successfully"));
    } catch (error) {
        throw new ApiError(500, `Error: ${error.message}`);
    }
};

export const UpdateProfile = async (req, res) => {
    const {
        user_id,
        first_name,
        middle_name,
        last_name,
        marital_status,
        caste,
        occupation,
        birthdate,
        gender,
        current_pin_code,
        working_place,
        native_village_city,
        current_village_city,
        email_id,
        hobbies
    } = req.body;

    try {

        const profileToUpdate = {
            user_id,
            first_name,
            middle_name,
            last_name,
            marital_status,
            caste,
            occupation,
            birthdate,
            gender,
            current_pin_code,
            working_place,
            native_village_city,
            current_village_city,
            email_id,
            hobbies
        };

        if(!user_id){
            return res.send(new ApiResponse(400, {}, 'user_id is not available'));
        }

        const result = await UpdateUserProfile(profileToUpdate)

        if (result.affectedRows > 0) {
            return res.send(new ApiResponse(200, profileToUpdate, 'Profile updated successfully'));
        } else {
            return res.send(new ApiResponse(400, {}, 'Profile not found or no changes made'));
        }

    } catch (error) {
        throw new ApiError(500, `Error: ${error.message}`);
    }

}

