'use client'
import React, { useEffect, useState } from 'react';
import Editor from '../custom/RichTextEditor';
import { get_common_data, update_about_us } from '@/api/apiClient';
import { useMutation, useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import Loader from '../custom/Loader';
import { useQueryClient } from '@tanstack/react-query';



const AboutUs = () => {
    const [content, setContent] = useState('')
    const query = useQuery({
        queryKey: ['common_content_listing'],
        queryFn: async () => {
            const res = await get_common_data();
            return res;
        },

    });
    if (query.isError) {
        const error: any = query.error as AxiosError;
        toast.error(error?.response?.data.message);
    }
    if (query.isLoading) {
        return <div className="flex justify-center items-center"><Loader /></div>;
    }
    const queryClient: any = useQueryClient();

    const edit_button_fn = async (data: any) => {
        console.log(data, 'datahahahhafunctioon');
        setContent(data);
        const res = await update_about_us(data);

        console.log(res, 'res');
        if(res.data){
            toast.success(res.message);
            queryClient.invalidateQueries(['about_us_listing']); // Refresh query data
        }

        // mutation.mutate(data)


    }

    if (content) {

    }

    // const mutation = useMutation({
    //     mutationFn: async (data: any) => {
    //         if (data) {
    //             const res = await update_about_us(data);
    //             return res;
    //         } else {
    //             return
    //         }
    //         // const res = await update_about_us(data);
    //         // return res;
    //     },
    //     onSuccess: async (res: any) => {
    //         toast.success('Update successful!');
    //         queryClient.invalidateQueries(['about_us_listing']); // Refresh query data
    //     },
    //     onError: (err: any) => {
    //         toast.error(err?.response?.data?.message);
    //     }
    // })

    const about_us_data = {
        query_data_aboutUs: query.data.data.about_us,
        edit_button_fn: edit_button_fn
    }



    return (
        <div className='h-[20vh] w-[50vw] border-blue-500'>
            <h1 className='text-2xl font-bold'>About Us</h1>
            <div >
                <Editor {...about_us_data} />
            </div>
            <ToastContainer />
        </div>
    )
}

export default AboutUs