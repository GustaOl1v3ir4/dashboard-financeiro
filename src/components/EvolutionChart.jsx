import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2';
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

function EvolutionChart({ transactions }) {
    const monthlyData = transactions.reduce((acc, transaction) => {
        const month = transaction.date.substring(0, 7)        
        
        if(!acc[month]){
            acc[month] = {income:0, expense:0}
        }
        if (transaction.type === 'renda') {
            acc[month].income += transaction.amount;
            } else {
            acc[month].expense += transaction.amount;
        }
        return acc;
    }, {});

    const labels = Object.keys(monthlyData).sort();

    const data = {
        labels: labels.map(label => {
            const [year, month] = label.split('-');
            return `${month}/${year}`;
        }),
        datasets: [
            {
                label: 'Receitas',
                data:labels.map(month => monthlyData[month].income),
                backgroundColor: 'rgba(75, 192, 192, 0.6)',
            },
            {
                label: 'Despesas',
                data:labels.map(month => monthlyData[month].expense),
                backgroundColor: 'rgba(255, 99, 132, 0.6)',
            },
        ],
    };

    const chartOptions = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'Evolução Mensal de Receitas e Despesas',
                font: {
                    size: 16
                    
                }
            },
        },
        scales: {
            y: {
                beginAtZero: true,
            }
        }
    };

    return (
        <div className='report-module'>
            <Bar data={data} options={chartOptions} />
        </div>
    );
}

export default EvolutionChart;





    

