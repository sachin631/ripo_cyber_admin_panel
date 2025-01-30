'use client'
import React, { useEffect, useState } from 'react'
import MultiActionAreaCard from '../custom/Card';
import { Box, Button, FormControl, Input, InputLabel, Modal, Pagination, Typography } from '@mui/material'
import { useQuery } from '@tanstack/react-query';
import { get_our_services_listing } from '@/api/apiClient';
import { AxiosError } from 'axios';
import { toast } from 'react-toastify';
import Loader from '../custom/Loader';
import { DATA_TYPE } from '@/app.constant';
import { useForm } from 'react-hook-form';

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

const OurServices = () => {
  //hooks
  const [open, setOpen] = React.useState(false);
  const [page, setPage] = React.useState(1);
  const [search_key, setSearchKey] = React.useState('');
  const [deBounceKey, setDebounceKey] = useState(search_key);
  const { register, handleSubmit, formState: { errors }, watch } = useForm();

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebounceKey(search_key);
    }, 500);

    return () => clearTimeout(timer);
  }, [search_key])
  //variables
  const limit = 5;
  //query functions
  const query = useQuery({
    queryKey: ['our_services', page, deBounceKey],
    queryFn: async () => {
      const res = await get_our_services_listing(page, limit, search_key, DATA_TYPE.OUR_SERVICES);
      return res;
    }
  });
  if (query.isError) {
    const error: any = query.error as AxiosError;
    toast.error(error?.response?.data?.message || 'An error occurred');
  }
  if (query.isLoading) {
    return (
      <div className='flex justify-center items-center h-[100vh]'>
        <h1 className='text-2xl font-bold'><Loader /></h1>
      </div>
    )
  }
  const data: any = query?.data.data.use_cases;

  const Addbtn = async (data: any) => {
    console.log('>>>>')
    console.log(data, 'dataapana h hai');
  }
  return (
    <>
      <div className='flex justify-end gap-4'>
        <Button variant='contained' color='primary' onClick={handleOpen} type='button'>Add services</Button>
        <input type="Search" placeholder='Search' className='border outline-none border-gray-400 rounded-md py-2 px-4' onChange={(e) => setSearchKey(e.target.value)} />
      </div>

      <h1 className='font-bold text-3xl'>Our Services</h1>
      <div className='w-[100%] h-[100%] text-center'>
        <MultiActionAreaCard data={data} />
      </div>


      {/* model */}
      <div>
        <form onSubmit={handleSubmit(Addbtn)}>
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style} className='flex flex-col gap-3 rounded-lg'>
              <Typography id="modal-modal-title" variant="h6" component="h2" className='text-center'>
                Add services
              </Typography>

              {/* ✅ Wrap inputs inside a form */}
              <form onSubmit={handleSubmit(Addbtn)} className="flex flex-col gap-3">
                <FormControl className='mt-4'>
                  <Input type='file' {...register('image', { required: true })} />
                  {errors.image && <p className="text-red-500">Image is required</p>}
                </FormControl>

                <FormControl>
                  <InputLabel>Title</InputLabel>
                  <Input type='text' {...register('title', { required: true })} />
                  {errors.title && <p className="text-red-500">Title is required</p>}
                </FormControl>

                <FormControl>
                  <InputLabel>Description</InputLabel>
                  <Input type='text' {...register('description', { required: true })} />
                  {errors.description && <p className="text-red-500">Description is required</p>}
                </FormControl>

                {/* ✅ Change Button type to "submit" */}
                <Button type="submit" variant='contained'>Add</Button>
              </form>
            </Box>
          </Modal>

        </form>
      </div>
      <section className='flex justify-center items-center'>
        <Pagination
          count={query?.data?.totalPages}
          page={page}
          onChange={(event, value) => setPage(value)}
          color="primary" />
      </section>

    </>
  )
}

export default OurServices