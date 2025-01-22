'use client'
import React, { useEffect, useState } from 'react'
import PeopleIcon from '@mui/icons-material/People';
import { getUsers } from '@/api/apiClient';

const DashBoard = () => {
    const [user,setUser]=useState<any>([]);
    useEffect(()=>{
        const user=async()=>{
            const res=await getUsers(1,1,'');
            setUser(res);
        };
        user();

    },[]);
    console.log(user,'user');
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
                    <div className='text-2xl font-bold'>{user?.totalCount}</div>
                </div>
            </div>
        </section>
    </div>
  )
}

export default DashBoard