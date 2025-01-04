'use client'
import { Box, Button, FormControl, Input, InputLabel, Modal } from '@mui/material'
import * as React from 'react';
import Typography from '@mui/material/Typography';
import { useRouter } from 'next/navigation';

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
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const router = useRouter();

    return (
        <>
            <div className='flex flex-col  gap-5 w-[100%]'>
                <h1 className='px-4 py-4 text-center rounded-lg text-white bg-orange-500 text-2xl font-bold text-gray flex justify-between'>
                    <span>PYTHON</span>
                    <div className='flex gap-4'>
                        <span><Button variant='contained' color='primary' onClick={() => { router.push(`/protected/internShipDetails/${1}`) }} type='button'>view</Button></span>
                        <span><Button variant='contained' color='primary' onClick={handleOpen} type='button'>Edit</Button></span>
                        <span><Button variant='contained' color='primary' type='button'>Delete</Button></span>
                    </div>
                </h1>
                
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
                            Edit
                        </Typography>

                        <FormControl>
                            <InputLabel>Name</InputLabel>
                            <Input type='text' />
                        </FormControl>

                        <Button variant='contained'>EDIT</Button>
                    </Box>
                </Modal>
            </div>
        </>
    )
}

export default InternShip