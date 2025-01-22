import { QueryClient, useMutation, useQueryClient } from '@tanstack/react-query'
import React from 'react'
import { useForm } from 'react-hook-form'
import { createUserr } from '@/api/apiClient'
import { ToastContainer, toast } from 'react-toastify';

const CreateUser = ({ mode }: any) => {
    // const queryClient = new QueryClient();
    const queryClient=useQueryClient();
    interface create {
        name: string,
        email: string,
        phone_number: string,
        profile_pic: string,
        password:string

    }
    const onCreate = (data: any) => {
        const formData = new FormData();
        formData.append('name', data.name);
        formData.append('email', data.email);
        formData.append('phone_number', data.phone_number);
        formData.append('password',data.password)
        // Append the profile picture (only take the first file)
        if (data.profile_pic && data.profile_pic[0]) {
            console.log(data.profile_pic,'......');
            console.log(data.profile_pic[0],'000');
            formData.append('profile_pic', data.profile_pic[0]);
        }
        userMutation.mutate(formData);
        console.log('user create data', data);
    }
    const userMutation = useMutation({
        mutationFn: async (data: any) => {
            const res = await createUserr(data);
            return res;
        },
        onSuccess: async (response:any) => {
            await queryClient.invalidateQueries({ queryKey: ['user_listing'] });
            await queryClient.refetchQueries({ queryKey: ['user_listing'] });
            toast.success(response?.message ||'user created successfully');
            console.log(response,'fres')
        },
        onError: (err:any) => {
            toast.error(err?.response?.data?.message ||'error whiel create user')
        }
    })

    const { register, handleSubmit, watch, formState: { errors } } = useForm<create>();
    return (
        <>
            <div className='flex flex-col justify-center items-center gap-4 p-4'>
                <div className='flex justify-center items-center gap-4'>
                    <label>Enter your name</label>
                    <input type='text' placeholder='enter your name' {...register('name', { required: true })} />
                    {errors?.name && <span className='text-red-500'>name is required</span>}
                </div>
                <div className='flex justify-center items-center gap-4'>
                    <label>Enter your email</label>
                    <input type='text' placeholder='enter your email' {...register('email', { required: true })} />
                    {errors?.email && <span className='text-red-500'>email is required</span>}
                </div>
                <div className='flex justify-center items-center gap-4'>
                    <label>Enter your phone</label>
                    <input type='text' placeholder='enter your phone' {...register('phone_number', { required: true })} />
                    {errors?.phone_number && <span className='text-red-500'>phone_number is required</span>}
                </div>
                <div className='flex justify-center items-center gap-4'>
                    <label>Enter your password</label>
                    <input type='text' placeholder='enter your password' {...register('password', { required: true })} />
                    {errors?.password && <span className='text-red-500'>phone_number is required</span>}
                </div>
                <div className='flex justify-center items-center gap-4'>
                    <label>Enter your profile_pic</label>
                    <input type='file' placeholder='enter your profile_pic' {...register('profile_pic', { required: true })} />
                    {errors?.profile_pic && <span className='text-red-500'>profile_pic is required</span>}
                </div>
                <div className='text-center  flex justify-center items-center'>
                    {mode == 'create' && <button className='px-4 py-4 bg-blue-500 active:bg-slate-500' onClick={handleSubmit(onCreate)}>Create</button>}
                    {mode == 'edit' && <button className='px-4 py-4 bg-blue-500 active:bg-slate-500'>edit</button>}
                </div>
                <ToastContainer />
            </div>
        </>
    )
}

export default CreateUser