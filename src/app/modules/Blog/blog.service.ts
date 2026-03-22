// Blog Service
import { prisma } from '../../shared/prisma';
import slugify from 'slugify';
import { IBlogInput } from './blog.interface';

// Sob published blog posts
const getAllBlogs = async () => {
    const blogs = await prisma.blog.findMany({
        where: {
            published: true,
        },
        orderBy: {
            createdAt: 'desc',
        },
    });

    return blogs;
};

// Single blog by slug
const getBlogBySlug = async (slug: string) => {
    const blog = await prisma.blog.findUnique({
        where: {
            slug,
            published: true,
        },
    });

    if (!blog) {
        throw new Error('Blog post not found');
    }

    return blog;
};

// Notun blog create (Admin only)
const createBlog = async (data: IBlogInput) => {
    // Auto-generate slug from title
    const slug = data.slug || slugify(data.title, { lower: true, strict: true });

    const blog = await prisma.blog.create({
        data: {
            title: data.title,
            slug,
            excerpt: data.excerpt,
            content: data.content,
            tags: data.tags || [],
            published: data.published ?? false,
        },
    });

    return blog;
};

// Blog update (Admin only)
const updateBlog = async (id: number, data: Partial<IBlogInput>) => {
    // Jodi title change hoy tahole slug o update korbo
    if (data.title && !data.slug) {
        data.slug = slugify(data.title, { lower: true, strict: true });
    }

    const blog = await prisma.blog.update({
        where: { id },
        data: {
            ...(data.title && { title: data.title }),
            ...(data.slug && { slug: data.slug }),
            ...(data.excerpt && { excerpt: data.excerpt }),
            ...(data.content && { content: data.content }),
            ...(data.tags && { tags: data.tags }),
            ...(data.published !== undefined && { published: data.published }),
        },
    });

    return blog;
};

// Blog delete (Admin only)
const deleteBlog = async (id: number) => {
    await prisma.blog.delete({
        where: { id },
    });
};

export const BlogService = {
    getAllBlogs,
    getBlogBySlug,
    createBlog,
    updateBlog,
    deleteBlog,
};
