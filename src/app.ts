import express, { Request, Response } from 'express';
import cors from 'cors';
import logger from './middleware/logger';

const app = express();

app.use(cors());
app.use(express.json());
app.use(logger);

app.get(
    '/',
    (req: Request, res: Response) => {
        res.send('Hello World!');
    }
);

app.get(
    '/test/openai',
    (req: Request, res: Response) => {
        res.send('Hello OpenAI');
    }
);

export default app;
