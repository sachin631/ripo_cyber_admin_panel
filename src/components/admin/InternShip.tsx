'use client'
import { Box, Button, FormControl, Input, InputLabel, Modal } from '@mui/material'
import * as React from 'react';
import Typography from '@mui/material/Typography';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { toast, ToastContainer } from 'react-toastify';
import { add_internship, get_internship_listing } from '@/api/apiClient';
import Loader from '../custom/Loader';
import { AxiosError } from 'axios';

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
    const queryClient=useQueryClient();
    
    
    const handleOpen = (name: string) => {
        setBtnName(name);
        setOpen(true)
    };
    const handleClose = () => setOpen(false);
    const router = useRouter();

    const btnClick = (data: any) => {
        console.log(data);
        mutation.mutate(data);
    }

    const query = useQuery({
        queryKey: ['internship_listing'],
        queryFn: async () => {
            const res = await get_internship_listing();
            return res;
        },


    });
    console.log(query, 'query');
    if (typeof window === "undefined") return null;
    if (query.isError) {
        const error: any = query.error as AxiosError;
        toast.error(error?.response?.data.message);
    }

    // console.log(query.isLoading, 'queryisloading');



    // if (query.isLoading) {
    //     return <div className="flex justify-center items-center"><Loader /></div>;
    // }
    console.log(query?.data?.data?.internship_categoryy
        // internship_categoryy
        , 'querydata');

    const mutation = useMutation({
        mutationFn: async (data) => {
            const res = await add_internship(data);
            console.log(res, 'res');
            return res;
        },
        onSuccess: async(res) => {
            toast.success(res.message);
           await queryClient.invalidateQueries({queryKey:['internship_listing']});
           await queryClient.refetchQueries({ queryKey: ['user_listing'] });

        },
        onError: (err: any) => {
            toast.error(err?.response?.data?.message);
        }
    });

    return (
        <>
            <div className='flex justify-end gap-4'>
                <Button variant='contained' color='primary' onClick={() => handleOpen('Add Internship')} type='button'>Add Internship</Button>
            </div>
            <h1 className='font-bold text-3xl'>InternShip</h1>

            <div className='flex flex-col  gap-5 w-[100%]'>
                {
                    query?.data?.data?.internship_categoryy?.map((item: any) => {
                        return (
                            <h1 className='px-4 py-4 text-center rounded-lg text-white bg-orange-500 text-2xl font-bold text-gray flex justify-between'>
                                <span>{item?.name}</span>
                                <div className='flex gap-4'>
                                    <span><Button variant='contained' color='primary' onClick={() => { router.push(`/protected/internShipDetails/${item?.id}`) }} type='button'>view</Button></span>
                                    <span><Button variant='contained' color='primary' onClick={() => handleOpen('Edit Internship')} type='button'>Edit</Button></span>
                                    <span><Button variant='contained' color='primary' type='button'>Delete</Button></span>
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
        </>
    )
}

export default InternShip