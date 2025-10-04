import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Toaster } from 'react-hot-toast';

const AppLayout = ({ children }) => {
    return (
        <>
            <Toaster />
            <Navbar />
            {children}
            <Footer />
        </>
    );
};

export default AppLayout;


