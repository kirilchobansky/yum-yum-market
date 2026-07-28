import { verify } from 'jsonwebtoken';
import { JWT_SECRET } from '../config';

export default (req: any, res: any, next: any) => {
    const token = req.headers.access_token as string;
    if(!token) return res.status(401).send();

    try {
        const decodedUser = verify(token, JWT_SECRET);
        req.user = decodedUser;
    } catch (error) {
        console.error("Error verifying token:", error);
        return res.status(401).send();
    }

    return next();
}