'use client'
import React from 'react'
import InternShipFormTable from '../custom/internShipFormTable'
import { useQuery } from '@tanstack/react-query'
import Loader from '../custom/Loader';
import { internship_applied_listing } from '@/api/apiClient';

const InternShipForm = () => {
    const query = useQuery({
        queryKey: ['internship_listing'],
        queryFn: () => internship_applied_listing()
    });
    const user_list = query?.data?.data;
    console.log(user_list, 'user_list');
    if (query?.isLoading) {
        return (
            <Loader />
        )
    }
    return (
        <div>
            <h1 className='text-2xl font-bold'>Privacy Policy</h1>

            <InternShipFormTable user_list={user_list} />
        </div>
    )
}

export default InternShipForm