import express from 'express';
import cors from 'cors';
import router from './routes';
import mongoose from 'mongoose';
import { MONGO_URL, PORT, CORS_ORIGIN } from './config';

const app = express();

app.use(express.json());
app.use(cors({
    credentials: true,
    origin: [CORS_ORIGIN]
}))

app.use(router);

console.log("DEBUG: Render is seeing this URI ->", process.env.MONGO_URI);
mongoose.connect(MONGO_URL)
    .then(() => {
        console.log('DB is successfuly connected');
        app.listen(PORT, () => {
            console.log(`Server is listening on http://localhost:${PORT}`)
        })
    }).catch(err => {
        console.log('DB connection error', err);
    })