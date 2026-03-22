// Resume Controller
import { Request, Response } from 'express';
import path from 'path';
import fs from 'fs';
import catchAsync from '../../shared/catchAsync';
import sendResponse from '../../shared/sendResponse';
import { ResumeService } from './resume.service';

// GET /api/resume/download - Resume PDF download
const downloadResume = catchAsync(async (req: Request, res: Response) => {
    const resumePath = path.join(process.cwd(), 'uploads', 'resume.pdf');

    // Check if file exists
    if (!fs.existsSync(resumePath)) {
        throw new Error('Resume file not found');
    }

    // Download count track korbo
    const ipAddress = req.ip || req.socket.remoteAddress;
    const userAgent = req.headers['user-agent'];

    await ResumeService.trackDownload({
        ipAddress: ipAddress || 'unknown',
        userAgent,
    });

    // File download
    res.download(resumePath, 'Emtiaz_Ahmed_Resume.pdf');
});

// GET /api/resume/stats - Download statistics (Protected)
const getDownloadStats = catchAsync(async (req: Request, res: Response) => {
    const result = await ResumeService.getDownloadStats();

    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: 'Download stats retrieved successfully',
        data: result,
    });
});

export const ResumeController = {
    downloadResume,
    getDownloadStats,
};
