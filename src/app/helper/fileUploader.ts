import { v2 as cloudinary } from "cloudinary";
import multer from "multer";
import path from "path";
import fs from "fs";
import os from "os";
import config from "../../config";

// Use /tmp for serverless, uploads for local
const uploadDir = process.env.VERCEL ? os.tmpdir() : path.join(process.cwd(), "uploads");

// Only create directory if not in serverless and doesn't exist
if (!process.env.VERCEL && !fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, uploadDir);
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, file.fieldname + '-' + uniqueSuffix);
    }
});

const upload = multer({ storage: storage });

cloudinary.config({
    cloud_name: config.cloudinary.cloud_name,
    api_key: config.cloudinary.api_key,
    api_secret: config.cloudinary.api_secret,
});

const uploadToCloudinary = async (file: Express.Multer.File) => {
    return new Promise((resolve, reject) => {
        cloudinary.uploader.upload(file.path, (err: any, result: any) => {
            // Clean up temp file after upload (important for serverless)
            fs.unlink(file.path, (unlinkErr) => {
                if (unlinkErr) console.error('Error deleting temp file:', unlinkErr);
            });

            if (err) {
                reject(err);
            } else {
                resolve(result);
            }
        });
    });
};

export const fileUploader = {
    upload,
    uploadToCloudinary
};
