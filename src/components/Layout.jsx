import Sidebar from './Sidebar';
import { Outlet } from 'react-router-dom';
import './Layout.css';
import React, {useState, useEffect } from 'react'

function Layout() {

    const [transactions, setTransactions] = useState([]);

    useEffect(() => {
        fetch('/data.json')
            .then(res => res.json())
            .then(data => setTransactions(data));
    }, []);


    return (
        <div className="app-layout">
            <Sidebar />
            <main className="content-area">
                <Outlet context={{ transactions, setTransactions }}/>
            </main>
        </div>
    );
};

export default Layout;