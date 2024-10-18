import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

cloudinary.config({
  api_key: 423822978457971,
  cloud_name: "dysmaq1jb",
  api_secret: "l6tDXyR7j0GxJHYTjj-RZV3rLG0",
});
const uploadImage = async (localpath) => {
  try {
    const result = await cloudinary.uploader.upload(localpath);
    fs.unlinkSync(localpath); 
    return result.url;
  } catch (error) {
    console.error("Error uploading image:", error);
    throw error;
  }
};
export default uploadImage