'use client'
import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

export default function BasicSelect() {
  const [age, setAge] = React.useState('');

  const handleChange = (event: SelectChangeEvent) => {
    setAge(event.target.value as string);
  };

  return (
    <div className='text-white '>
    <Box sx={{ minWidth: 120 }} >
      <FormControl fullWidth className='border-2 border-blue-500'>
        <InputLabel id="demo-simple-select-label" >profile</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={age}
          label="profile"
          onChange={handleChange}
        >
          <MenuItem value={10}>Profile</MenuItem>
          <MenuItem value={20}>Logout</MenuItem>
        </Select>
      </FormControl>
    </Box>
    </div>
  );
}