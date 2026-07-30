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

app.get('/', (_req, res) => {
    res.send(`
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8" />
            <title>Yum Yum Market API</title>
            <style>
                body {
                    margin: 0;
                    height: 100vh;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    background-color: #121212;
                    color: #f5f5f5;
                    font-family: 'Segoe UI', Arial, sans-serif;
                    text-align: center;
                }
                .container {
                    padding: 2rem;
                }
                h1 {
                    margin: 0 0 0.75rem;
                    font-size: 2rem;
                    color: #4ade80;
                }
                p {
                    margin: 0;
                    font-size: 1rem;
                    color: #a1a1aa;
                }
            </style>
        </head>
        <body>
            <div class="container">
                <h1>Yum Yum Market API is Live</h1>
                <p>Server is up and running &mdash; successfully connected and routing requests.</p>
            </div>
        </body>
        </html>
    `);
});

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