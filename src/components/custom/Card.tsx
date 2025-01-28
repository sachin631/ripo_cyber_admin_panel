'use client'
import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import CardActionArea from '@mui/material/CardActionArea';
import CardActions from '@mui/material/CardActions';
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

export default function MultiActionAreaCard() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);


  return (

    <>


      <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-4 h-[70vh] overflow-y-scroll">

        {Array.from({ length: 19 }).map((_, index) => (
          <Card key={index} sx={{ maxWidth: 345 }} className="h-[45vh]">
            <CardActionArea>
              <CardMedia
                component="img"
                height="140"
                image="https://d110yui55r0n46.cloudfront.net/logo2.png"
                alt="green iguana"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  Lizard
                </Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                  Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all continents except Antarctica.
                </Typography>
              </CardContent>
            </CardActionArea>
            <CardActions>
              <Button size="small" color="primary" variant='contained' onClick={handleOpen}>
                Edit
              </Button>
              <Button size="small" variant='contained' className='bg-red-500'>
                Delete
              </Button>
            </CardActions>
          </Card>
        ))}
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


            <Button variant='contained'>Edit</Button>
          </Box>
        </Modal>
      </div>


    </>
  );
}
