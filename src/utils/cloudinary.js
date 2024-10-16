import {v2 as cloudinary} from 'cloudinary'
import fs from 'fs'  //file system

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadOnCloudinary = async(localFilePath)=>{
  try{
     if(!localFilePath) return null
     //UPLOAD THE FILE ON CLOUDINARY
     const response= await cloudinary.uploader.upload(localFilePath,{
        resource_type:"auto"
     })
     //FILE HAS BEEN UPLOADED SUCCESSSFULLY
    //  console.log("File is uploaded on cloudinary.",
    //  response.url);
    fs.unlinkSync(localFilePath)
     return response;
  }catch(error){
    fs.unlinkSync(localFilePath)  //REMOVE THE LOCALLY SAVED TEMPORARY FILE AS THE UPLOAD OPERATION GOT FAILED.
    return null
  }
}

// cloudinary.uploader.upload(
//   "https://upload.wikimedia.org/wikipedia/commons/a/ae/Olympic_flag.jpg",
//   { public_id: "olympic_flag" },
//   function (error, result) {
//     console.log(result);
//   }
// );

export {uploadOnCloudinary}
