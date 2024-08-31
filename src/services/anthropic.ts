import Anthropic from '@anthropic-ai/sdk';

const anthropic = new Anthropic({
    apiKey: process.env['ANTHROPIC_API_KEY'],
});

type Message = {
    role: 'user' | 'assistant';
    content: string;
};

function callAnthropic(messages: Message[]) {

    const systemMessage = "You are a polite, and concise, assistant. Reply in plain text -- only a paragraph or so.";

    return anthropic.messages.create({
        model: "claude-3-5-sonnet-20240620",
        max_tokens: 1024,
        system: systemMessage,
        messages,
    });
}

export default async function chatWithClaude(message: string) {
    const messages: Message[] = [
        { role: "user", content: message }
    ];
    return await callAnthropic(messages);
};