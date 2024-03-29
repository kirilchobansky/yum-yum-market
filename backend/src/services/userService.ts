import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { User, IUser } from '../models/User';

const SECRET = 'ThatIsMyBestSecret';

const login = async (email: string, password: string) => {
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

const findOne = (email: string) => User.findOne({email}); 

const register = async (user: any) => {  
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

    const token = jwt.sign(payload, SECRET, { expiresIn: '30d' })
  
    return {
      id: user._id,
      email: user.email,
      name: user.name,
      address: user.address,
      isAdmin: user.isAdmin,
      token: token
    };
}

const likeFood = (foodId: string, userId: string) => User.findByIdAndUpdate( userId, { $push: { favoriteFoods: foodId }});

const dislikeFood = (foodId: string, userId: string) => User.findByIdAndUpdate( userId, { $pull: { favoriteFoods: foodId }});

const getUserById = (userId: string) => User.findById(userId);

export default {
    login,
    register,
    findOne,
    likeFood,
    dislikeFood,
    getUserById
}