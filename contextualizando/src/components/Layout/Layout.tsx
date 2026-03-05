import { useState, useEffect } from 'react';
import { Outlet, NavLink } from 'react-router-dom';
import { LayoutDashboard, ArrowRightLeft, Bell, Sun, Moon } from 'lucide-react';
import './Layout.css';

export function Layout() {
    const [theme, setTheme] = useState<'dark' | 'light'>(() => {
        return (localStorage.getItem('theme') as 'dark' | 'light') ?? 'dark';
    });

    useEffect(() => {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
    }, [theme]);

    const toggleTheme = () => setTheme(t => t === 'dark' ? 'light' : 'dark');

    return (
        <div className="ly-root">
            <header className="ly-navbar">
                <NavLink to="/" className="ly-logo">
                    <div className="ly-logo-icon">
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                            <path d="M8 1C5 1 2.5 3.5 2.5 7c0 2.2 1.1 4 2.7 5.1L8 14l2.8-1.9C12.4 11 13.5 9.2 13.5 7 13.5 3.5 11 1 8 1z" fill="white" opacity="0.9"/>
                            <ellipse cx="8" cy="8.5" rx="2" ry="2.8" fill="rgba(0,0,0,0.3)"/>
                        </svg>
                    </div>
                    <span className="ly-logo-text">Finança<strong>S</strong></span>
                </NavLink>

                <nav className="ly-nav">
                    <NavLink to="/" end className={({ isActive }) => `ly-link${isActive ? ' active' : ''}`}>
                        <LayoutDashboard size={15} />
                        <span>Visão Geral</span>
                    </NavLink>
                    <NavLink to="/fluxo-caixa" className={({ isActive }) => `ly-link${isActive ? ' active' : ''}`}>
                        <ArrowRightLeft size={15} />
                        <span>Fluxo de Caixa</span>
                    </NavLink>
                </nav>

                <div className="ly-actions">
                    <button className="ly-theme-btn" type="button" onClick={toggleTheme} aria-label="Alternar tema">
                        {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
                    </button>
                    <button className="ly-notif-btn" type="button" aria-label="Notificações">
                        <Bell size={16} />
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