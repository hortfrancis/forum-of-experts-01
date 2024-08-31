import express, { Request, Response } from 'express';
import cors from 'cors';
import path from 'path';
import logger from './middleware/logger';

import chatWithGPT from './services/openai';
import chatWithClaude from './services/anthropic';

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, '../public')));
app.use(logger);



app.post('/forum/discuss', (req: Request, res: Response) => {
    const message = req.body.message;

    console.log('Received message:', message);

    // For now, just echo the received message back
    res.send({
        message: 'Received message',
        content: `Echo: ${message}`
    });
});



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

app.get(
    '/test/anthropic',
    (req: Request, res: Response) => {

        chatWithClaude("Describe a cat in a sentence.")
            .then((response) => {
                // Guard clause to prevent TypeScript screaming at me 
                if (response.content[0].type === 'text') res.send(response.content[0].text);
                else res.send('No text response');
            })
            .catch((error) => {
                res.status(500).send('Error: ' + error);
            });
    }
)

export default app;
