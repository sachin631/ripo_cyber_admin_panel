'use client'
import { getUsers } from '@/api/apiClient'
import { useQuery } from '@tanstack/react-query'
import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import CreateUser from './CreateUser';
import { Pagination } from '@mui/material';

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

const Users = () => {

  //basic hooks
  const [mode, setMode] = useState('');
  const [open, setOpen] = React.useState(false);
  const [search_key, set_search_key] = useState('');
  const [deBounceKey, setDebounceKey] = useState(search_key);
  const [page, setPage] = useState(1);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebounceKey(search_key);
    }, 500);

    return () => clearTimeout(timer);
  }, [search_key])

  const handleOpen = (mode: any) => {
    setMode(mode);
    setOpen(true);
  }
  const handleClose = () => setOpen(false);

  const limit = 5;
  //react query
  const query: any = useQuery({
    queryKey: ['user_listing', page, deBounceKey],
    queryFn: async () => {
      const user = await getUsers(page, limit, search_key);
      return user;
    }
  });
  console.log(query?.data, 'query_data');
  if (query.error) {
    return <h1>error occur while fetching user</h1>
  }

  if (query.isLoading) {
    return <h1>Loading...</h1>
  }

  return (
    <div>
      <div className='flex justify-center items-center  mt-4'>
        <input className='border-[2px] border-black' type='text' placeholder='search' value={search_key} onChange={(event: any) => set_search_key(event?.target.value)} />
      </div>
      {
        query?.data?.user_list?.map((user: any) => {
          return (

            <ul className='flex justify-center items-center gap-4 text-white mt-4' key={user?._id}>
              <div className='  bg-gray-400 rounded-full w-[7%] h-[7%]'>
                <img src={user?.profile_pic?.url} className='rounded-full w-full h-full' />
              </div>
              <div className='px-4 py-4  bg-slate-800'>{user?.name}</div>
              <div className='px-4 py-4  bg-gray-900'>{user.email}</div>
              <div className='px-4 py-4  bg-orange-300'>{user.phone_number}</div>
              <div className='px-4 py-4  bg-red-500 rounded-full cursor-pointer active:bg-blue-600'>delete</div>
              <div className='px-4 py-4  bg-orange-400 rounded-full cursor-pointer active:bg-blue-600' onClick={() => handleOpen('edit')}>edit</div>
              <div className='px-4 py-4  bg-slate-600 rounded-full cursor-pointer active:bg-blue-600' onClick={() => handleOpen('create')}>create</div>
            </ul>

          )

        })
      }

      <div className='flex justify-center items-center mt-10 mb-10'>
        <Pagination
          count={query?.data?.totalPages}
          page={page}
          onChange={(event, value) => setPage(value)}
          color="primary" />
      </div>

      {/* //model */}

      <div>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              create user
            </Typography>
            <CreateUser mode={mode} />
          </Box>
        </Modal>
      </div>


    </div>
  )
}

export default Users