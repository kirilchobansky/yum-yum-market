import express from 'express';
const userService = require('../services/userService');
const router = express.Router();

router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
      const user = await userService.login(email, password);      
      res.send(user);
    } catch (error: any) {
      res.status(400).send(error.message);
    }
    
});

router.post('/register', async (req, res) => {  
    const { name, email, password, address } = req.body;

    const newUser = {
        id: '',
        name,
        email: email.toLowerCase(),
        password,
        address,
        isAdmin: false
    }
    
    try {
        const user = await userService.register(newUser);
        
        res.send(user); 
    } catch (error: any) {
        res.status(400).send(error.message);
    }
});

router.post('/like/:foodId', async (req, res) => {
    const foodId = req.params.foodId;
    const { userId } = req.body;

    await userService.likeFood(foodId, userId);
    res.status(200).json('Successfully liked');
})

router.post('/dislike/:foodId', async (req, res) => {
    const foodId = req.params.foodId;
    const { userId } = req.body;

    await userService.dislikeFood(foodId, userId);
    res.status(200).json('Successfully disliked');
});

router.get('/:userId', async (req, res) => {
    const user = await userService.getUserById(req.params.userId);
    res.send(user);
})

export default router;
