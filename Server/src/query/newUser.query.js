import {pool} from "../db/database.js" ;

export const refferanceNumberCheck = async (refNumber) => {
    const [rows] = await pool.query(
        'SELECT * FROM users WHERE mobile_number = ?', [refNumber] 
    ) ;
    return rows ;
} ;

export const mobNumCheck = async (mobNum) => {
    const [rows] = await pool.query(
        'SELECT * FROM users WHERE mobile_number = ?', [mobNum]
    );
    return rows;
};

export const createNewuser = async (userNum, password, refMobileNum) => {
    const [result] = await pool.query(
        'INSERT INTO users (mobile_number, password, reference_mobile_number) VALUES (?, ?, ?)',
        [userNum, password, refMobileNum]
    );
    return result.insertId;
};

export const createUserProfile = async (profileData) => {
    const {
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
        photoUrl // Assuming you store the URL after uploading to Cloudinary
    } = profileData;

    const [result] = await pool.query(
        `INSERT INTO userprofile   
        (first_name, middle_name, last_name, birthdate, gender, marital_status, caste, 
         current_village_city, current_pin_code, native_village_city, occupation, 
         working_place, hobbies,  email_id, photo_url) 
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
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
            photoUrl
        ]
    );

    return result.insertId;
};
