import { Button } from '@mui/material'
import React from 'react'

const Home = () => {
    return (
        <div className='h-[20vh] w-[20vw] border-blue-500'>
            <h1 className='text-2xl font-bold'>Home</h1>
            <div>
                <textarea className='w-[20vw] h-[30vh] border-2 border-blue-500 p-4 rounded-2xl shadow-2xl' />
                <Button variant='contained' className='shadow-2xl'>EDIT</Button>
            </div>

        </div>
    )
}

export default Home