'use client'
import { edit_work_together, get_work_together } from '@/api/apiClient';
import { FormControl, Input, InputLabel, FormHelperText, Button } from '@mui/material';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import React, { useEffect } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import Loader from '../custom/Loader';
import { useForm } from 'react-hook-form';

const WorkTogther = () => {
    const queryClient = useQueryClient();
    const { register, handleSubmit, setValue, formState: { errors } } = useForm({
        defaultValues: {
            email: "",
            phone: "",
            fb_link: "",
            twitter_link: "",
            insta_link: ""
        }
    });

    const query = useQuery({
        queryKey: ['work_together'],
        queryFn: async () => {
            const res = await get_work_together();
            return res;
        }
    });

    const mutation = useMutation({
        mutationFn: async (data: any) => {
            console.log(data, 'here in mutaion')
            const res = await edit_work_together(data);
            return res;
        },
        onSuccess: async (data) => {
            await queryClient.invalidateQueries({ queryKey: ['work_together'] });
            toast.success(data.message);
        },
        onError: async (error: any) => {
            toast.error(error?.response?.data?.message || 'An error occurred');
        },
    });

    useEffect(() => {
        if (query?.data?.data) {
            const { email, phone, fb_link, twitter_link, insta_link } = query.data.data;
            setValue("email", email || "");
            setValue("phone", phone || "");
            setValue("fb_link", fb_link || "");
            setValue("twitter_link", twitter_link || "");
            setValue("insta_link", insta_link || "");
        }
    }, [query.data, setValue]);

    if (query?.isLoading) {
        return <div className='flex justify-center items-center'> <Loader /></div>
    }

    const edit_fn = async (data: any) => {
        console.log(data, 'data');
        mutation.mutate(data);
    }

    return (
        <div className="flex justify-center items-center  bg-gray-100">
            <div className="bg-white p-8 shadow-2xl rounded-lg flex flex-col gap-6 w-full sm:w-[75%] md:w-[50%] lg:w-[40%]">
                <h2 className="text-xl font-semibold text-gray-800 text-center mb-4">
                    Work Together
                </h2>
                <form className='flex flex-col gap-4' onSubmit={handleSubmit(edit_fn)}>
                    <FormControl>
                        <InputLabel htmlFor="email-input">Email address</InputLabel>
                        <Input id="email-input" type="email" {...register('email')} />
                        <FormHelperText id="email-helper-text">
                            We&apos;ll never share your email.
                        </FormHelperText>
                    </FormControl>
                    <FormControl>
                        <InputLabel htmlFor="phone-input">Phone number</InputLabel>
                        <Input id="phone-input" type="text" {...register('phone')} />
                    </FormControl>
                    <FormControl>
                        <InputLabel htmlFor="fb-link-input">FB Link</InputLabel>
                        <Input id="fb-link-input" type="text" {...register('fb_link')} />
                    </FormControl>
                    <FormControl>
                        <InputLabel htmlFor="twitter-link-input">Twitter Link</InputLabel>
                        <Input id="twitter-link-input" type="text" {...register('twitter_link')} />
                    </FormControl>
                    <FormControl>
                        <InputLabel htmlFor="instagram-link-input">Instagram Link</InputLabel>
                        <Input id="instagram-link-input" type="text" {...register('insta_link')} />
                    </FormControl>
                    <Button variant="contained" color="primary" type='submit'>
                        {mutation.isPending ? <Loader /> : 'EDIT'}
                    </Button>
                </form>
            </div>
            <ToastContainer />
        </div>
    );
};

export default WorkTogther;
