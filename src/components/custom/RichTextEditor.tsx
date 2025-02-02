'use client'
import React, { useState, useRef, useMemo, useEffect } from 'react';
import JoditEditor from 'jodit-react';
import { Button } from '@mui/material';
import Loader from './Loader';
import { useForm } from 'react-hook-form';

const Editor = ({ query_data_aboutUs, edit_button_fn }: any) => {
    console.log(query_data_aboutUs, 'query_data_aboutUs');
    const editor = useRef(null);
    const [content, setContent] = useState('');

    useEffect(() => {
        // if (query_data_aboutUs) {
        setContent(query_data_aboutUs);
        console.log(content, 'contentcontent');
        // }
        // setContent(query_data_aboutUs)
    }, [query_data_aboutUs]);

    const onChange = (event: any) => {
        setContent(event);
    };

    const edit_button = async () => {
        await edit_button_fn({
            about_us: content
        });
    }
    console.log(content, 'content..');
    return (
        <>
            <div className='overflow-x-auto max-h-[70vh] scrollbar-hide'>
                <JoditEditor
                    ref={editor}
                    value={content}
                    // config={config}
                    // tabIndex={1} // tabIndex of textarea
                    // onBlur={newContent => setContent(newContent)} // preferred to use only this option to update the content for performance reasons
                    onChange={(event) => onChange(event)}
                />
            </div>
            <Button variant='contained' className='shadow-2xl mt-6' onClick={edit_button}>EDIT</Button>
        </>

    );
};
export default Editor;