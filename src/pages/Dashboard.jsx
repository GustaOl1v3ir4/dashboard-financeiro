import { useState, useEffect } from "react";
import SummaryCards from "../components/SumaryCards";
import SpendingChart from "../components/SpendingChart";
import '../App.css';
import { useOutletContext } from "react-router-dom";

function Dashboard() {
    

    const {transactions} = useOutletContext()

    if(transactions.length === 0) {
        return <div>Carregando dados... </div>
    }

    return (
        <div>
            <SummaryCards transactions={transactions}/>
            <SpendingChart transactions={transactions}/>
        </div>
    )
}

export default Dashboard;