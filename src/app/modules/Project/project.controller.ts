// Project Controller
import { Request, Response } from 'express';
import catchAsync from '../../shared/catchAsync';
import sendResponse from '../../shared/sendResponse';
import { ProjectService } from './project.service';

// GET /api/projects - Sob projects (with filters)
const getAllProjects = catchAsync(async (req: Request, res: Response) => {
    const result = await ProjectService.getAllProjects(req.query);

    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: 'Projects retrieved successfully',
        data: result,
    });
});

// GET /api/projects/:id - Single project
const getProjectById = catchAsync(async (req: Request, res: Response) => {
    const result = await ProjectService.getProjectById(Number(req.params.id));

    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: 'Project retrieved successfully',
        data: result,
    });
});

// POST /api/projects - Create project (Protected)
const createProject = catchAsync(async (req: Request, res: Response) => {
    const result = await ProjectService.createProject(req.body);

    sendResponse(res, {
        statusCode: 201,
        success: true,
        message: 'Project created successfully',
        data: result,
    });
});

// PUT /api/projects/:id - Update project (Protected)
const updateProject = catchAsync(async (req: Request, res: Response) => {
    const result = await ProjectService.updateProject(Number(req.params.id), req.body);

    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: 'Project updated successfully',
        data: result,
    });
});

// DELETE /api/projects/:id - Delete project (Protected)
const deleteProject = catchAsync(async (req: Request, res: Response) => {
    await ProjectService.deleteProject(Number(req.params.id));

    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: 'Project deleted successfully',
        data: null,
    });
});

// POST /api/projects/:id/like - Like project (Public)
const likeProject = catchAsync(async (req: Request, res: Response) => {
    const result = await ProjectService.likeProject(Number(req.params.id));

    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: 'Liked!',
        data: result,
    });
});

// POST /api/projects/upload - Image upload (Protected)
const uploadProjectImages = catchAsync(async (req: Request, res: Response) => {
    if (!req.files || (Array.isArray(req.files) && req.files.length === 0)) {
        throw new Error('No files uploaded');
    }

    const files = req.files as Express.Multer.File[];
    const imageUrls = files.map(file => `/uploads/projects/${file.filename}`);

    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: 'Images uploaded successfully',
        data: { images: imageUrls },
    });
});

export const ProjectController = {
    getAllProjects,
    getProjectById,
    createProject,
    updateProject,
    deleteProject,
    likeProject,
    uploadProjectImages,
};
