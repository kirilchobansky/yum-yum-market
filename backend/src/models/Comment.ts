import { Schema, model, Types } from 'mongoose';

interface Comment {
    id: string;
    comment: string;
    owner: Types.ObjectId;
    food: Types.ObjectId;
};

const CommentSchema = new Schema<Comment>(
    {
        comment: {type: String, required: true},
        owner: { type: Schema.Types.ObjectId, ref: 'User' },
        food: { type: Schema.Types.ObjectId, ref: 'Food' } 
    },
    {
        toJSON: { virtuals: true },
        toObject: { virtuals: true },
        timestamps: true
    }
);

export const Comment = model<Comment>('Comment', CommentSchema);