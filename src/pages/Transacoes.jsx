import { useState, useEffect} from 'react'
import './Transacoes.css'
import Modal from 'react-modal';
import { useOutletContext } from 'react-router-dom';

Modal.setAppElement('#root')

function Transacoes() {
    
    const {transactions, setTransactions} = useOutletContext()

    const [typeFilter, setTypeFilter] = useState('todos');
    const [searchTerm, setSearchTerm] = useState('');
    const [modalIsOpen, setModalIsOpen] = useState(false)
    const [newTransaction, setNewTransaction] = useState({
        description: '',
        amount: '',
        type: 'despesa',
        category: '',
        date: ''
    });

    function openModal(){
        setModalIsOpen(true)
    }
    function closeModal(){
        setModalIsOpen(false)
        setNewTransaction({
            description: '', amount: '', type: 'despesa', category:'', date:''
        });
    }

    function handleInputChange(event) {
        const { name, value } = event.target
        setNewTransaction(prevState => ({
            ...prevState, // copiar tudo que já existe
            [name]: value // atualizar somente o name
        }));
    }    
    
    function handleFormSubmit(event){
        event.preventDefault();
        if(!newTransaction.description || !newTransaction.amount || !newTransaction.date   ){
            alert("Por favor, preencha todos os campos obrigatórios.");
            return;
        }

        const transactionToAdd = {
            ...newTransaction,
            id: new Date().getTime().toString(),
            amount: parseFloat(newTransaction.amount)
        };

        setTransactions(prevTransactions => [
            transactionToAdd, 
            ...prevTransactions
        ]);

        closeModal();

    }

    

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
            <div className='header-container'>
            <h1>Lista de Transações</h1>
            <button className='add-transaction-button' onClick={openModal}>+ Nova Transação</button>
            </div>


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
            
            <Modal 
            isOpen={modalIsOpen}
            onRequestClose={closeModal}
            contentLabel='Adicionar Nova Transação'
            className="modal"
            overlayClassName="overlay"
            >
                <h2>Adicionar Nova Transação</h2>
                <form onSubmit={handleFormSubmit}>
                    <input type='text' name='description' placeholder='Descrição' value={newTransaction.description} onChange={handleInputChange} required />
                    <input type='number' name='amount' placeholder='Valor' value={newTransaction.amount} onChange={handleInputChange} required step="0.01"/>
                    <select name='type' placeholder='Selecione o tipo de transação' value={newTransaction.type} onChange={handleInputChange} >
                        <option value="despesa">Despesa</option>
                        <option value="renda">Receita</option>
                    </select>
                    <input type='text' name='category' placeholder='Categoria' value={newTransaction.value} onChange={handleInputChange}/>
                    <input type='date' name='date' value={newTransaction.date} onChange={handleInputChange} />
                    <div className='modal-buttons'>
                        <button type='submit' className='button-save'>Salvar</button>
                        <button type='button' className='button-cancel' onClick={closeModal}>Cancelar</button>
                    </div>
                </form>
            </Modal>

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