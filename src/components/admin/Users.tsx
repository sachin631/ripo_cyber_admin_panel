'use client'
import React, { useState, useEffect } from 'react';
import BasicTable from '../custom/Table';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import Loader from '../custom/Loader';
import { AxiosError } from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import { delete_user, user_listing } from '@/api/apiClient';
import { Pagination } from '@mui/material';

const Users = () => {
  const [page, setPage] = useState(1);
  const [searchKey, setSearchKey] = useState('');
  const [debouncedSearchKey, setDebouncedSearchKey] = useState(searchKey);
  const queryClient = useQueryClient();
  const limit = 10;

  const delete_user_mutation: any = useMutation({
    mutationFn: async (id: any) => {
      const res = await delete_user(id);
      return res;
    },
    onSuccess: async (data) => {
      await queryClient.invalidateQueries({ queryKey: ['users_listing', page, debouncedSearchKey] });
      await queryClient.refetchQueries({ queryKey: ['users_listing', page, debouncedSearchKey] });
      toast.success(data.message);
    },
    onError: async (error: any) => {
      console.log(error, 'error');
      toast.error(error?.response?.data?.message || 'An error occurred');
    },
  })
  // Debounce search input to avoid excessive API calls
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchKey(searchKey);
    }, 500); // Adjust delay as needed

    return () => clearTimeout(handler);
  }, [searchKey]);

  const { data: query, isLoading, isError, error } = useQuery({
    queryKey: ['users_listing', page, debouncedSearchKey],
    queryFn: async () => {
      return await user_listing(page, limit, debouncedSearchKey);
    }
  });

  if (isError) {
    const axiosError: any = error as AxiosError;
    toast.error(axiosError?.response?.data?.message || 'Something went wrong');
  }

  if (isLoading) {
    return <div className="flex justify-center items-center"><Loader /></div>;
  }
  const delfn = async (_id: any) => {
    console.log(_id, '_id');
    delete_user_mutation.mutate(_id);
  }
  console.log(query, 'query');
  const prop_data: any = {
    user_list: query?.user_list,
    delfn: delfn
  }
  return (
    <>
      <div>
        <input
          type="text"
          placeholder="Search"
          className="border outline-none border-gray-400 rounded-md py-2 px-4"
          onChange={(e) => setSearchKey(e.target.value)}
        />
      </div>
      <div>
        <h1 className="text-2xl font-bold">Users</h1>
      </div>
      <div className="overflow-x-scroll">
        <BasicTable {...prop_data} />
      </div>
      <div className="flex justify-center items-center mt-10 mb-10">
        <Pagination
          count={query?.totalPages || 1}
          page={page}
          onChange={(event, value) => setPage(value)}
          color="primary"
        />
      </div>
      <ToastContainer />
    </>
  );
};

export default Users;
