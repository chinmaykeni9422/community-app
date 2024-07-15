export const generateOTP = () => {
    const otpLength = 6; // 6-digit OTP
    const otp = Math.floor(100000 + Math.random() * 900000); // Random 6-digit number
    return otp.toString(); // Convert to string
};

export const sendOTP = async (mobileNumber, otp) => {
    console.log(`OTP sent to ${mobileNumber}: ${otp}`);
    // Simulate success for example
    return true;
};