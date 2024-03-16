import express from 'express';
import { sample_users } from '../data';
import expressAsyncHandler from 'express-async-handler';
import { User } from '../models/User';
const authService = require('../services/authService');
const router = express.Router();

router.get('/seed', expressAsyncHandler(
    async (req, res) => {
    const foodsCount = await User.countDocuments();
    if(foodsCount > 0){
        res.send("Seed is already done!");
        return;
    }

    await User.create(sample_users);
    res.send("Seed is done!");
}));

router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    const user = await authService.findOne(email);

    if(!user){
        res.status(400).send('User email or password is not valid!');
        return;
    }
    res.send(authService.generateToken(user));
})

export default router;