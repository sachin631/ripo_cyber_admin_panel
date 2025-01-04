import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import DeleteIcon from '@mui/icons-material/Delete';

function createData(
    name: string,
    calories: number,
    fat: number,
    carbs: number,
    protein: number,
) {
    return { name, calories, fat, carbs, protein };
}

// const rows = [
//   createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
//   createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
//   createData('Eclair', 262, 16.0, 24, 6.0),
//   createData('Cupcake', 305, 3.7, 67, 4.3),
//   createData('Gingerbread', 356, 16.0, 49, 3.9),
// ];

export default function BasicTable() {
    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 550 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell className='font-bold'>sr.no</TableCell>
                        <TableCell align="right" className='font-bold'>image&nbsp;</TableCell>
                        <TableCell align="right" className='font-bold'>Name</TableCell>
                        <TableCell align="right" className='font-bold'>Email&nbsp;</TableCell>
                        <TableCell align="right" className='font-bold'>Phone_number&nbsp;</TableCell>
                        <TableCell align="right" className='font-bold'>Action&nbsp;</TableCell>
                       
                    </TableRow>
                </TableHead>
                <TableBody>
                   
                    <TableRow
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                        <TableCell component="th" scope="row">1</TableCell>
                        <TableCell align="right">image</TableCell>
                        <TableCell align="right">sachin sangwan</TableCell>
                        <TableCell align="right">sangwansachin631@gmail.com</TableCell>
                        <TableCell align="right">8053081201</TableCell>
                        <TableCell align="right" className='text-red-500 active:text-red-400'><DeleteIcon/></TableCell>
                    </TableRow>

                    <TableRow
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                        <TableCell component="th" scope="row">1</TableCell>
                        <TableCell align="right">image</TableCell>
                        <TableCell align="right">sachin sangwan</TableCell>
                        <TableCell align="right">sangwansachin631@gmail.com</TableCell>
                        <TableCell align="right">8053081201</TableCell>
                        <TableCell align="right" className='text-red-500 active:text-red-400'><DeleteIcon/></TableCell>
                    </TableRow>
                    
                    <TableRow
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                        <TableCell component="th" scope="row">1</TableCell>
                        <TableCell align="right">image</TableCell>
                        <TableCell align="right">sachin sangwan</TableCell>
                        <TableCell align="right">sangwansachin631@gmail.com</TableCell>
                        <TableCell align="right">8053081201</TableCell>
                        <TableCell align="right" className='text-red-500 active:text-red-400'><DeleteIcon/></TableCell>
                    </TableRow>

                </TableBody>
            </Table>
        </TableContainer>
    );
}
