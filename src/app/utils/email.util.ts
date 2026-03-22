// Email Utility (Nodemailer)
import nodemailer from 'nodemailer';
import config from '../../config';

interface EmailOptions {
    to: string;
    subject: string;
    html: string;
}

// Email transporter setup
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: config.email.user,
        pass: config.email.pass, // Gmail App Password
    },
});

// Email send function
export const sendEmail = async (options: EmailOptions) => {
    const mailOptions = {
        from: `"Portfolio Contact" <${config.email.user}>`,
        to: options.to,
        subject: options.subject,
        html: options.html,
    };

    await transporter.sendMail(mailOptions);
};
