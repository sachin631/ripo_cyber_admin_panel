import React from 'react'
import PeopleIcon from '@mui/icons-material/People';

const DashBoard = () => {
  return (
    <div>
        <section className='w-[100%]'>
            <h1 className='text-2xl font-bold'>DashBoard</h1>
            <div className='flex justify-start flex-col gap-4 bg-blue-400 rounded-md p-4 w-[30%] text-white'>
                <h1 className='text-2xl font-bold text-center '>Total User</h1>
                <div className='flex justify-start gap-4 '>
                    <div className='text-2xl font-bold'>
                        <PeopleIcon />
                    </div>
                    <div className='text-2xl font-bold'>200</div>
                </div>
            </div>
        </section>
    </div>
  )
}

export default DashBoard