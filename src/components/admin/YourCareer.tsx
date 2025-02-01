'use client'
import { Button } from '@mui/material';
import React, { useState } from 'react';
import Editor from '../custom/RichTextEditor';
import { toast, ToastContainer } from 'react-toastify';
import { edit_your_career, update_home_content, your_career_details } from '@/api/apiClient';
import { AxiosError } from 'axios';
import { useQuery } from '@tanstack/react-query';


const YourCareer = () => {

    const [content, setContent] = useState('');
    const query = useQuery({
        queryKey: ['your_career_listing'],
        queryFn: async () => {
            const res = await your_career_details();
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
        const res = await edit_your_career({ description: data.about_us });
        if (res.data) {
            toast.success(res.message);
        } else {
            toast.error(res.message || 'An error occurred');
        }
    }
    const home_data: any = {
        query_data_aboutUs: query?.data?.data?.description,
        edit_button_fn: edit_button_fn
    }
    console.log(home_data, 'home_data');

    return (
        <div className='h-[50vh] w-[50vw] border-blue-500'>
            <h1 className='text-2xl font-bold'>Your Career</h1>
            <div >
                <Editor {...home_data} />
            </div>
            <ToastContainer />

        </div>
    )
}

export default YourCareer