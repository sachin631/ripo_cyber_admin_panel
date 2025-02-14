'use client'
import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import DeleteIcon from '@mui/icons-material/Delete';
import { useQuery } from '@tanstack/react-query';
import { contact_listing } from '@/api/apiClient';
import Loader from './Loader';

function createData(
    name: string,
    calories: number,
    fat: number,
    carbs: number,
    protein: number,
) {
    return { name, calories, fat, carbs, protein };
}




export default function ContactUsForm() {
    const query=useQuery({
        queryKey:['contact_us_listing'],
        queryFn:()=>contact_listing()
    });
    
    if(query?.isLoading){
        return (
            <Loader/>
        )
    }
    const user_list=query?.data?.data?.contact_us;
    console.log(user_list, 'user_list');
    return (
        <>
                    <h1 className='text-2xl font-bold'>Contact Us</h1>

        <TableContainer component={Paper} className='overflow-y-auto overflow-x-auto max-h-[70vh]'>
            <Table sx={{ minWidth: 550 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell align='center' className='font-bold'>sr.no</TableCell>
                        <TableCell align="center" className='font-bold'>Name&nbsp;</TableCell>
                        <TableCell align="center" className='font-bold'>Email&nbsp;</TableCell>
                        <TableCell align="center" className='font-bold'>Phone_number&nbsp;</TableCell>
                        <TableCell align='center' className='font-bold'>Message</TableCell>
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
                                <TableCell align="center">{curelem?.name}</TableCell>
                                {/* <TableCell align="center">{curelem?.name}</TableCell> */}
                                <TableCell align="center">{curelem?.email}</TableCell>
                                <TableCell align="center">{curelem?.phone_number}</TableCell>
                                <TableCell align="center">{curelem?.message}</TableCell>

                            </TableRow>
                        )
                    })}

                </TableBody>
            </Table>
        </TableContainer>
        </>
    );
}
