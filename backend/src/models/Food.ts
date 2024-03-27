import { Schema, model, Types } from 'mongoose';

interface Food {
    id: string;
    name: string;
    price: number;
    tags?: string[];
    stars: number;
    imageUrl: string;
    origins: string[];
    cookTime: string;
    comments: Types.ObjectId[]; 
}

const FoodSchema = new Schema<Food>(
    {
        name: {type: String, required: true},
        price: {type: Number, required: true},
        tags: {type: [String], required: true},
        stars: {type: Number, required: true},
        imageUrl: {type: String, required: true},
        origins: {type: [String], required: true},
        cookTime: {type: String, required: true},
        comments: [{ type: Schema.Types.ObjectId, ref: 'Comment' }] 
    },
    {
        toJSON: { virtuals: true },
        toObject: { virtuals: true },
        timestamps: true
    }
);

export const Food = model<Food>('Food', FoodSchema);