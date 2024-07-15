import app from "./app.js" ;
import dotenv from "dotenv" ;
import { conectDB } from "./db/database.js" ;
import ApiError from "./utils/ApiError.js" ;

dotenv.config({
    path: "./.env",
});

conectDB()
.then(() => {
    app.listen(process.env.PORT || 8000, () => {
        console.log(`Server running on port ${process.env.PORT || 8000}`);
    }) ;
})
.catch((error) => {
    throw new ApiError(500, "Database connection failed") ;
}) ;