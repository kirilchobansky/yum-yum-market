import { verify } from "jsonwebtoken";

export default (req: any, res: any, next: any) => {
    const token = req.headers.access_token as string;
    
    if(token) {
        try {
            const decodedUser = verify(token, 'ThatIsMyBestSecret');
            req.user = decodedUser;
            return next();
        } catch (error) {
            return res.status(401).send(); 
        }
    } else {
        return next();
    }
}