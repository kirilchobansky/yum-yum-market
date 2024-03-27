import {Schema, model, Types} from 'mongoose';
import bcrypt from 'bcrypt';

export interface IUser {
    _id: string;
    email: string;
    password: string
    name: string;
    address: string;
    isAdmin: boolean;
    favoriteFoods: Types.ObjectId[];
    comments: Types.ObjectId[];
};

const userSchema = new Schema<IUser>(
    {
        name: {type: String, required: true},
        email: {type: String, required: true, unique: true},
        password: {type: String, required: true},
        address: {type: String, required: true},
        isAdmin: {type: Boolean, required: true},
        favoriteFoods: [{ type: Schema.Types.ObjectId, ref: 'Food' }],
        comments: [{ type: Schema.Types.ObjectId, ref: 'Comment' }] 
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

export const User = model<IUser>('User', userSchema);