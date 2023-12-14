'use client'

import { AnthropicStream } from 'ai';
import { useCompletion } from 'ai/react';
import { useState } from 'react';


const Home = () => {
  const [inputBody, setInputBody] = useState('')
  const {
    completion,
    input,
    stop,
    isLoading,
    handleInputChange,
    handleSubmit,
  } = useCompletion({
    api: '/api/chat',
    body: { input: inputBody }
  });
  return (
    <main className="h-screen container w-full flex items-center flex-col">
      <div className='w-96 flex flex-col gap-3 p-3'>
        <form onSubmit={handleSubmit}>
          <input className="block w-full rounded-md border-0 p-3 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            value={inputBody} onChange={e => {
              handleInputChange(e)
              setInputBody(e.target.value)
            }}
            required
          />
          <button type='submit' className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Ok</button>
        </form>
        <div className='w-full p-3 rounded-md ring-1 ring-purple-500'>Trả lời:{' ' + completion}</div>
      </div>
    </main>
  )
}
export default Home