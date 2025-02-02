'use client'
import React from 'react'
import AccordionExpandIcon from '../custom/Accordion'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { create_faq, delete_faq, faq_listing } from '@/api/apiClient'
import Loader from '../custom/Loader'
import { toast, ToastContainer } from 'react-toastify'
import { AxiosError } from 'axios'
import { Box, Button, FormControl, InputLabel, Typography, Modal, Input } from '@mui/material'
import { useForm } from 'react-hook-form'

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

const Faq = () => {
  const [open, setOpen] = React.useState(false);
  const queryClient = useQueryClient();

  const del_mutation = useMutation({
    mutationFn: async (id: any) => {
      console.log(id, 'here id in mutation')
      const res = await delete_faq(id);
      return res;
    },
    onSuccess: async (res: any) => {
      await queryClient.invalidateQueries({ queryKey: ['faq_listing'] });
      await queryClient.refetchQueries({ queryKey: ['faq_listing'] });
      toast?.success(res?.message);
    },
    onError: (err: any) => {
      toast?.error(err?.response?.data?.message);
    }
  })

  const add_btn_mutation = useMutation({
    mutationFn: async (data: any) => {
      const res = await create_faq(data);
      return res;
    },
    onSuccess: async (res: any) => {
      await queryClient?.invalidateQueries({ queryKey: ['faq_listing'] });
      await queryClient?.refetchQueries({ queryKey: ['faq_listing'] });
      toast.success(res?.message);
    },
    onError: (err: any) => {
      toast?.error(err?.response?.data?.message);
    }
  });

  const { register, handleSubmit, formState: { errors } } = useForm();


  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => setOpen(false);
  const query = useQuery({
    queryKey: ['faq_listing'],
    queryFn: async () => {
      const res = await faq_listing();
      return res;
    }
  });
  if (query.isLoading) {
    return <div className="flex justify-center items-center"><Loader /></div>;
  }
  if (query.isError) {
    const errror: any = query?.error as AxiosError;
    toast.error(errror?.response?.data?.message);
  }
  console.log(query.data, 'query.data');
  const edit_fn = async (data: any) => {
    console.log(data, 'edit fn called');
  }


  const del_fn = async (_id: any) => {
    console.log(_id, 'from back')
    console.log(_id, 'del fn called');
    del_mutation.mutate(_id);

  }
  const prop_data: any = {
    faq_list: query.data,
    edit_fn: edit_fn,
    del_fn: del_fn
  }

  const add_btn = async (data: any) => {
    add_btn_mutation.mutate(data);
  }
  return (
    <>
      <div className='mb-4'>
        <Button variant='contained' color='primary' onClick={() => handleOpen()} type='button'>Add FAQ</Button>
      </div>
      <div>
        <AccordionExpandIcon  {...prop_data} />
      </div>
      <div>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <form>
            <Box sx={style} className='flex flex-col gap-3 rounded-lg'>
              <Typography id="modal-modal-title" variant="h6" component="h2">
                FAQ
              </Typography>

              <FormControl>
                <InputLabel>question</InputLabel>
                <Input type='text' {...register('question', { required: true })} />
              </FormControl>

              <FormControl>
                <InputLabel>answer</InputLabel>
                <Input type='text' {...register('answer', { required: true })} />
              </FormControl>

              <Button variant='contained' onClick={handleSubmit(add_btn)}>Add</Button>
            </Box>
          </form>
        </Modal>
        <ToastContainer />
      </div>
    </>
  )
}

export default Faq