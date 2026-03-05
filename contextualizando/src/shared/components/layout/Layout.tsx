import { useState, useEffect } from 'react';
import { Outlet, NavLink } from 'react-router-dom';
import { LayoutDashboard, ArrowRightLeft, Receipt, Bell, Sun, Moon, Menu, X } from 'lucide-react';
import './Layout.css';

export function Layout() {
    const [theme, setTheme] = useState<'dark' | 'light'>(() => {
        return (localStorage.getItem('theme') as 'dark' | 'light') ?? 'light';
    });
    const [menuOpen, setMenuOpen] = useState(false);

    useEffect(() => {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
    }, [theme]);

    // Fechar menu ao pressionar ESC
    useEffect(() => {
        const handleEsc = (e: KeyboardEvent) => {
            if (e.key === 'Escape') setMenuOpen(false);
        };
        window.addEventListener('keydown', handleEsc);
        return () => window.removeEventListener('keydown', handleEsc);
    }, []);

    const toggleTheme = () => setTheme(t => t === 'dark' ? 'light' : 'dark');
    const closeMenu = () => setMenuOpen(false);

    return (
        <div className="ly-root">
            {/* Header - Desktop: navbar completa, Mobile: só logo */}
            <header className="ly-navbar">
                <div className="ly-navbar-inner">
                    <NavLink to="/" className="ly-logo" onClick={closeMenu}>
                        <div className="ly-logo-icon">
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                                <path d="M8 1C5 1 2.5 3.5 2.5 7c0 2.2 1.1 4 2.7 5.1L8 14l2.8-1.9C12.4 11 13.5 9.2 13.5 7 13.5 3.5 11 1 8 1z" fill="white" opacity="0.9"/>
                                <ellipse cx="8" cy="8.5" rx="2" ry="2.8" fill="rgba(0,0,0,0.3)"/>
                            </svg>
                        </div>
                        <span className="ly-logo-text">Finança<strong>S</strong></span>
                    </NavLink>

                    <nav className="ly-nav ly-nav-desktop">
                        <NavLink to="/" end className={({ isActive }) => `ly-link${isActive ? ' active' : ''}`}>
                            <LayoutDashboard size={15} />
                            <span>Visão Geral</span>
                        </NavLink>
                        <NavLink to="/fluxo-caixa" className={({ isActive }) => `ly-link${isActive ? ' active' : ''}`}>
                            <ArrowRightLeft size={15} />
                            <span>Fluxo de Caixa</span>
                        </NavLink>
                        <NavLink to="/transacoes" className={({ isActive }) => `ly-link${isActive ? ' active' : ''}`}>
                            <Receipt size={15} />
                            <span>Transações</span>
                        </NavLink>
                    </nav>

                    <div className="ly-actions ly-actions-desktop">
                        <button className="ly-theme-btn" type="button" onClick={toggleTheme} aria-label="Alternar tema">
                            {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
                        </button>
                        <button className="ly-notif-btn" type="button" aria-label="Notificações">
                            <Bell size={16} />
                            <span className="ly-badge">3</span>
                        </button>
                        <div className="ly-avatar">JD</div>
                    </div>
                </div>

                {/* Mobile hamburger button - só aparece no mobile */}
                <button 
                    className="ly-menu-btn" 
                    type="button" 
                    onClick={() => setMenuOpen(true)}
                    aria-label="Abrir menu"
                >
                    <Menu size={20} />
                </button>
            </header>

            <main className="ly-main">
                <Outlet />
            </main>

            {/* Mobile bottom navigation */}
            <nav className="ly-nav-mobile">
                <NavLink to="/" end className={({ isActive }) => `ly-link-mobile${isActive ? ' active' : ''}`}>
                    <LayoutDashboard size={22} />
                    <span>Visão Geral</span>
                </NavLink>
                <NavLink to="/fluxo-caixa" className={({ isActive }) => `ly-link-mobile${isActive ? ' active' : ''}`}>
                    <ArrowRightLeft size={22} />
                    <span>Fluxo de Caixa</span>
                </NavLink>
                <NavLink to="/transacoes" className={({ isActive }) => `ly-link-mobile${isActive ? ' active' : ''}`}>
                    <Receipt size={22} />
                    <span>Transações</span>
                </NavLink>
            </nav>

            {/* Mobile Drawer - Ações */}
            <div className={`ly-drawer-overlay ${menuOpen ? 'open' : ''}`} onClick={closeMenu} />
            <aside className={`ly-drawer ${menuOpen ? 'open' : ''}`}>
                <div className="ly-drawer-header">
                    <span className="ly-drawer-title">Configurações</span>
                    <button 
                        className="ly-drawer-close" 
                        type="button" 
                        onClick={closeMenu}
                        aria-label="Fechar menu"
                    >
                        <X size={20} />
                    </button>
                </div>
                
                {/* Ações dentro do drawer */}
                <div className="ly-drawer-actions">
                    <button className="ly-drawer-action-btn" type="button" onClick={toggleTheme}>
                        {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
                        <span>{theme === 'dark' ? 'Tema claro' : 'Tema escuro'}</span>
                    </button>
                    <button className="ly-drawer-action-btn" type="button">
                        <Bell size={20} />
                        <span>Notificações <span className="ly-drawer-badge">3</span></span>
                    </button>
                </div>
                
                <div className="ly-drawer-footer">
                    <div className="ly-drawer-user">
                        <div className="ly-drawer-avatar">JD</div>
                        <div className="ly-drawer-user-info">
                            <strong>João da Silva</strong>
                            <span>joao@email.com</span>
                        </div>
                    </div>
                </div>
            </aside>
        </div>
    );
}
