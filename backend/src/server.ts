import express from 'express';
import cors from 'cors';
import router from './routes';
import mongoose from 'mongoose';

const app = express();

app.use(express.json());
app.use(cors({
    credentials: true,
    origin: ['http://localhost:4200']
}))

app.use(router);

const port = 3000;

mongoose.connect('mongodb://localhost:27017/yum-yum-market')
    .then(() => {
        console.log('DB is successfuly connected');
        app.listen(port, () => { 
        console.log(`Server is listening on http://localhost:${port}`) 
    })
})