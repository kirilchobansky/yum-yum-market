import express from 'express';
import { Comment } from '../models/Comment';
import { sample_comments } from '../data';
const commentsService = require('../services/commentsService');

const router = express.Router();

router.get('/seed', async (req, res) => {
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

router.post('/:foodId', async (req, res) => {
    try {
        const foodId = req.params.foodId;
        const { comment, userId } = req.body;

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

router.put('/:commentId', async (req, res) => {
    const commentId = req.params.commentId;
    const updatedComment = req.body.comment; 

    await commentsService.editComment(commentId, updatedComment);
    res.status(200).json('You have successfully UPDATED the comment');
});

router.delete('/:commentId', async (req, res) => {
    const commentId = req.params.commentId;
    const userId = req.query.userId;
    const foodId = req.query.foodId;
    
    await commentsService.deleteComment(commentId);
    await commentsService.updateUserDelete(userId, commentId);
    await commentsService.updateFoodDelete(foodId, commentId);
    res.status(200).json('You have successfully DELETED the comment')
})

export default router;
