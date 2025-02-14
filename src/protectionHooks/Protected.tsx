'use client';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';

const Protected = ({ children }: { children: React.ReactNode }) => {
    const [isLoading, setIsLoading] = useState(true); // New loading state
    const [authenticated, setAuthenticated] = useState(false);
    const router = useRouter();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            toast.error('You are not authenticated');
            router.push('/login');
        } else {
            setAuthenticated(true);
        }
        setIsLoading(false); // Set loading to false after check
    }, [router]);

    if (isLoading) {
        return <div>Loading...</div>; // Show a loading state
    }

    if (!authenticated) {
        return (
            <>
                <ToastContainer />
            </>
        );
    }

    return (
        <>
            <ToastContainer />
            {children}
        </>
    );
};

export default Protected;
