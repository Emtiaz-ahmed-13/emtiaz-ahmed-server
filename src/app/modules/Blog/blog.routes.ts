// Blog Routes
import express from 'express';
import { BlogController } from './blog.controller';
import { authMiddleware } from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { BlogValidation } from './blog.validation';

const router = express.Router();

// Public routes
router.get('/', BlogController.getAllBlogs);
router.get('/:slug', BlogController.getBlogBySlug);

// Protected routes (Admin only)
router.post(
    '/',
    authMiddleware,
    validateRequest(BlogValidation.createBlogSchema),
    BlogController.createBlog
);

router.put(
    '/:id',
    authMiddleware,
    validateRequest(BlogValidation.updateBlogSchema),
    BlogController.updateBlog
);

router.delete('/:id', authMiddleware, BlogController.deleteBlog);

export const blogRoutes = router;
