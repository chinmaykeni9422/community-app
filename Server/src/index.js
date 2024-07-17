import app from "./app.js" ;
import dotenv from "dotenv" ;
import { connectDB } from "./db/database.js" ;
import ApiError from "./utils/ApiError.js" ;

dotenv.config({
    path: "./.env",
});

connectDB()
.then(() => {
    app.listen(process.env.PORT, () => {
        console.log(`Server running on port ${process.env.PORT}`);
    }) ;
})
.catch((error) => {
    throw new ApiError(500, "Database connection failed") ;
}) ;