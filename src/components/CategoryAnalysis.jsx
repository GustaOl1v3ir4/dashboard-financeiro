import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import './CategoryAnalysis.css';

ChartJS.register(ArcElement, Tooltip, Legend);

function CategoryAnalysis({ transactions }) {
  // A lógica de processamento de dados, agora corrigida e unificada
  const expenses = transactions.filter(t => t.type === 'despesa');
  const totalExpenses = expenses.reduce((acc, curr) => acc + curr.amount, 0);

  const categoryTotals = expenses.reduce((acc, transaction) => {
    const { category, amount } = transaction;
    if (!acc[category]) {
      acc[category] = 0;
    }
    acc[category] += amount;
    return acc;
  }, {});

  const sortedCategories = Object.entries(categoryTotals)
    .map(([category, amount]) => {
      const numericAmount = Number(amount) || 0;
      return {
        category,
        amount: numericAmount, // Usamos o valor numérico garantido
        percentage: totalExpenses > 0 ? ((numericAmount / totalExpenses) * 100).toFixed(2) : "0.00"
      };
    })
    .sort((a, b) => b.amount - a.amount); // Ordenação numérica garantida

  // Dados para o gráfico
  const chartData = {
    labels: sortedCategories.map(c => c.category),
    datasets: [{
      data: sortedCategories.map(c => c.amount),
      backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', '#FF9F40'],
      hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', '#FF9F40']
    }]
  };

  // Opções do gráfico (com 'c' minúsculo e sem 'scales')
  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'right',
      },
      title: {
        display: true,
        text: 'Distribuição de Despesas por Categoria',
        font: { size: 16 }
      }
    }
  };

  const formatCurrency = (value) => Number(value).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

  return (
    <div className='report-module category-analysis'>
      <div className='chart-container'>
        {/* Passando as opções com 'c' minúsculo */}
        <Doughnut data={chartData} options={chartOptions} />
      </div>
      <div className='table-container'>
        <table className='category-table'>
          <thead>
            <tr>
              <th>Categoria</th>
              <th>Total Gasto</th>
              <th>% do Total</th>
            </tr>
          </thead>
          <tbody>
            {sortedCategories.map(({ category, amount, percentage }) => (
              <tr key={category}>
                <td>{category}</td>
                <td>{formatCurrency(amount)}</td>
                <td>{percentage}%</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default CategoryAnalysis;