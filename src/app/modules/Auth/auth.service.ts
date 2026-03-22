// Auth Service
import config from '../../../config';
import { ILoginInput } from './auth.interface';
import { AdminService } from '../Admin/admin.service';
import { jwtHelper } from '../../helper/jwtHelper';
import bcrypt from 'bcryptjs';

const login = async (data: ILoginInput) => {
    const { email, password } = data;

    // First check database for admin
    const admin = await AdminService.getAdminByEmail(email);

    if (admin) {
        // Database admin login
        const isPasswordValid = await bcrypt.compare(password, admin.password);
        
        if (!isPasswordValid) {
            throw new Error('Invalid email or password');
        }

        const token = jwtHelper.generateToken(
            { email: admin.email, role: admin.role },
            config.jwt.secret,
            config.jwt.expires_in
        );

        return {
            token,
            user: {
                id: admin.id,
                name: admin.name,
                email: admin.email,
                role: admin.role,
            },
        };
    }

    // Fallback to .env credentials (for initial setup)
    if (email === config.admin.email && password === config.admin.password) {
        const token = jwtHelper.generateToken(
            { email, role: 'admin' },
            config.jwt.secret,
            config.jwt.expires_in
        );

        return {
            token,
            user: {
                email,
                role: 'admin',
            },
        };
    }

    throw new Error('Invalid email or password');
};

export const AuthService = {
    login,
};
