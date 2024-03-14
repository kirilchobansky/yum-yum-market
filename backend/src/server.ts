import express from 'express';
import cors from 'cors';
import router from './routes';


const app = express();
app.use(cors({
    credentials: true,
    origin: ['http://localhost:4200']
}))

app.use(router);

const port = 5000;
app.listen(port, () => {
    console.log(`Server is listening on http://localhost:${port}`);
})