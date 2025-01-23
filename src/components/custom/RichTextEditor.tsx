'use client'
import React, { useState, useRef, useMemo } from 'react';
import JoditEditor from 'jodit-react';
import { Button } from '@mui/material';
import Loader from './Loader';

const Editor = ({ query_data, isLoading }:any) => {
    const editor = useRef(null);
    const [content, setContent] = useState('');

    if(isLoading){
        return <Loader/>
    }
    
    return (
        <div>
            <JoditEditor
                ref={editor}
                value={content}
                // config={config}
                // tabIndex={1} // tabIndex of textarea
                onBlur={newContent => setContent(newContent)} // preferred to use only this option to update the content for performance reasons
                onChange={newContent => { }}
            />
            <Button variant='contained' className='shadow-2xl mt-6'>EDIT</Button>
        </div>

    );
};
export default Editor;