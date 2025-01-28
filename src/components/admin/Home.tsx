'use client'
import { Button } from '@mui/material'
import React, { useState } from 'react'
import Editor from '../custom/RichTextEditor'
import { useQuery } from '@tanstack/react-query'
import { get_common_data, get_home_content, update_home_content } from '@/api/apiClient'
import { toast, ToastContainer } from 'react-toastify'
import { AxiosError } from 'axios'

const Home = () => {
    const [content, setContent] = useState('');
    const query = useQuery({
        queryKey: ['home_content_listing'],
        queryFn: async () => {
            const res = await get_home_content();
            return res;
        }
    });
    if (query.isError) {
        const error: any = query.error as AxiosError;
        console.log(error, 'error');
        toast.error(error?.response?.data.message);
    }
    if (query.isLoading) {
        return (
            <div className='h-[20vh] w-[50vw] border-blue-500'>
                <h1 className='text-2xl font-bold'>Home</h1>
                <div>
                    <Editor />
                </div>
            </div>
        )
    }

    const edit_button_fn = async (data: any) => {
        console.log(data, 'datahahahhafunctioon');
        setContent(data);
        const res=await update_home_content({description:data.about_us});
        if(res.data){
            toast.success(res.message);
        }else{
            toast.error(res.message||'An error occurred');
        }
    }
    const home_data: any = {
        query_data_aboutUs: query.data.data.description,
        edit_button_fn: edit_button_fn
    }
    console.log(home_data, 'home_data');
    return (
        <div className='h-[20vh] w-[50vw] border-blue-500'>
            <h1 className='text-2xl font-bold'>Home</h1>
            <div>
                <Editor {...home_data} />
            </div>
            <ToastContainer />
        </div>
    )
}

export default Home