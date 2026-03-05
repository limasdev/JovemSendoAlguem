import { Outlet, NavLink } from 'react-router-dom';
import { LayoutDashboard, ArrowRightLeft, Bell } from 'lucide-react';
import './Layout.css';

export function Layout() {
    return (
        <div className="ly-root">
            <header className="ly-navbar">
                <div className="ly-logo">
                    <div className="ly-logo-icon">C</div>
                    <span className="ly-logo-text">Context</span>
                </div>

                <nav className="ly-nav">
                    <NavLink to="/" end className={({ isActive }) => `ly-link${isActive ? ' active' : ''}`}>
                        <LayoutDashboard size={16} />
                        Visão Geral
                    </NavLink>
                    <NavLink to="/fluxo-caixa" className={({ isActive }) => `ly-link${isActive ? ' active' : ''}`}>
                        <ArrowRightLeft size={16} />
                        Fluxo de Caixa
                    </NavLink>
                </nav>

                <div className="ly-actions">
                    <button className="ly-notif-btn" type="button" aria-label="Notificações">
                        <Bell size={18} />
                        <span className="ly-badge">3</span>
                    </button>
                    <div className="ly-avatar">JD</div>
                </div>
            </header>

            <main className="ly-main">
                <Outlet />
            </main>
        </div>
    );
}
