"use server";

import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function uploadLogoToCloudinary(base64Image) {
  try {
    const result = await cloudinary.uploader.upload(base64Image, {
      folder: 'crystalseer/logos',
      quality: 'auto',
      fetch_format: 'auto',
    });
    return { success: true, url: result.secure_url };
  } catch (error) {
    console.error('Logo upload error:', error);
    return { success: false, error: error.message || 'Unknown error' };
  }
}
