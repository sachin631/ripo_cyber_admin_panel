'use client'
import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import DeleteIcon from '@mui/icons-material/Delete';


export default function AccordionExpandIcon({ faq_list, edit_fn, del_fn }: any) {
  console.log(faq_list, 'faq_list');
  console.log(edit_fn, 'edit_fn');
  console.log(del_fn, 'del_fn');
  return (
    <div className=''>
      {faq_list?.map((curelem: any) => {
        return (
          <div className='flex ' key={curelem?._id}>

            <Accordion className='w-[100%]'>
              <AccordionSummary
                expandIcon={<ArrowDownwardIcon />}
                aria-controls="panel1-content"
                id="panel1-header"
              >

                <Typography component="span">{curelem?.question} </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>
                  {curelem?.answer}
                </Typography>
              </AccordionDetails>

            </Accordion>
            <div className='flex justify-center items-center text-red-500 active:hover:text-blue-500' ><DeleteIcon onClick={() => del_fn(curelem?._id)}/></div>
          </div>
        )
      })}


    </div>
  );
}
