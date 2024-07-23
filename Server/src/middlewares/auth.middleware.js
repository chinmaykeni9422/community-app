import jwt from "jsonwebtoken" ;
import ApiResponse from "../utils/ApiResponse.js"

export const Protect = async (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (token == null) {
        return res.status(401).json(new ApiResponse(401, null, 'Token is missing'));
    }

    try {
        const user = await new Promise((resolve, reject) => {
            jwt.verify(token, process.env.JWT_SECRET, (err, decodedUser) => {
                if (err) {
                    return reject(new ApiError(403, 'Token is invalid or expired'));
                }
                resolve(decodedUser);
            });
        });

        req.user = user; // Attach the user information to the request object
        next(); // Proceed to the next middleware or route handler
    } catch (error) {
        return res.status(error.status || 500).json(new ApiResponse(error.status || 500, null, error.message));
    }
};