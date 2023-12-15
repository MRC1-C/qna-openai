import Bard from "bard-ai";
import { NextResponse } from "next/server";

let myBard = new Bard('eQinaT73X6vltIkn0KkbDZW0YDS8JAhOv9KJcaozEBGXerc8WybpQ57DzqkbtT5CPW059Q.');


export async function OPTIONS(request: Request) {

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
    try {
        const { input } = await req.json()
        let res = await myBard.ask(input);
        return new NextResponse(res.toString())
        
    } catch (error) {
        console.log(error)
        return new NextResponse(JSON.stringify(error))

    }
    
}
