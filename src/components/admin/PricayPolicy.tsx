'use client'
import { Button } from '@mui/material'
import React, { useState } from 'react'
import Editor from '../custom/RichTextEditor'
import { useQuery } from '@tanstack/react-query'
import { get_common_data, get_home_content, privacy_details, update_home_content, update_privacy_details } from '@/api/apiClient'
import { toast, ToastContainer } from 'react-toastify'
import { AxiosError } from 'axios'

const PricayPolicy = () => {
    const [content, setContent] = useState('');
    const query = useQuery({
        queryKey: ['privacy_details'],
        queryFn: async () => {
            const res = await privacy_details();
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
                <h1 className='text-2xl font-bold'>Privacy Policy</h1>
                <div>
                    <Editor />
                </div>
            </div>
        )
    }

    const edit_button_fn = async (data: any) => {
        console.log(data, 'datahahahhafunctioon');
        setContent(data);
        const res = await update_privacy_details({ privacy_policy: data.about_us });
        if (res.data) {
            toast.success(res.message);
        } else {
            toast.error(res.message || 'An error occurred');
        }
    }
    const home_data: any = {
        query_data_aboutUs: query?.data?.data?.privacy_policy,
        edit_button_fn: edit_button_fn
    }
    console.log(home_data, 'home_data');
    return (
        <div className='h-[20vh] w-[50vw] border-blue-500'>
            <h1 className='text-2xl font-bold'>Privacy Policy</h1>
            <div>
                <Editor {...home_data} />
            </div>
            <ToastContainer />
        </div>
    )
}

export default PricayPolicy
//export default 