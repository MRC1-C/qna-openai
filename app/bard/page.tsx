'use client'

import axios from 'axios';
import { useState } from 'react';
import Markdown from 'react-markdown'

const Home = () => {
    const [inputBody, setInputBody] = useState('')
    const [output, setOutput] = useState('')
    const [loading, setLoading] = useState(false)
    const handleSubmitOk = async (e: any) => {
        e.preventDefault();
        setLoading(true)
        setOutput('')
        axios.post('/api/bard', { input: inputBody })
            .then(r => {
                setLoading(false)
                setOutput(r.data)
            })

    }
    return (
        <main className="h-screen container w-full flex items-center flex-col">
            <div className='w-1/2 flex flex-col gap-3 p-3'>
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
                    </div> : "Submit"}</button>
                </form>
                <div className='w-full p-3 rounded-md ring-1 ring-purple-500'><Markdown>{output}</Markdown></div>
            </div>
        </main>
    )
}
export default Home