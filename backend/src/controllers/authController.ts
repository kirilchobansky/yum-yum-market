import express from 'express';
const authService = require('../services/authService');
const router = express.Router();

router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
      const user = await authService.login(email, password);      
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
        const user = await authService.register(newUser);
        res.send(user); 
    } catch (error: any) {
        res.status(400).send(error.message);
    }
});
export default router;
