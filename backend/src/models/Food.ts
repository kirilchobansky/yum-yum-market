import {Schema, model} from 'mongoose';

interface Food {
    id: string;
    name: string;
    price: number;
    tags?: string[];
    favorite: boolean;
    stars: number;
    imageUrl: string;
    origins: string[];
    cookTime: string;
};

const FoodSchema = new Schema<Food>(
    {
        name: {type: String, required: true},
        price: {type: Number, required: true},
        tags: {type: [String], required: true},
        favorite: {type: Boolean, required: true},
        stars: {type: Number, required: true},
        imageUrl: {type: String, required: true},
        origins: {type: [String], required: true},
        cookTime: {type: String, required: true},
    },
    {
        toJSON: { virtuals: true },
        toObject: { virtuals: true },
        timestamps: true
    }
);

export const Food = model<Food>('food', FoodSchema); 