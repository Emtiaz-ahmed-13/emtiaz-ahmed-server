// Contact Controller
import { Request, Response } from 'express';
import catchAsync from '../../shared/catchAsync';
import sendResponse from '../../shared/sendResponse';
import { ContactService } from './contact.service';

// Contact form submit
const submitContact = catchAsync(async (req: Request, res: Response) => {
    // IP address nibo
    const ipAddress = req.ip || req.socket.remoteAddress;

    const result = await ContactService.createContact({
        ...req.body,
        ipAddress,
    });

    sendResponse(res, {
        statusCode: 201,
        success: true,
        message: 'Message sent successfully! We will get back to you soon.',
        data: result,
    });
});

export const ContactController = {
    submitContact,
};
