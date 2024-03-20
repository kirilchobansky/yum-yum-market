import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import { Food } from '../models/Food';
const foodService = require('../services/foodService');
const router = express.Router();

router.get('/', async (req, res) => {
    const foods = await foodService.getAll();
    res.send(foods);
})

router.get('/search/:searchName', async (req, res) => {
    const searchName = req.params.searchName;
    const foods = await foodService.search(searchName);
    res.send(foods);
})

router.get('/tags', async (req, res) => {
    const tags = await foodService.getAllTags();
    res.send(tags);
});

router.get('/tags/:tagName', async (req, res) => {
    const tagName = req.params.tagName;
    const foods = await foodService.getAllFoodsByTag(tagName);
    res.send(foods);
});

router.get('/details/:foodId', async (req, res) => {
    const foodId = req.params.foodId;
    const food = await foodService.getFoodById(foodId);
    res.send(food);
})

export default router;
