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
