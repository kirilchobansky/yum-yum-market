import {Schema, model} from 'mongoose';
import bcrypt from 'bcrypt';

export interface IUser {
    id: string;
    email: string;
    password: string
    name: string;
    address: string;
    isAdmin: boolean;
};

const userSchema = new Schema<IUser>(
    {
        name: {type: String, required: true},
        email: {type: String, required: true, unique: true},
        password: {type: String, required: true},
        address: {type: String, required: true},
        isAdmin: {type: Boolean, required: true},
    },
    {
        toJSON: { virtuals: true },
        toObject: { virtuals: true },
        timestamps: true
    }
);

userSchema.pre('save', async function () {
    const hash = await bcrypt.hash(this.password, 12);
    this.password = hash;
});

export const User = model<IUser>('user', userSchema);