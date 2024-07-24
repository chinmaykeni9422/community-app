import {pool} from "../db/database.js" ;

export const refferanceNumberCheck = async (refNumber) => {
    const [rows] = await pool.query(
        'SELECT * FROM users WHERE mobile_number = ?', [refNumber] 
    ) ;
    return rows ;
} ;

export const mobNumCheck = async (mobNum) => {
    const [rows] = await pool.query(
        'SELECT * FROM user_numbers WHERE mobile_number = ?', [mobNum]
    );
    return rows;
};

export const mobNumCheck2 = async (mobNum) => {
    const [rows] = await pool.query(
        'SELECT * FROM users WHERE mobile_number = ?', [mobNum]
    );
    return rows;
};

export const createNewuser = async (userNum, password) => {
    const [result] = await pool.query(
        'INSERT INTO users (mobile_number, password) VALUES (?, ?)',
        [userNum, password]
    );
    return result.insertId;
};

export const createUserProfile = async (profileData) => {
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
        email_id,
        photo_url // Assuming you store the URL after uploading to Cloudinary
    } = profileData;

    const [result] = await pool.query(
        `INSERT INTO userprofile   
        (user_id, first_name, middle_name, last_name, birthdate, gender, marital_status, caste, 
         current_village_city, current_pin_code, native_village_city, occupation, 
         working_place, hobbies,  email_id, photo_url) 
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
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
        ]
    );

    return result.insertId;
};

export const getEnumValues = async (columnName) => {
    const [rows] = await pool.query(
        `SELECT COLUMN_TYPE 
         FROM INFORMATION_SCHEMA.COLUMNS 
         WHERE TABLE_NAME = 'userprofile' AND COLUMN_NAME = ?`,
        [columnName]
    );
    
    if (rows.length > 0) {
        const enumString = rows[0].COLUMN_TYPE;
        return enumString
            .replace('enum(', '')
            .replace(')', '')
            .split(',')
            .map(value => value.replace(/'/g, ''));
    }

    return [];
};

export const checkUserProfile = async (userId) => {
    const [rows] = await pool.query(
        'SELECT * FROM userprofile WHERE user_id = ?', [userId]
    );
    return rows;
};

export const addMobNum = async (userId, mobilenum) => {
    const [rows] = await pool.query(
        'INSERT INTO user_numbers (user_id, mobile_number) VALUES (?, ?)' , [userId, mobilenum]
    )
    return rows ;
}