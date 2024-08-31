import express, { Request, Response } from 'express';
import cors from 'cors';
import logger from './middleware/logger';

import chatWithGPT from './services/openai'; 


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
        
        chatWithGPT('Tell me an amusing story in a sentence.')
            .then((response) => {
                res.send(response);
            })
            .catch((error) => {
                res.status(500).send('Error: ' + error);
            });
    }
);

export default app;
