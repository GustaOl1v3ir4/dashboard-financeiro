import { useOutletContext } from "react-router-dom"
import './Relatorios.css'
import EvolutionChart from "../components/EvolutionChart"
import CategoryAnalysis from "../components/CategoryAnalysis"



function Relatorios() {
    const { transactions} = useOutletContext()

    console.log('1. Dados recebidos na página Relatorios:', transactions);

    if(!transactions || transactions.length === 0){
        return <h2>Carregando dados para os relatórios...</h2>
    }

    return (
        <div className="reports-page">
            <h1>Relatórios Finaceiros</h1>
            <div className="reports-grid ">
                <EvolutionChart transactions={transactions} />
                <CategoryAnalysis transactions={transactions} />
                <div className="report-module">Módulo 2 </div>
            </div>
        </div>
    )


}
export default Relatorios