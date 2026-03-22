// Auth Routes
import express from 'express';
import { AuthController } from './auth.controller';
import validateRequest from '../../middlewares/validateRequest';
import { AuthValidation } from './auth.validation';

const router = express.Router();

// POST /api/auth/login
router.post(
    '/login',
    validateRequest(AuthValidation.loginSchema),
    AuthController.login
);

export const authRoutes = router;
