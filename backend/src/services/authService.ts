import jwt from 'jsonwebtoken';
import { User } from '../models/User';

exports.generateToken = (user: any) => {
    const token = jwt.sign({
        email: user.email,
        isAdmin: user.isAdmin
    }, 'ThatIsMyBestSecret', { expiresIn: '2h'})

    user.token = token;
    return user;
}

exports.findOne = (email: string) => User.findOne({email});
