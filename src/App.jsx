import { useState, useEffect } from "react";
import Header from "./components/Header";   
import SummaryCards from "./components/SumaryCards";
import SpendingChart from "./components/SpendingChart";
import Sidebar from "./components/Sidebar";
import './App.css';

function App() {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    fetch('data.json')
      .then(response => response.json())
      .then(data => {
        console.log("Dados carregados:", data);
        setTransactions(data);
      })
      .catch(error => console.error("Erro ao carregar dados:", error))
  }, []);
  return (
    <div className="app-container">
      <Sidebar />
      <div className="main-content">
        <Header />
        <h1>Meu Dashboard Financeiro</h1>
        <p>Total de transações carregadas: {transactions.length}</p>

        <SummaryCards transactions={transactions} />

        <SpendingChart transactions={transactions} />
    </div>
    
    </div>
  )
}

export default App