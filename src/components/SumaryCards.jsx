import React from 'react';
import './SumaryCards.css';

const SummaryCards = ({ transactions }) => {
    const renda = transactions
    .filter(t => t.type === 'renda') //filtro para buscar apenas as transações do tipo 'renda'
    .reduce((acumulador, atual) => acumulador + atual.amount, 0);


    const despesa = transactions
    .filter(t => t.type === 'despesa')
    .reduce((acumulador, atual) => acumulador + atual.amount, 0);

    const saldo = renda - despesa;

    const FormatarMoeda = (value) => {
        return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    };


    return (
        <div className="summary-cards">
            <div className="card renda">
                <h3>Receitas</h3>
                <p>{FormatarMoeda(renda)}</p>
            </div>
            <div className="card despesa">
                <h3>Despesas</h3>
                <p>{FormatarMoeda(despesa)}</p>
            </div>
            <div className="card saldo">
                <h3>Saldo</h3>
                <p>{FormatarMoeda(saldo)}</p>
            </div>
        </div>
    );
};

export default SummaryCards;