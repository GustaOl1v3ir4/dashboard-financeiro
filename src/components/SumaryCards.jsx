import React from 'react';
import './SumaryCards.css';

const SummaryCards = ({ transactions }) => {
    const renda = transactions
    .filter(t => t.type === 'renda') //filtro para buscar apenas as transações do tipo 'renda'
    .reduce((acumulador, atual) => acumulador + atual.amount, 0);


    const despesa = transactions
    .filter(t => t.type === 'despesa')
    .reduce((acumulador, atual) => acumulador + atual.amount, 0);


    return (
        <div className="summary-cards">
            <div className="card renda">Receita: R$ {renda}</div>
            <div className="card despesa">Despesa: R$ {despesa}</div>
            <div className="card saldo">Saldo: R$ {renda - despesa}</div>
        </div>
    );
};

export default SummaryCards;