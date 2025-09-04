import { useState, useEffect } from "react";
import SummaryCards from "../components/SumaryCards";
import SpendingChart from "../components/SpendingChart";
import '../App.css';

function Dashboard() {
    const [transactions, setTransactions] = useState([]);

    useEffect(() => {
        fetch('/data.json')
            .then(response => response.json())
            .then(data => setTransactions(data))
            .catch(error => console.error("Erro ao carregar dados:", error));
    }, []);

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