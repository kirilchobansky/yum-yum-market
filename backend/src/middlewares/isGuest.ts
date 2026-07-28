import { verify } from "jsonwebtoken";
import { JWT_SECRET } from '../config';

export default (req: any, res: any, next: any) => {
    const token = req.headers.access_token as string;

    if (!token) {
        return next();
    }

    try {
        verify(token, JWT_SECRET);
        return res.status(403).send('Already logged in');
    } catch (error) {
        return next();
    }
}