import jwt from 'jsonwebtoken';

export const generateToken = (user: any) => {
    const token = jwt.sign({
        email: user.email,
        isAdmin: user.isAdmin
    }, 'ThatIsMyBestSecret', { expiresIn: '2h'})

    user.token = token;
    return user;
}
