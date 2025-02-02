'use client'
import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import CardActionArea from '@mui/material/CardActionArea';
import CardActions from '@mui/material/CardActions';
import { Box, Button, FormControl, Input, InputLabel, Modal, Typography } from '@mui/material'
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

export default function MultiActionAreaCard({ data, edit_fn, del_fn }: any) {
  // console.log(data, edit_fn, del_fn, 'namkjkle');
  const [open, setOpen] = React.useState(false);
  const [id, setId] = React.useState('');
  const handleOpen = (id: any) => {
    setOpen(true);
    setId(id)
  };
  const handleClose = () => setOpen(false);
  const { handleSubmit, register, formState: { errors }, } = useForm();

  return (
    <>
      <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-4 h-[70vh] overflow-y-scroll">
        {data?.use_cases?.map((curelem: any) => {
          return (

            <Card key={curelem._id} sx={{ maxWidth: 345 }} className=" md:h-[55vh] lg:[45vh] h-[65vh] overflow-y-auto">
              <CardActionArea>
                <CardMedia
                  component="img"
                  height="140"
                  image={curelem?.image?.url}
                  alt="green iguana"
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {curelem?.name}
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    {curelem?.description}
                  </Typography>
                </CardContent>
              </CardActionArea>
              <CardActions>
                <Button size="small" color="primary" variant='contained' onClick={() => handleOpen(curelem?._id)}>
                  Edit
                </Button>
                <Button size="small" variant='contained' className='bg-red-500' onClick={() => del_fn(curelem?._id)}>
                  Delete
                </Button>
              </CardActions>
            </Card>

          )
        })}


      </div>



      {/*Edit services model */}
      <div>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style} className='flex flex-col gap-3 rounded-lg'>
            <form>
              <Typography id="modal-modal-title" variant="h6" component="h2" className='text-center'>
                Add content
              </Typography>
              <FormControl className='mt-4'>
                <Input type='file' {...register('image', { required: false })} />
              </FormControl>
              <FormControl>
                <InputLabel>title</InputLabel>
                <Input type='text' {...register('name', { required: false })} />
              </FormControl>
              <FormControl>
                <InputLabel>Description</InputLabel>
                <Input type='text' {...register('description', { required: false })} />
              </FormControl>

              <Button variant='contained' type='submit' onClick={handleSubmit((data)=>edit_fn(id,data))}>Edit</Button>
            </form>
          </Box>
        </Modal>
      </div>


    </>
  );
}
