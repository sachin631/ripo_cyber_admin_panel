'use client';

import { getProfile, updateProfile } from '@/api/apiClient';
import { useMutation, useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import React, { useEffect, useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import Loader from '../custom/Loader';
import { Button } from '@mui/material';
import { useForm, useWatch } from 'react-hook-form';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';

const Profile = () => {
    const [profilePicPreview, setProfilePicPreview] = useState<string | undefined>();

    const query = useQuery({
        queryKey: ['getProfile'],
        queryFn: async () => {
            const res = await getProfile();
            return res;
        },
    });

    const { register, handleSubmit, formState: { errors }, setValue, control } = useForm<any>({
        defaultValues: {
            name: query?.data?.data?.name || '',
            profile_pic: null,
        },
    });

    // Watch values of the form
    const name = useWatch({ control, name: 'name' });
    const profilePic = useWatch({ control, name: 'profile_pic' });

    useEffect(() => {
        if (query.isSuccess && typeof window !== 'undefined') {
            setValue('name', query.data?.data?.name || '');
            setProfilePicPreview(query.data?.data?.profile_pic?.url || '');
        }
    }, [query.isSuccess, setValue]);

    useEffect(() => {
        if (profilePic && profilePic[0]) {
            const file = profilePic[0];
            const reader = new FileReader();
            reader.onload = () => {
                if (typeof reader.result === 'string') {
                    setProfilePicPreview(reader.result); // Update preview
                }
            };
            reader.readAsDataURL(file);
        }
    }, [profilePic]);

    const updateButton = (data: any) => {
        const formData = new FormData();
        formData.append('name', data.name);
        if (data.profile_pic && data.profile_pic[0]) {
            formData.append('profile_pic', data.profile_pic[0]);
        }
        mutation.mutate(formData);
    };

    const mutation = useMutation({
        mutationFn: async (data: FormData) => {
            const res = await updateProfile(data);
            return res;
        },
        onSuccess: (res) => {
            toast.success(res?.message);
        },
        onError: (err) => {
            const error: any = err as AxiosError;
            toast.error(error.response?.data?.message || 'An error occurred');
        },
    });


    if (query.isLoading) {
        return <div className="flex justify-center items-center"><Loader /></div>;
    }

    return (
        <section className="flex justify-center items-center shadow-xl rounded-3xl py-4">
            <div className="flex justify-start items-center flex-col gap-4">
                <h1 className="text-bold text-[16px] leading-6 text-center font-extrabold">Your Profile</h1>
                <div className="relative">
                    {profilePicPreview ? (
                        <img src={profilePicPreview} alt="Profile Preview" className="w-[100px] h-[100px] rounded-full" />
                    ) : (
                        <Loader />
                    )}
                    <input
                        type="file"
                        id="profilePic"
                        className="hidden"
                        {...register('profile_pic')}
                    />
                    <label className="cursor-pointer absolute bottom-0 right-0 text-blue-500" htmlFor="profilePic">
                        <AddPhotoAlternateIcon />
                    </label>
                    {errors.profile_pic && <span className="text-red-500">Profile picture is required</span>}
                </div>
                <div>
                    <span className="text-bold leading-6 text-[16px] font-bold">Name :</span>
                    <input
                        type="text"
                        className="text-[16px] leading-6 px-4 ml-2 outline-none"
                        {...register('name', { required: true })}
                    />
                    {errors.name && <span className="text-red-500">Name is required</span>}
                </div>
                <div>
                    <span className="text-bold leading-6 text-[16px] font-bold">Email :</span>
                    <input
                        type="text"
                        className="text-[16px] leading-6 px-4 ml-2 outline-none"
                        value={query?.data?.data?.email || ''}
                        readOnly
                    />
                </div>
                <div>
                    <Button
                        variant="contained"
                        color="primary"
                        type="submit"
                        onClick={handleSubmit(updateButton)}
                    >
                        {mutation.isPending ? 'Updating...' : 'Update'}
                    </Button>
                </div>
            </div>
            <ToastContainer />
        </section>
    );
};

export default Profile;
