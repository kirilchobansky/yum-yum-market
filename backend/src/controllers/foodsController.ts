import express from 'express';
import { Food } from '../models/Food';
import { sample_foods } from '../data';
import foodsService from '../services/foodsService';
const router = express.Router();

router.get('/seed', async (req, res) => {
    const foodsCount = await Food.countDocuments();
    if (foodsCount > 0) {
        res.send('Seed is already done!');
        return;
    }

    await Food.create(sample_foods);
    res.send('Seed Is Done!');
});

router.get('/seed/delete', async (req, res) => {
    const foodsCount = await Food.countDocuments();
    if (foodsCount == 0) {
        res.send('Tere is no data to delete!');
        return;
    }

    await Food.deleteMany({});
    res.send('You have deleted all data!');
});

router.get('/', async (req, res) => {
    const foods = await foodsService.getAll();
    res.send(foods);
})

router.get('/search/:searchName', async (req, res) => {
    const searchName = req.params.searchName;
    const foods = await foodsService.search(searchName);
    res.send(foods);
})

router.get('/tags', async (req, res) => {
    const tags = await foodsService.getAllTags();
    res.send(tags);
});

router.get('/tags/:tagName', async (req, res) => {
    const tagName = req.params.tagName;
    const foods = await foodsService.getAllFoodsByTag(tagName);
    res.send(foods);
});

router.get('/details/:foodId', async (req, res) => {
    const foodId = req.params.foodId;
    const food = await foodsService.getFoodById(foodId);
    res.send(food);
});

export default router;
