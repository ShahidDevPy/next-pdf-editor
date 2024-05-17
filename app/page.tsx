// /pages/index.tsx
"use client"; // Ensure this is a client component

import React from 'react';
import dynamic from 'next/dynamic';

// Dynamically import EditText component to avoid SSR issues
const EditText = dynamic(() => import('./components/EditText'), {ssr: false});

const Home = () => {

    return (
        <div>
            <h1>Review Evidence</h1>

            <EditText/>
        </div>
    );
};

export default Home;
