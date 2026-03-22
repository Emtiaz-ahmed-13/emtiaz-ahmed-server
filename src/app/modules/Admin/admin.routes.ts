// Admin Routes
import express from 'express';
import { AdminController } from './admin.controller';
import validateRequest from '../../middlewares/validateRequest';
import { AdminValidation } from './admin.validation';

const router = express.Router();

// POST /api/admin/register - Register first admin (one-time)
router.post(
    '/register',
    validateRequest(AdminValidation.registerAdminSchema),
    AdminController.registerAdmin
);

export const adminRoutes = router;
