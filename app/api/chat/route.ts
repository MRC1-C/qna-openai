import OpenAI from 'openai'
import { OpenAIStream, StreamingTextResponse } from 'ai'

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
})

export const runtime = 'edge'


export async function POST(req: any) {

    const { input } = await req.json();
    console.log(input)
    const response = await openai.chat.completions.create({
        model: "gpt-3.5-turbo-0301",
        messages: [{ role: "user", content: input }],
        stream: true,
    });

    const stream = OpenAIStream(response)

    return new StreamingTextResponse(stream)

}
