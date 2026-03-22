// Admin Controller
import { Request, Response } from 'express';
import catchAsync from '../../shared/catchAsync';
import sendResponse from '../../shared/sendResponse';
import { AdminService } from './admin.service';

// Register first admin (one-time setup)
const registerAdmin = catchAsync(async (req: Request, res: Response) => {
    const result = await AdminService.registerAdmin(req.body);

    sendResponse(res, {
        statusCode: 201,
        success: true,
        message: 'Admin registered successfully',
        data: result,
    });
});

export const AdminController = {
    registerAdmin,
};
