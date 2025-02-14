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

export default function InternShipFormTable({ user_list }: any) {
    console.log(user_list, 'prop_data list');
    return (
        <TableContainer component={Paper} className='overflow-y-auto overflow-x-auto max-h-[70vh]'>
            <Table sx={{ minWidth: 550 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell align='center' className='font-bold'>sr.no</TableCell>
                        <TableCell align='center' className='font-bold'>InternShip</TableCell>

                        <TableCell align="center" className='font-bold'>Name&nbsp;</TableCell>
                        <TableCell align="center" className='font-bold'>Email&nbsp;</TableCell>
                        <TableCell align="center" className='font-bold'>Phone_number&nbsp;</TableCell>

                    </TableRow>
                </TableHead>
                <TableBody>
                    {user_list?.map((curelem: any, index: any) => {
                        return (
                            <TableRow
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                key={index}
                            >
                                <TableCell component="th" scope="row">{index + 1}</TableCell>
                                <TableCell align="center">{curelem?.internship_details?.name}</TableCell>
                                <TableCell align="center">{curelem?.name}</TableCell>
                                <TableCell align="center">{curelem?.email}</TableCell>
                                <TableCell align="center">{curelem?.phone}</TableCell>
                            </TableRow>
                        )
                    })}

                </TableBody>
            </Table>
        </TableContainer>
    );
}
