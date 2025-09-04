import Sidebar from './Sidebar';
import { Outlet } from 'react-router-dom';
import './Layout.css';

function Layout() {
    return (
        <div className="app-layout">
            <Sidebar />
            <main className="content-area">
                <Outlet /> {/* renderizar as páginas*/}
            </main>
        </div>
    );
};

export default Layout;