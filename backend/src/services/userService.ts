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
     const existingUser = await User.findOne({ email: user.email });
    if (existingUser) {
        throw new Error('Email is already in use');
    }

    const createdUser = await User.create(user);
    return generateToken(createdUser);
}

function generateToken(user: IUser) {

    const payload = {
        id: user._id,
        email: user.email,
        isAdmin: user.isAdmin
    }

    const token = jwt.sign(payload, SECRET, { expiresIn: '2h' })
  
    return {
      id: user._id,
      email: user.email,
      name: user.name,
      address: user.address,
      isAdmin: user.isAdmin,
      token: token
    };
}

exports.likeFood = (foodId: string, userId: string) => User.findByIdAndUpdate( userId, { $push: { favoriteFoods: foodId }});

exports.dislikeFood = (foodId: string, userId: string) => User.findByIdAndUpdate( userId, { $pull: { favoriteFoods: foodId }});

exports.getUserById = (userId: string) => User.findById(userId);

