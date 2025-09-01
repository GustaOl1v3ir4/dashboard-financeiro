import React, { useState } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts';
import './SpendingCharts.css';

const SpendingChart = ({ transactions}) => {
    const [filtro, setFiltro] = useState('renda');


    const agrupadoPorData = transactions.reduce((acumulador, atual) => {
        const data = atual.date;
        if(!acumulador[data]) {
            acumulador[data] = { date: data, renda: 0, despesa: 0 };
        }
        if(atual.type === 'renda') {
            acumulador[data].renda += atual.amount;
        } else if(atual.type === 'despesa') {
            acumulador[data].despesa += atual.amount;
        }
        return acumulador;   
    }, {});

    // Transforma o objeto em um array e calcula o saldo
    const dados = Object.values(agrupadoPorData).map(item => ({
        ...item, 
        saldo: item.renda - item.despesa,
    }))
    .sort((a, b) => new Date(a.date) - new Date(b.date)); //ordernar por data

    return (
        <div>
            <div style={{marginBottom: '1rem'}}>
                <button onClick={() => setFiltro('renda')}>Renda</button>
                <button onClick={() => setFiltro('despesa')}>Despesa</button>
                <button onClick={() => setFiltro('saldo')}>Saldo</button>
            </div>
            <LineChart width={700} height={350} data={dados}>
            <CartesianGrid stroke="#ccc" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line
                type="monotone"
                dataKey={filtro}
                stroke={
                    filtro === 'renda'
                        ? '#4caf50'
                        : filtro === 'despesa'
                        ? '#f44336'
                        : '#2196f3'
                }
                strokeWidth={2}
             />
            </LineChart>
        </div>
    );
};

export default SpendingChart;