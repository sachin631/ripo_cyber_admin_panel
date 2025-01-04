import { Button } from '@mui/material';
import React from 'react';


const YourCareer = () => {
    return (
        <div className='h-[20vh] w-[20vw] border-blue-500'>
            <h1 className='text-2xl font-bold'>Your Career</h1>
            <div>
                <textarea className='w-[20vw] h-[30vh] border-2 border-blue-500 p-4 rounded-2xl' />
                <Button variant='contained' >Save</Button>
            </div>

        </div>
    )
}

export default YourCareer