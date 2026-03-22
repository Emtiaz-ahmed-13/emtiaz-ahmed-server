// Admin Validation
import { z } from 'zod';

const registerAdminSchema = z.object({
    body: z.object({
        name: z.string().min(1, "Name is required"),
        email: z.string().email("Invalid email format"),
        password: z.string().min(6, "Password must be at least 6 characters"),
    })
});

export const AdminValidation = {
    registerAdminSchema
};
