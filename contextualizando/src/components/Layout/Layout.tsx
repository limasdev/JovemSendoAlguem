import { Outlet, NavLink } from 'react-router-dom';
import { LayoutDashboard, PieChart, Wallet, ArrowRightLeft, Settings, Bell } from 'lucide-react';
import './Layout.css';

export function Layout() {
    return (
        <div className="layout-container">
            <header className="top-navbar">
                <div className="logo-section">
                    <div className="logo-icon">C</div>
                    <span className="logo-text">Context</span>
                </div>

                <nav className="main-nav">
                    <NavLink to="/" end className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}>
                        <LayoutDashboard size={18} />
                        Visão Geral
                    </NavLink>
                    <NavLink to="/fluxo-caixa" className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}>
                        <ArrowRightLeft size={18} />
                        Fluxo de Caixa
                    </NavLink>
                </nav>

                <div className="user-section">
                    <button className="notification-btn">
                        <Bell size={20} />
                        <span className="badge">3</span>
                    </button>
                    <div className="user-profile">
                        <div className="avatar">JD</div>
                    </div>
                </div>
            </header>

            <main className="main-content">
                <Outlet />
            </main>
        </div>
    );
}
