export default (req: any, res: any, next: any) => {
    if (!req.user?.isAdmin) {
        return res.status(403).send('Admin access required');
    }
    return next();
}
