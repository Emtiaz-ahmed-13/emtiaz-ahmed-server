// JWT Authentication Middleware
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import config from '../../config';

// Custom Request type JWT payload er jonno
export interface AuthRequest extends Request {
    user?: {
        email: string;
        role: string;
    };
}

export const authMiddleware = (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
        // Token Authorization header theke nibo
        const token = req.headers.authorization?.split(' ')[1]; // "Bearer TOKEN"

        if (!token) {
            return res.status(401).json({
                success: false,
                message: 'Access denied. No token provided.',
            });
        }

        // Token verify korbo
        const decoded = jwt.verify(token, config.jwt.secret) as { email: string; role: string };
        
        // Request object-e user info add korbo
        req.user = decoded;
        
        next();
    } catch (error) {
        return res.status(401).json({
            success: false,
            message: 'Invalid or expired token',
        });
    }
};
