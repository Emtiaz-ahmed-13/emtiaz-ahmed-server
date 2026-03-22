import jwt, { Secret } from "jsonwebtoken";

const generateToken = (
    payload: Record<string, unknown>,
    secret: Secret,
    expiresIn: string
): string => {
    if (!secret) {
        throw new Error("JWT secret is missing");
    }

    return jwt.sign(payload, secret, { expiresIn } as any);
};

export const jwtHelper = {
    generateToken,
};
