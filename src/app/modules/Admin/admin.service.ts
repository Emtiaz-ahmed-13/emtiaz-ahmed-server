// Admin Service
import bcrypt from 'bcryptjs';
import { prisma } from '../../shared/prisma';
import { IAdminRegister } from './admin.interface';

// Admin registration (one-time setup)
const registerAdmin = async (data: IAdminRegister) => {
    // Check if admin already exists
    const existingAdmin = await prisma.admin.findUnique({
        where: { email: data.email }
    });

    if (existingAdmin) {
        throw new Error('Admin with this email already exists');
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(data.password, 10);

    // Create User and Admin in transaction
    const result = await prisma.$transaction(async (tx) => {
        // Create User first
        const user = await tx.user.create({
            data: {
                name: data.name,
                email: data.email,
                password: hashedPassword,
                role: 'ADMIN',
            }
        });

        // Create Admin
        const admin = await tx.admin.create({
            data: {
                name: data.name,
                email: data.email,
                password: hashedPassword,
                role: 'ADMIN',
            },
        });

        return admin;
    });

    return {
        id: result.id,
        name: result.name,
        email: result.email,
        role: result.role,
        createdAt: result.createdAt,
    };
};

// Get admin by email (for login)
const getAdminByEmail = async (email: string) => {
    const admin = await prisma.admin.findUnique({
        where: { email }
    });
    return admin;
};

export const AdminService = {
    registerAdmin,
    getAdminByEmail,
};
