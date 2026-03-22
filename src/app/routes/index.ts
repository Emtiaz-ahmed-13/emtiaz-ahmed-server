// Main Routes
import express from 'express';
import { contactRoutes } from '../modules/Contact/contact.routes';
import { blogRoutes } from '../modules/Blog/blog.routes';
import { projectRoutes } from '../modules/Project/project.routes';
import { resumeRoutes } from '../modules/Resume/resume.routes';
import { authRoutes } from '../modules/Auth/auth.routes';
import { adminRoutes } from '../modules/Admin/admin.routes';

const router = express.Router();

const moduleRoutes = [
    {
        path: '/contact',
        route: contactRoutes,
    },
    {
        path: '/blog',
        route: blogRoutes,
    },
    {
        path: '/projects',
        route: projectRoutes,
    },
    {
        path: '/auth',
        route: authRoutes,
    },
    {
        path: '/resume',
        route: resumeRoutes,
    },
    {
        path: '/admin',
        route: adminRoutes,
    },
];

// All routes register
moduleRoutes.forEach(route => router.use(route.path, route.route));

export default router;
