'use client'
import React from 'react'
import MultiActionAreaCard from '../custom/Card';
import { Box, Button, FormControl, Input, InputLabel, Modal, Typography } from '@mui/material'

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
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  return (
    <>
      <div className='flex justify-end gap-4'>
        <Button variant='contained' color='primary' onClick={handleOpen} type='button'>Add services</Button>
      </div>

      <h1 className='font-bold text-3xl'>Our Services</h1>
      <div className='w-[100%] h-[100%] text-center'>
        <MultiActionAreaCard />
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
            <Typography id="modal-modal-title" variant="h6" component="h2" className='text-center'>
              Add services
            </Typography>
            <FormControl className='mt-4'>
              <Input type='file' />
            </FormControl>
            <FormControl>
              <InputLabel>title</InputLabel>
              <Input type='text' />
            </FormControl>
            <FormControl>
              <InputLabel>Description</InputLabel>
              <Input type='text' />
            </FormControl>


            <Button variant='contained'>Add</Button>
          </Box>
        </Modal>
      </div>
    </>
  )
}

export default OurServices