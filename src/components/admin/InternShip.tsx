'use client'
import { Box, Button, FormControl, Input, InputLabel, Modal, Pagination } from '@mui/material'
import * as React from 'react';
import Typography from '@mui/material/Typography';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { toast, ToastContainer } from 'react-toastify';
import { add_internship, delete_internship, get_internship_listing, update_internship } from '@/api/apiClient';
import Loader from '../custom/Loader';
import { AxiosError } from 'axios';
import { search } from 'jodit/esm/plugins/search/search';
import { set } from 'jodit/esm/core/helpers';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

const InternShip = () => {
    const [open, setOpen] = React.useState(false);
    const [btnName, setBtnName] = React.useState('');
    const { register, handleSubmit, formState: { errors }, watch } = useForm();
    const queryClient = useQueryClient();
    const [page, setPage] = React.useState(1);
    const [search_key, setSearchKey] = React.useState('');
    const [_id, setId] = React.useState(0);
    const limit = 5


    const handleOpen = (name: string, id: any) => {
        setBtnName(name);
        setOpen(true);
        setId(id);
    };
    const handleClose = () => setOpen(false);
    const router = useRouter();

    const btnClick = (data: any) => {
        console.log(data);

        mutation.mutate({ data, id: _id });
    }
    const { data: query, isLoading, isError } = useQuery({
        queryKey: ['internship_listing', page, search_key],
        queryFn: async () => {
            const res = await get_internship_listing(page, limit, search_key);
            return res;
        },


    });
    console.log(query?.data, 'queryyy');
    if (typeof window === "undefined") return null;
    if (isError) {
        const error: any = query.error as AxiosError;
        toast.error(error?.response?.data.message);
    }

    // console.log(query.isLoading, 'queryisloading');



    // if (isLoading) {
    //     return <div className="flex justify-center items-center"><Loader /></div>;
    // }


    const mutation = useMutation({
        mutationFn: async ({ data, id }: { data: any; id?: number }) => {
            if (id) {
                console.log(data, 'data');
                let obj: any = { name: data.name, internship_category_id: id }
                return await update_internship(obj);
            } else {
                const res = await add_internship(data);
                return res;
            }

        },
        onSuccess: async (res) => {
            toast.success(res.message);
            await queryClient.invalidateQueries({ queryKey: ['internship_listing'] });
            await queryClient.refetchQueries({ queryKey: ['user_listing'] });

        },
        onError: (err: any) => {
            toast.error(err?.response?.data?.message);
        }
    });
    console.log(query?.data?.data?.internship_categoryy, 'querydataaaaa');

    const delete_intern = async (id: any) => {
        deleteMutation.mutate(id);
    }
    const deleteMutation = useMutation({
        mutationFn: async (id: any) => {
            const res = await delete_internship(id);
            return res;
        },
        onSuccess: async (res) => {
            toast.success(res.message);
            await queryClient.invalidateQueries({ queryKey: ['internship_listing'] });
            await queryClient.refetchQueries({ queryKey: ['internship_listing'] });
        },
        onError: (err: any) => {
            toast.error(err?.response?.data?.message);
        }
    });
    return (
        <>
            <div className='flex justify-end gap-4'>
                <Button variant='contained' color='primary' onClick={() => handleOpen('Add Internship', null)} type='button'>Add Internship</Button>
                <input type="text" placeholder='Search' className='border outline-none border-gray-400 rounded-md py-2 px-4' onChange={(e) => setSearchKey(e.target.value)} />
            </div>
            <h1 className='font-bold text-3xl'>InternShip</h1>

            <div className='flex flex-col  gap-5 w-[100%]'>
                {
                    query?.data?.internship_categoryy?.map((item: any) => {
                        return (
                            <h1 className='px-4 py-4 text-center rounded-lg text-white bg-orange-500 text-2xl font-bold text-gray flex justify-between' key={item?._id}>
                                <span>{item?.name}</span>
                                <div className='flex gap-4'>
                                    <span><Button variant='contained' color='primary' onClick={() => { router.push(`/protected/internShipDetails/${item?._id}`) }} type='button'>view</Button></span>
                                    <span><Button variant='contained' color='primary' onClick={() => handleOpen('Edit Internship', item?._id)} type='button'>Edit</Button></span>
                                    <span><Button variant='contained' type='button' className='bg-red-500 text-white' onClick={() => delete_intern(item?._id)}>Delete</Button></span>
                                </div>
                            </h1>
                        )
                    })
                }
            </div>

            {/* model */}
            <div>
                <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={style} className='flex flex-col gap-3 rounded-lg'>
                        <Typography id="modal-modal-title" variant="h6" component="h2">
                            {btnName}
                        </Typography>

                        <FormControl>
                            <InputLabel>Name</InputLabel>
                            <Input type='text' {...register('name', { required: true })} />
                        </FormControl>

                        <Button variant='contained' onClick={handleSubmit(btnClick)}>{mutation.isPending ? <Loader /> : btnName}</Button>
                    </Box>
                </Modal>
                <ToastContainer />
            </div>
            <div className='flex justify-center items-center mt-10 mb-10 absolute bottom-0 left-[50%]'>
                <Pagination
                    count={query?.data?.totalPages}
                    page={page}
                    onChange={(event, value) => setPage(value)}
                    color="primary" />
            </div>
        </>
    )
}

export default InternShip