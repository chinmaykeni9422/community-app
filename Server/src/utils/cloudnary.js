import dotenv from "dotenv";
import {v2 as cloudinary} from "cloudinary" ;
import fs from "fs" ;

dotenv.config({
    path: "./.env",
});

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_CLOUD_KEY,
  api_secret: process.env.CLOUDINARY_CLOUD_SECRET,
});

const uploadOnCloudinary = async (localFilePath) => {
    try {
        console.log(`localPath -> ${localFilePath}`)
        if(!localFilePath) return null ;

        //upload the file on cloudinary
        const response = await cloudinary.uploader.upload(localFilePath) ;
        // file has been uploaded succesfully
        console.log("file is uploaded on cloudinary", response.url) ;
        fs.unlinkSync(localFilePath);
        return response ;
    } catch (error) {
        fs.unlinkSync(localFilePath) // remove the locally save temporary file as the uploaded operation failed
        return null ;
    }
}

export {uploadOnCloudinary} ;