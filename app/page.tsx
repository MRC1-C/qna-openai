'use client'

import { AnthropicStream } from 'ai';
import { useCompletion } from 'ai/react';
import axios from 'axios';
import { useEffect, useState } from 'react';

const Home = () => {
  const [inputBody, setInputBody] = useState('')
  const [output, setOutput] = useState('')
  const [loading, setLoading] = useState(false)
  const handleSubmitOk = async(e: any) => {
    e.preventDefault();
    setLoading(true)
    setOutput('')
    axios.post('/api/chat', { input: inputBody + "? .Nếu bạn không đủ kiến thức hoặc không thể cung cấp thì hãy trả về đúng 1 từ là 'TRAGOOGLE' không trả về cái gì hết ngoài từ đó" })
      .then(r => {
        if (!r.data.toString().toLowerCase().includes("TRAGOOGLE".toLowerCase())) {
          setLoading(false)
          setOutput(r.data)
        }
        else {
          let data = JSON.stringify({
            "q": inputBody,
            "gl": "vn",
            "hl": "vi"
          });
          axios.post('https://google.serper.dev/search', data, {
            headers: {
              'X-API-KEY': '445e4a16e4972f5654108187b91c6d7f9c73e47e',
              'Content-Type': 'application/json'
            }
          })
            .then((response: any) => {
              axios.post('/api/chat', { input: `câu hỏi của tôi là "${inputBody}" và trả lời là "${response.data?.organic[0]?.snippet}" từ 2 cái đó tạo thành câu hoàn chỉnh dựa trên câu hỏi và câu trả lời` })
                .then(anwer => {
                  setLoading(false)
                  setOutput(anwer.data)
                })
            })
            .catch((error: any) => {
              console.log(error);
            });
        }
      })

  }
  return (
    <main className="h-screen container w-full flex items-center flex-col">
      <div className='w-96 flex flex-col gap-3 p-3'>
        <form onSubmit={handleSubmitOk}>
          <input className="block w-full rounded-md border-0 p-3 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            value={inputBody} onChange={e => {
              setInputBody(e.target.value)
            }}
            required
          />
          <button type='submit' className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">{loading ? <div
            className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
            role="status">
            <span
              className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]"
            >Loading...</span>
          </div>:"Submit"}</button>
        </form>
        <div className='w-full p-3 rounded-md ring-1 ring-purple-500'>Trả lời:{' ' + output}</div>
      </div>
    </main>
  )
}
export default Home