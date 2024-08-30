import {pool} from "../db/database.js" ;

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
        first_name,
        middle_name,
        last_name,
        birthdate,
        gender,
        marital_status,
        caste,
        current_village_city,
        current_pin_code,
        native_village_city,
        occupation,
        working_place,
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
            first_name,
            middle_name,
            last_name,
            birthdate,
            gender,
            marital_status,
            caste,
            current_village_city,
            current_pin_code,
            native_village_city,
            occupation,
            working_place,
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

export const getUserNumbers = async (userId) => {
    const [rows] = await pool.query(
        'SELECT * FROM user_numbers WHERE user_id = ?', [userId]
    );
    return rows;
};

export const UpdateUserProfile = async (profileData) => {

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
    } = profileData

    const [rows] = await pool.query(
        `UPDATE userprofile 
         SET first_name = ?, 
             middle_name = ?, 
             last_name = ?, 
             marital_status = ?, 
             caste = ?, 
             occupation = ?, 
             birthdate = ?, 
             gender = ?, 
             current_pin_code = ?, 
             working_place = ?, 
             native_village_city = ?, 
             current_village_city = ?, 
             email_id = ?,
             hobbies = ?
         WHERE user_id = ?`,
        [
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
            hobbies,
            user_id
        ]
    );

    return rows;
};

export const getConfiguration = async () => {
    const [rows] = await pool.query('SELECT `value` FROM configuration WHERE `key` = "showAdPopup"');
    return rows.length > 0 ? rows[0].value : null;
};