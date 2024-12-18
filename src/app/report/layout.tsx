import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import React from 'react';
import { AutoComplete } from 'antd';
import type { AutoCompleteProps } from 'antd';
    
export default function Layout({
    children,

}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <>
            {children}
            <Footer />
        </>

    );
}
