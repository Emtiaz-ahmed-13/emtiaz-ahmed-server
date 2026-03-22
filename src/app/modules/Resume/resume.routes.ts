// Resume Routes
import express from 'express';
import { ResumeController } from './resume.controller';
import { authMiddleware } from '../../middlewares/auth';


const router = express.Router();

// Public route
router.get('/download', ResumeController.downloadResume);

// Protected route (Admin only)
router.get('/stats', authMiddleware, ResumeController.getDownloadStats);

export const resumeRoutes = router;
