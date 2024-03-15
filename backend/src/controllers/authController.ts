import express from 'express';
import { sample_users } from '../data';
import { generateToken } from '../services/authService';
const router = express.Router();

router.post('/login', (req, res) => {
    const { email, password } = req.body;
    const user = sample_users.find(user => user.password === password && user.email === email);

    if(!user){
        res.status(400).send('User email or password is not valid!');
        return;
    }
    res.send(generateToken(user));
})

export default router;