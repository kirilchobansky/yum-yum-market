import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { User, IUser } from "../models/User";
import { JWT_SECRET } from "../config";

const login = async (email: string, password: string) => {
  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    throw new Error("Cannot find email or password!");
  }

  const isValid = await bcrypt.compare(password, user.password);
  if (!isValid) {
    throw new Error("Cannot find email or password!");
  }

  return generateToken(user);
};

const findOne = (email: string) => User.findOne({ email });

const register = async (user: any) => {
  const existingUser = await User.findOne({ email: user.email });
  if (existingUser) {
    throw new Error("Email is already in use");
  }

  const createdUser = await User.create(user);
  return generateToken(createdUser);
};

function generateToken(user: IUser) {
  const payload = {
    id: user._id,
    email: user.email,
    isAdmin: user.isAdmin,
  };

  const token = jwt.sign(payload, JWT_SECRET, { expiresIn: "30d" });

  return {
    id: user._id,
    email: user.email,
    name: user.name,
    address: user.address,
    isAdmin: user.isAdmin,
    token: token,
  };
}

const likeFood = (foodId: string, userId: string) =>
  User.findByIdAndUpdate(userId, { $push: { favoriteFoods: foodId } });

const dislikeFood = (foodId: string, userId: string) =>
  User.findByIdAndUpdate(userId, { $pull: { favoriteFoods: foodId } });

const getUserById = (userId: string) => User.findById(userId);

const updateUserDetails = async (
  userId: string,
  name: string,
  email: string,
  address: string,
) => {
  const currentUser = await User.findById(userId);
  if (!currentUser) {
    throw new Error("User not found");
  }

  const trimmedName = name?.trim();
  const trimmedEmail = email?.trim().toLowerCase();
  const trimmedAddress = address?.trim();

  const hasChanges =
    currentUser.name !== trimmedName ||
    currentUser.email !== trimmedEmail ||
    currentUser.address !== trimmedAddress;

  if (!hasChanges) {
    return currentUser;
  }

  return User.findByIdAndUpdate(
    userId,
    { name: trimmedName, email: trimmedEmail, address: trimmedAddress },
    { new: true },
  );
};

const getUserByIdWithFoods = (userId: string) =>
  User.findById(userId).populate("favoriteFoods");

export default {
  login,
  register,
  findOne,
  likeFood,
  dislikeFood,
  getUserById,
  updateUserDetails,
  getUserByIdWithFoods,
};
