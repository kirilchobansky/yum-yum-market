import express from 'express';
import userService from '../services/userService'
import isAuth from '../middlewares/isAuth';
import isGuest from '../middlewares/isGuest';
const router = express.Router();

router.post('/login', isGuest, async (req, res) => {
    const { email, password } = req.body;
    try {
      const user = await userService.login(email, password);      
      res.send(user);
    } catch (error: any) {
      res.status(400).send(error.message);
    }
    
});

router.post('/register', isGuest, async (req, res) => {  
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

router.post('/like/:foodId', isAuth, async (req: any, res) => {
    const foodId = req.params.foodId;

    await userService.likeFood(foodId, req.user.id);
    res.status(200).json('Successfully liked');
})

router.post('/dislike/:foodId', isAuth, async (req: any, res) => {
    const foodId = req.params.foodId;

    await userService.dislikeFood(foodId, req.user.id);
    res.status(200).json('Successfully disliked');
});

router.get('/:userId', isAuth, async (req: any, res) => {
    if (req.params.userId !== req.user.id && !req.user.isAdmin) {
        res.status(403).send();
        return;
    }
    const user = await userService.getUserById(req.params.userId);
    res.send(user);
});

router.post('/update-user-details', isAuth, async (req: any, res) => {
    const { name, email, address } = req.body;

    const user = await userService.updateUserDetails(req.user.id, name, email, address);
    res.send(user);
});

router.get('/favorite-foods/:userId', async (req: any, res) => {
    try {
        const userId = req.params.userId;
        const user = await userService.getUserByIdWithFoods(userId);

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        const favoriteFoods = user.favoriteFoods;
        res.send(favoriteFoods);
    } catch (error) {
        console.error('Error retrieving favorite foods:');
        res.status(500).send({ error: 'Internal server error' });
    }
});

export default router;
