import { Comment } from '../models/Comment';
import { Food } from '../models/Food';
import { User } from '../models/User';

exports.getAllCommentsByFood = (foodId: string) => Comment.find({food: foodId}).populate(['owner']).sort({ createdAt: -1});

exports.getLatestThreeCommentsByFood = (foodId: string) => {
    return Comment
        .find({food: foodId}).populate(['owner'])
        .sort({ createdAt: -1 }) 
        .limit(3);
}

exports.postComment = (commentData: Comment) => Comment.create(commentData);

exports.updateUser = (userId: string, commentId: string) => User.findByIdAndUpdate(userId, { $push: { comments: commentId }});

exports.updateFood = (foodId: string, commentId: string) => Food.findByIdAndUpdate(foodId, { $push: { comments: commentId }});

exports.deleteComment = (commentId: string) => Comment.findByIdAndDelete(commentId);

exports.editComment = (commentId: string, commentData: string) => Comment.findByIdAndUpdate(commentId, { comment: commentData}, { new: true });

exports.updateUserDelete = (userId: string, commentId: string) => User.findByIdAndUpdate(userId, { $pull: { comments: commentId } });

exports.updateFoodDelete = (foodId: string, commentId: string) => Food.findByIdAndUpdate(foodId, { $pull: { comments: commentId } });

// export default {
//     getAllCommentsByFood,
//     getLatestThreeCommentsByFood,
//     postComment,
//     updateFood,
//     updateUser,
//     updateFoodDelete,
//     updateUserDelete,
//     editComment,
//     deleteComment
// }
