// Blog Validation
import { z } from 'zod';

const createBlogSchema = z.object({
    body: z.object({
        title: z.string().min(1, "Title is required"),
        slug: z.string().optional(),
        excerpt: z.string().min(1, "Excerpt is required"),
        content: z.string().min(1, "Content is required"),
        tags: z.array(z.string()).optional(),
        published: z.boolean().optional(),
    })
});

const updateBlogSchema = z.object({
    body: z.object({
        title: z.string().optional(),
        slug: z.string().optional(),
        excerpt: z.string().optional(),
        content: z.string().optional(),
        tags: z.array(z.string()).optional(),
        published: z.boolean().optional(),
    })
});

export const BlogValidation = {
    createBlogSchema,
    updateBlogSchema,
};
