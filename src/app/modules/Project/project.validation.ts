// Project Validation
import { z } from 'zod';

const createProjectSchema = z.object({
    body: z.object({
        title: z.string().min(1, "Title is required"),
        slug: z.string().optional(),
        description: z.string().min(1, "Description is required"),
        longDesc: z.string().min(1, "Long description is required"),
        thumbnail: z.string().min(1, "Thumbnail is required"),
        images: z.array(z.string()).optional(),
        techStack: z.array(z.string()).min(1, "At least one tech stack is required"),
        tags: z.array(z.string()).optional(),
        liveUrl: z.string().optional(),
        githubUrl: z.string().optional(),
        featured: z.boolean().optional(),
        order: z.number().optional(),
        status: z.enum(['COMPLETED', 'IN_PROGRESS', 'ARCHIVED']).optional(),
    })
});

const updateProjectSchema = z.object({
    body: z.object({
        title: z.string().optional(),
        slug: z.string().optional(),
        description: z.string().optional(),
        longDesc: z.string().optional(),
        thumbnail: z.string().optional(),
        images: z.array(z.string()).optional(),
        techStack: z.array(z.string()).optional(),
        tags: z.array(z.string()).optional(),
        liveUrl: z.string().optional(),
        githubUrl: z.string().optional(),
        featured: z.boolean().optional(),
        order: z.number().optional(),
        status: z.enum(['COMPLETED', 'IN_PROGRESS', 'ARCHIVED']).optional(),
    })
});

export const ProjectValidation = {
    createProjectSchema,
    updateProjectSchema,
};
