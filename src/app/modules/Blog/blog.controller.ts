// Blog Controller
import { Request, Response } from 'express';
import catchAsync from '../../shared/catchAsync';
import sendResponse from '../../shared/sendResponse';
import { BlogService } from './blog.service';

// GET /api/blog - Sob published blogs
const getAllBlogs = catchAsync(async (req: Request, res: Response) => {
    const result = await BlogService.getAllBlogs();

    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: 'Blogs retrieved successfully',
        data: result,
    });
});

// GET /api/blog/:slug - Single blog
const getBlogBySlug = catchAsync(async (req: Request, res: Response) => {
    const result = await BlogService.getBlogBySlug(req.params.slug);

    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: 'Blog retrieved successfully',
        data: result,
    });
});

// POST /api/blog - Create blog (Protected)
const createBlog = catchAsync(async (req: Request, res: Response) => {
    const result = await BlogService.createBlog(req.body);

    sendResponse(res, {
        statusCode: 201,
        success: true,
        message: 'Blog created successfully',
        data: result,
    });
});

// PUT /api/blog/:id - Update blog (Protected)
const updateBlog = catchAsync(async (req: Request, res: Response) => {
    const result = await BlogService.updateBlog(Number(req.params.id), req.body);

    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: 'Blog updated successfully',
        data: result,
    });
});

// DELETE /api/blog/:id - Delete blog (Protected)
const deleteBlog = catchAsync(async (req: Request, res: Response) => {
    await BlogService.deleteBlog(Number(req.params.id));

    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: 'Blog deleted successfully',
        data: null,
    });
});

export const BlogController = {
    getAllBlogs,
    getBlogBySlug,
    createBlog,
    updateBlog,
    deleteBlog,
};
