// Simple Rate Limiting Middleware
import { Request, Response, NextFunction } from 'express';

// In-memory store for rate limiting
const requestCounts = new Map<string, { count: number; resetTime: number }>();

// Contact form rate limiter (5 min e 3 request)
export const contactRateLimiter = (req: Request, res: Response, next: NextFunction) => {
    const ip = req.ip || req.socket.remoteAddress || 'unknown';
    const now = Date.now();
    const windowMs = 5 * 60 * 1000; // 5 minutes
    const maxRequests = 3;

    const record = requestCounts.get(ip);

    if (!record || now > record.resetTime) {
        // New window
        requestCounts.set(ip, {
            count: 1,
            resetTime: now + windowMs,
        });
        return next();
    }

    if (record.count >= maxRequests) {
        return res.status(429).json({
            success: false,
            message: 'Too many requests from this IP. Please try again after 5 minutes.',
        });
    }

    record.count++;
    next();
};

// General API rate limiter (15 min e 100 request)
export const generalRateLimiter = (req: Request, res: Response, next: NextFunction) => {
    const ip = req.ip || req.socket.remoteAddress || 'unknown';
    const now = Date.now();
    const windowMs = 15 * 60 * 1000; // 15 minutes
    const maxRequests = 100;

    const key = `general_${ip}`;
    const record = requestCounts.get(key);

    if (!record || now > record.resetTime) {
        requestCounts.set(key, {
            count: 1,
            resetTime: now + windowMs,
        });
        return next();
    }

    if (record.count >= maxRequests) {
        return res.status(429).json({
            success: false,
            message: 'Too many requests. Please try again later.',
        });
    }

    record.count++;
    next();
};

// Cleanup old entries every 30 minutes
setInterval(() => {
    const now = Date.now();
    for (const [key, record] of requestCounts.entries()) {
        if (now > record.resetTime) {
            requestCounts.delete(key);
        }
    }
}, 30 * 60 * 1000);
