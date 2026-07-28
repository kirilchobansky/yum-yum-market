import express from 'express';
import { Comment } from '../models/Comment';
import { sample_comments } from '../data';
// import commentsService from '../services/commentsService';
import isAuth from '../middlewares/isAuth';
import isAdmin from '../middlewares/isAdmin';
const commentsService = require('../services/commentsService')

const router = express.Router();

router.get('/seed', isAuth, isAdmin, async (req, res) => {
    const commentsCount = await Comment.countDocuments();
    if (commentsCount > 0) {
        res.send('Seed is already done!');
        return;
    }

    await Comment.create(sample_comments);
    res.send('Seed Is Done!');
});

router.get('/all/:foodId', async (req, res) => {
    const comments = await commentsService.getAllCommentsByFood(req.params.foodId);
    res.send(comments);
});

router.get('/latest-three/:foodId', async (req, res) => {
    const comments = await commentsService.getLatestThreeCommentsByFood(req.params.foodId);
    res.send(comments);
});

router.post('/:foodId', isAuth, async (req: any, res) => {
    try {
        const foodId = req.params.foodId;
        const { comment } = req.body;
        const userId = req.user.id;

        const commentData = {
            comment,
            owner: userId,
            food: foodId
        };

        const newComment = await commentsService.postComment(commentData);
        await commentsService.updateUser(userId, newComment._id);
        await commentsService.updateFood(foodId, newComment._id);

        res.send(newComment)
    } catch (error) {
        res.status(500).send('Error with sending comment')
    }
});

router.put('/:commentId', isAuth, async (req: any, res) => {
    const commentId = req.params.commentId;
    const updatedComment = req.body.comment;

    const existingComment = await commentsService.getById(commentId);
    if (!existingComment) {
        res.status(404).send('Comment not found');
        return;
    }
    if (existingComment.owner.toString() !== req.user.id && !req.user.isAdmin) {
        res.status(403).send('Not allowed to edit this comment');
        return;
    }

    await commentsService.editComment(commentId, updatedComment);
    res.status(200).json('You have successfully UPDATED the comment');
});

router.delete('/:commentId', isAuth, async (req: any, res) => {
    const commentId = req.params.commentId;

    const existingComment = await commentsService.getById(commentId);
    if (!existingComment) {
        res.status(404).send('Comment not found');
        return;
    }
    if (existingComment.owner.toString() !== req.user.id && !req.user.isAdmin) {
        res.status(403).send('Not allowed to delete this comment');
        return;
    }

    await commentsService.deleteComment(commentId);
    await commentsService.updateUserDelete(existingComment.owner, commentId);
    await commentsService.updateFoodDelete(existingComment.food, commentId);
    res.status(200).json('You have successfully DELETED the comment')
})

export default router;
