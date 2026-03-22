// Contact Service
import { prisma } from '../../shared/prisma';
import { sendEmail } from '../../utils/email.util';
import config from '../../../config';
import { IContactInput } from './contact.interface';

// Contact message save + email send
const createContact = async (data: IContactInput) => {
    // Database e save korbo
    const contact = await prisma.contact.create({
        data: {
            name: data.name,
            email: data.email,
            subject: data.subject,
            message: data.message,
            ipAddress: data.ipAddress,
        },
        select: {
            id: true,
            name: true,
            email: true,
            createdAt: true,
        }
    });

    // Admin ke email notification pathabo
    try {
        await sendEmail({
            to: config.admin.email,
            subject: `New Contact Form: ${data.subject}`,
            html: `
                <h2>New Contact Form Submission</h2>
                <p><strong>Name:</strong> ${data.name}</p>
                <p><strong>Email:</strong> ${data.email}</p>
                <p><strong>Subject:</strong> ${data.subject}</p>
                <p><strong>Message:</strong></p>
                <p>${data.message}</p>
                <hr>
                <p><small>IP Address: ${data.ipAddress || 'N/A'}</small></p>
            `,
        });
    } catch (emailError) {
        console.error('Email send failed:', emailError);
        // Email fail hole o contact save hobe
    }

    return contact;
};

export const ContactService = {
    createContact,
};
