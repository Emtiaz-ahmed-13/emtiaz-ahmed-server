// File Upload Middleware (Multer) - Serverless Compatible
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import os from 'os';

// Use /tmp directory for serverless environments (Vercel, AWS Lambda, etc.)
// This is the only writable directory in serverless
const uploadDir = process.env.VERCEL ? os.tmpdir() : path.join(process.cwd(), 'uploads', 'projects');

// Only create directory if not in serverless environment
if (!process.env.VERCEL && !fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

// Storage configuration
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
        // Unique filename: timestamp-randomnumber-originalname
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, uniqueSuffix + path.extname(file.originalname));
    },
});

// File filter - sudhu image allow korbo
const fileFilter = (req: any, file: Express.Multer.File, cb: multer.FileFilterCallback) => {
    const allowedTypes = /jpeg|jpg|png|webp/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);

    if (extname && mimetype) {
        cb(null, true);
    } else {
        cb(new Error('Only images are allowed (jpg, jpeg, png, webp)'));
    }
};

// Multer upload instance
export const upload = multer({
    storage: storage,
    limits: {
        fileSize: 5 * 1024 * 1024, // 5MB max file size
    },
    fileFilter: fileFilter,
});
