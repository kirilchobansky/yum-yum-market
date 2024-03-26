import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { User, IUser } from '../models/User';

const SECRET = 'ThatIsMyBestSecret';

exports.login = async (email: string, password: string) => {
    const user = await User.findOne({ email });

    if (!user) {
        throw new Error('Cannot find email or password!');
    }

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
        throw new Error('Cannot find email or password!');
    }

    return generateToken(user);
}

exports.findOne = (email: string) => User.findOne({email}); 

exports.register = async (user: any) => {  
    if(await User.findOne({email: user.email})){
        throw new Error('Email is already in use');
    };
    User.create(user);
    return generateToken(user);
}

function generateToken(user: IUser) {

    const payload = {
        id: user.id,
        email: user.email,
        isAdmin: user.isAdmin
    }

    const token = jwt.sign(payload, SECRET, { expiresIn: '2h' })
  
    return {
      id: user.id,
      email: user.email,
      name: user.name,
      address: user.address,
      isAdmin: user.isAdmin,
      token: token
    };
}

