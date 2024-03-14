import express from 'express';
import { sample_foods, sample_tags } from '../data';
const router = express.Router();

router.get('/', (req, res) => {
    res.send(sample_foods);
});

router.get('/search/:searchName', (req, res) => {
    const searchName = req.params.searchName;
    const foods = sample_foods
        .filter(food => food.name.toLowerCase()
        .includes(searchName.toLowerCase()));  
    res.send(foods);
})

router.get('/tags', (req, res) => {
    res.send(sample_tags);
});

router.get('/tags/:tagName', (req, res) => {
    const tagName = req.params.tagName;
    const foods = sample_foods.filter(food => food.tags?.includes(tagName));
    res.send(foods);
});

router.get('/details/:foodId', (req, res) => {
    const foodId = req.params.foodId;
    const food = sample_foods.find(food => food.id === foodId);
    res.send(food);
})

export default router;
