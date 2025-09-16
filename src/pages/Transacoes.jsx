import { useState, useEffect} from 'react'
import './Transacoes.css'

function Transacoes() {
    const [transactions, setTransactions] = useState([]);
    const [typeFilter, setTypeFilter] = useState('todos');
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        fetch('/data.json')
            .then(res => res.json())
            .then(data => setTransactions(data));
    }, []);

    const formatCurrency = (value) => value.toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'});
    const formatDate = (dateString) => new Date(dateString).toLocaleDateString('pt-BR', {timeZone: 'UTC' });


    //filtro para buscar todos, renda, despesa
    const filteredTransactions = transactions.filter(transaction => { 
        const typeMatch = typeFilter === 'todos' || transaction.type === typeFilter
        const searchMatch = transaction.description
        .toLowerCase() 
        .includes(searchTerm.toLowerCase()); //busca sem diferenciar letras maiusculas e minusculas
        return typeMatch && searchMatch;
    })

    return (
        <div className='transactions-page'>
            <h1>Lista de Transações</h1>
            <div className='filters-container'>
                <div className='filters-buttons'>
                    <button onClick={() => setTypeFilter('todos')} className={typeFilter === 'todos' ? 'active' : ''} >Todos</button>
                    <button onClick={() => setTypeFilter('renda')} className={typeFilter === 'renda' ? 'active' : ''} >Receitas</button>
                    <button onClick={() => setTypeFilter('despesa')} className={typeFilter === 'despesa' ? 'active' : ''} >Despesas</button>
                </div>
                <input
                type='text'
                placeholder='Buscar por descrição...'
                className='search-input'
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                />

            </div>

            <table className='transactions-table'>
                <thead>
                    <tr>
                        <th>Descrição</th>
                        <th>Valor</th>
                        <th>Categoria</th>
                        <th>Data</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredTransactions.map(transaction => (
                        <tr key={transaction.id}>
                            <td>{transaction.description}</td>
                            <td className= {transaction.type === 'renda' ? 'income' : 'expense'}>
                                {transaction.type === 'despesa' ? ' - ' : ''}
                                {formatCurrency(transaction.amount)}
                            </td>
                            <td>{transaction.category}</td>
                            <td>{formatDate(transaction.date)}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
export default Transacoes;