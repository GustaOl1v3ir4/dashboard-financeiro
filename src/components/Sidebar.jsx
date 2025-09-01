import React from 'react';
import './Sidebar.css';

function Sidebar() {
  return (
    <aside className="sidebar">
        <div sidebar-header>
            <h2>FinancePro</h2>
        </div>
        <nav className='sidebar-nav'>
            <ul>
                <li>
                    <a href="#">🏠 Dashboard</a>
                </li>
                <li>
                    <a href="#">💼 Transações</a>
                </li>
                <li>
                    <a href="#">📄 Relatórios</a>
                </li>
                <li>
                    <a href="#">⚙️ Configurações</a>
                </li>
            </ul>
        </nav>
    </aside>
    );
};
export default Sidebar;