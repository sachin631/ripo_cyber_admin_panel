import { FormControl, Input, InputLabel, FormHelperText, Button } from '@mui/material';
import React from 'react';

const WorkTogther = () => {
    return (
        <div className="flex justify-center items-center  bg-gray-100">
            <div className="bg-white p-8 shadow-2xl rounded-lg flex flex-col gap-6 w-full sm:w-[75%] md:w-[50%] lg:w-[40%]">
            <h2 className="text-xl font-semibold text-gray-800 text-center mb-4">
                    Work Together
                </h2>
                <FormControl>
                    <InputLabel htmlFor="email-input">Email address</InputLabel>
                    <Input id="email-input" type="email" />
                    <FormHelperText id="email-helper-text">
                        We&apos;ll never share your email.
                    </FormHelperText>
                </FormControl>
                <FormControl>
                    <InputLabel htmlFor="phone-input">Phone number</InputLabel>
                    <Input id="phone-input" type="text" />
                </FormControl>
                <FormControl>
                    <InputLabel htmlFor="fb-link-input">FB Link</InputLabel>
                    <Input id="fb-link-input" type="text" />
                </FormControl>
                <FormControl>
                    <InputLabel htmlFor="twitter-link-input">Twitter Link</InputLabel>
                    <Input id="twitter-link-input" type="text" />
                </FormControl>
                <FormControl>
                    <InputLabel htmlFor="instagram-link-input">Instagram Link</InputLabel>
                    <Input id="instagram-link-input" type="text" />
                </FormControl>
                <Button variant="contained" color="primary">
                    EDIT
                </Button>
            </div>
        </div>
    );
};

export default WorkTogther;
