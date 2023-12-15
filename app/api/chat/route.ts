import OpenAI from 'openai'
import { OpenAIStream, StreamingTextResponse } from 'ai'

  
const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
})

export const runtime = 'edge'

export async function OPTIONS(request: Request) {
    const corsHeaders = {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    }
    return new Response(null, {
      status: 204,
      headers:{
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type, Authorization",
      }
    });
  }

export async function POST(req: any) {

    const { input } = await req.json()

    const response = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: input }],
        stream: true,
    });

    const stream = OpenAIStream(response)

    return new StreamingTextResponse(stream, {
        headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
            "Access-Control-Allow-Headers": "Content-Type, Authorization",
          },
    })

}
