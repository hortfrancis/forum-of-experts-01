import OpenAI from 'openai';
import dotenv from 'dotenv';
dotenv.config();

const openai = new OpenAI({
    apiKey: process.env['OPENAI_API_KEY'],
});

type Message = {
    role: 'system' | 'user' | 'assistant';
    content: string;
};

async function callOpenAI(messages: Message[]) {
    try {
        const chatCompletion = await openai.chat.completions.create({
            model: "gpt-4o-mini",
            messages,
        });
        return chatCompletion.choices[0].message.content;
    } catch (error) {
        console.error('OpenAI API error:', error);
        throw error;
    }
};

export default async function chatWithGPT(message: string) {
    const messages: Message[] = [
        { role: "system", content: "You are a polite, and concise, assistant. Reply in plain text -- only a paragraph or so." },
        { role: "user", content: message }
    ];
    return await callOpenAI(messages);
};