'use client'
import React, { useEffect } from 'react';
import Editor from '../custom/RichTextEditor';
import { get_common_data } from '@/api/apiClient';
import { useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { ToastContainer, toast } from 'react-toastify';



const AboutUs = () => {
    const query = useQuery({
        queryKey: ['about_us_listing'],
        queryFn: async () => {
            const res = await get_common_data();
            return res;
        },

    });
    if (query.isError) {
        const error: any = query.error as AxiosError;
        toast.error(error?.response?.data.message);
    }
    const about_us_data = {
        query_data: query.data,
        isLoading: query.isLoading
    }

    console.log(query, 'query');
    return (
        <div className='h-[20vh] w-[50vw] border-blue-500'>
            <h1 className='text-2xl font-bold'>About Us</h1>
            <div >
                <Editor {...about_us_data}/>
            </div>
            <ToastContainer />
        </div>
    )
}

export default AboutUs