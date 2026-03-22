// Project Routes
import express from 'express';
import { ProjectController } from './project.controller';

import validateRequest from '../../middlewares/validateRequest';
import { ProjectValidation } from './project.validation';
import { authMiddleware } from '../../middlewares/auth';
import { upload } from '../../middlewares/upload';


const router = express.Router();

// Image upload route (Protected, must be before /:id routes)
router.post(
    '/upload',
    authMiddleware,
    upload.array('images', 10),
    ProjectController.uploadProjectImages
);

// Public routes
router.get('/', ProjectController.getAllProjects);
router.get('/:id', ProjectController.getProjectById);
router.post('/:id/like', ProjectController.likeProject);

// Protected routes (Admin only)
router.post(
    '/',
    authMiddleware,
    validateRequest(ProjectValidation.createProjectSchema),
    ProjectController.createProject
);

router.put(
    '/:id',
    authMiddleware,
    validateRequest(ProjectValidation.updateProjectSchema),
    ProjectController.updateProject
);

router.delete('/:id', authMiddleware, ProjectController.deleteProject);

export const projectRoutes = router;
