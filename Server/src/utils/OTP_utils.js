// Store OTPs temporarily (use a more secure way in production)
export const otpStore = {};

export const generateOTP = () => {
    return Math.floor(100000 + Math.random() * 900000).toString();
};

export const sendOTP = async (mobileNumber, otp) => {
    if (!mobileNumber || !otp) {
        throw new Error("Mobile number and OTP are required");
    }
    // Simulate sending OTP (replace with actual logic)
    console.log(`Sending OTP ${otp} to mobile number ${mobileNumber}`);
    return true; // Return true if sending is successful
};

// Function to set OTP in the store
export const setOTP = (mobileNumber, otp) => {
    otpStore[mobileNumber] = otp;
    // Set a timeout to clear OTP after 5 minutes (300000 milliseconds)
    setTimeout(() => {
        delete otpStore[mobileNumber];
    }, 300000);
};

export const clearOTP = async (key) => {
    delete otpStore[key];
};

// Function to get OTP from the store
export const getOTP = (key) => {
    const otp = otpStore[key];
    return otp;
};