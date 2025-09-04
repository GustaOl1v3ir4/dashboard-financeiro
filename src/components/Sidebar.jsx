
import { Link } from 'react-router-dom'; 
import { FaHome, FaWallet, FaChartBar, FaCog } from 'react-icons/fa';
import './Sidebar.css';

function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <h2>FinancePro</h2>
      </div>
      <nav className="sidebar-nav">
        <ul>
          <li>
            <Link to="/"><FaHome /> Dashboard</Link>
          </li>
          <li>
            <Link to="/transacoes"><FaWallet /> Transações</Link>
          </li>
          <li>
            <Link to="/relatorios"><FaChartBar /> Relatórios</Link>
          </li>
          <li>
            <Link to="/configuracoes"><FaCog /> Configurações</Link>
          </li>
        </ul>
      </nav>
    </aside>
  );
}

export default Sidebar;