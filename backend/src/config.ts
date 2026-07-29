import dotenv from 'dotenv';

dotenv.config();

function required(name: string): string {
    const value = process.env[name];
    if (!value) {
        throw new Error(`Missing required environment variable: ${name}`);
    }
    return value;
}

export const JWT_SECRET = required('JWT_SECRET');
export const MONGO_URL = process.env.MONGO_URI || process.env.MONGO_URL || 'mongodb://localhost:27017/yum-yum-market';
export const PORT = Number(process.env.PORT) || 3000;
export const CORS_ORIGIN = process.env.CORS_ORIGIN || 'http://localhost:4200';
