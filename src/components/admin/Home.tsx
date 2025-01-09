import { Button } from '@mui/material'
import React from 'react'
import Editor from '../custom/RichTextEditor'

const Home = () => {
    return (
        <div className='h-[20vh] w-[50vw] border-blue-500'>
            <h1 className='text-2xl font-bold'>Home</h1>
            <div>
                <Editor/>
                
            </div>

        </div>
    )
}

export default Home