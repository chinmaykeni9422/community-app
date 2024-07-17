import mysql from "mysql2/promise" ;
import ApiError from "../utils/ApiError.js" ;
import dotenv from "dotenv" ;

dotenv.config({
    path: "./.env"
}) ;

export const pool = mysql.createPool({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,

}) ;

export const connectDB = async () => {
    try {
        const connection = await pool.getConnection() ;
        console.log(`mySQL database Connected !!`) ;
        connection.release() ; // Release the connection back to the pool
    } catch (error) {
        throw new ApiError(501, "mySQL database is not connected !!") ;
    }
} ;