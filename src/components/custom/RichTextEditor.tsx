'use client'
import React, { useState, useRef, useMemo } from 'react';
import JoditEditor from 'jodit-react';
import { Button } from '@mui/material';

const Editor = ({ placeholder }: any) => {
    const editor = useRef(null);
    const [content, setContent] = useState('');

    const config: any = useMemo(() => ({
        readonly: false, // all options from https://xdsoft.net/jodit/docs/,
        placeholder: placeholder || 'Start typings...'
    }), [placeholder]);

    return (
        <div>
            <JoditEditor
                ref={editor}
                value={content}
                config={config}
                // tabIndex={1} // tabIndex of textarea
                onBlur={newContent => setContent(newContent)} // preferred to use only this option to update the content for performance reasons
                onChange={newContent => { }}
            />
            <Button variant='contained' className='shadow-2xl mt-6'>EDIT</Button>
        </div>

    );
};
export default Editor;