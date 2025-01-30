'use client'
import { Button } from '@mui/material'
import React, { useState } from 'react'
import Editor from '../custom/RichTextEditor'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { get_internship_details, update_internship, update_internship_details } from '@/api/apiClient'
import { toast, ToastContainer } from 'react-toastify'
import { AxiosError } from 'axios'
import Loader from '../custom/Loader'
import { useParams } from 'next/navigation'



const InterShipDetails = () => {
    const { id } = useParams();
    const queryClient = useQueryClient();
    const query = useQuery({
        queryKey: ['internship_details', id],
        queryFn: async () => {
            const res = await get_internship_details(id);
            return res;
        },
    });

    const mutation = useMutation({
        mutationFn: async (data: any) => {
            const res = await update_internship_details(data);
            return res;
        },
        onSuccess: async (data) => {
            await queryClient.invalidateQueries({ queryKey: ['internship_details', id] });
            await queryClient.refetchQueries({ queryKey: ['internship_details', id] });
            toast.success(data.message);
        },
        onError: async (error: any) => {
            toast.error(error?.response?.data?.message || 'An error occurred');
        },
    })

    if (query?.isError) {
        const error: any = query.error as AxiosError;
        console.log(error, 'error');
        toast.error(error?.response?.data?.message || 'An error occurred');
    }
    if (query?.isLoading) {
        return <Loader />
    }

    const edit_button_fn = async (data: any) => {
        console.log(data, 'datahahahhafunctioon');
        const res = {
            internship_category_id: id,
            description: data.about_us
        }
        mutation.mutate(res);
    }



    const editor_data = {
        query_data_aboutUs: query?.data?.data?.description,
        edit_button_fn: edit_button_fn
    }
    return (
        <>
            <section>
                <h1 className='text-2xl font-bold'>{query?.data?.data?.title}</h1>
                <Editor {...editor_data} />
                <ToastContainer />
            </section>

        </>
    )
}

export default InterShipDetails