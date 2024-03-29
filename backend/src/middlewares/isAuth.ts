import { verify, VerifyErrors } from 'jsonwebtoken';

// export default (req: any, res: any, next: any) => {
//     const token = req.headers.access_token as string;

//     if (!token) {
//         return res.status(401).send("Access token is missing");
//     }

//     try {
//         const decodedUser = verify(token, 'ThatIsMyBestSecret');
//         req.user = decodedUser;
//         next();
//     } catch (error) {
//         console.error("Error verifying token:", error);
//         return res.status(401).send("Invalid access token");
//     }
// };



export default (req: any, res: any, next: any) => {
    const token = req.headers.access_token as string;
    if(!token) return res.status(401).send();

    try {
        const decodedUser = verify(token, 'ThatIsMyBestSecret');
        req.user = decodedUser;
    } catch (error) {
        console.error("Error verifying token:", error);
        res.status(401).send();
    }

    return next();
}