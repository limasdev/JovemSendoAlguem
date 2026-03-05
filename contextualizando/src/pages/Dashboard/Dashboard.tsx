import './Dashboard.css';

export function Dashboard() {
    return (
        <div className="db-root">
            {/* Header */}
            <header className="db-header">
                <div className="db-header-left">
                    <p className="db-eyebrow">Gestão Financeira</p>
                    <h1 className="db-title">Painel de Controle</h1>
                </div>

                <div className="db-header-right">
                    <select className="db-select">
                        {[
                            'Janeiro', 'Fevereiro', 'Março', 'Abril',
                            'Maio', 'Junho', 'Julho', 'Agosto',
                            'Setembro', 'Outubro', 'Novembro', 'Dezembro',
                        ].map((m) => (
                            <option key={m}>{m} 2025</option>
                        ))}
                    </select>
                    <button className="db-pill-btn active" type="button">Últimos 30 dias</button>
                </div>
            </header>

            {/* KPI Cards */}
            <section className="db-kpis">
                {[
                    { label: 'Despesa Total',       value: 'R$ —',  sub: null },
                    { label: 'Lucro Líquido',        value: 'R$ —',  sub: null },
                    { label: 'Margem de Lucro',      value: '— %',   sub: null },
                    { label: 'Saldo Bancário Atual', value: 'R$ —',  sub: null },
                ].map(({ label, value }) => (
                    <div key={label} className="db-kpi-card">
                        <span className="db-kpi-label">{label}</span>
                        <strong className="db-kpi-value">{value}</strong>
                    </div>
                ))}
            </section>

            {/* Charts Grid */}
            <section className="db-charts">
                <div className="db-chart-card db-span-2">
                    <div className="db-chart-head">
                        <h3 className="db-chart-title">Fluxo de Caixa Mensal</h3>
                        <span className="db-chart-tag">Barras</span>
                    </div>
                    <div className="db-chart-body">
                        <div className="db-placeholder-icon">
                            <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
                                <rect x="4"  y="20" width="6" height="12" rx="2" fill="currentColor" opacity="0.3"/>
                                <rect x="13" y="12" width="6" height="20" rx="2" fill="currentColor" opacity="0.5"/>
                                <rect x="22" y="16" width="6" height="16" rx="2" fill="currentColor" opacity="0.4"/>
                                <rect x="31" y="8"  width="1" height="0"  rx="2" fill="currentColor"/>
                            </svg>
                        </div>
                        <p className="db-placeholder-text">Gráfico de Barras</p>
                        <p className="db-placeholder-hint">Insira o iframe do gráfico aqui</p>
                    </div>
                </div>

                <div className="db-chart-card">
                    <div className="db-chart-head">
                        <h3 className="db-chart-title">Composição de Despesas</h3>
                        <span className="db-chart-tag">Pizza</span>
                    </div>
                    <div className="db-chart-body">
                        <div className="db-placeholder-icon">
                            <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
                                <circle cx="18" cy="18" r="13" stroke="currentColor" strokeWidth="2" opacity="0.25"/>
                                <path d="M18 5 A13 13 0 0 1 31 18 L18 18 Z" fill="currentColor" opacity="0.45"/>
                                <path d="M18 18 L31 18 A13 13 0 0 1 18 31 Z" fill="currentColor" opacity="0.25"/>
                            </svg>
                        </div>
                        <p className="db-placeholder-text">Gráfico de Pizza</p>
                        <p className="db-placeholder-hint">Insira o iframe aqui</p>
                    </div>
                </div>

                <div className="db-chart-card db-span-2">
                    <div className="db-chart-head">
                        <h3 className="db-chart-title">Projeção de Fluxo de Caixa</h3>
                        <span className="db-chart-tag">Linha</span>
                    </div>
                    <div className="db-chart-body">
                        <div className="db-placeholder-icon">
                            <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
                                <polyline points="3,28 10,18 17,22 24,10 33,14"
                                    stroke="currentColor" strokeWidth="2.5"
                                    strokeLinecap="round" strokeLinejoin="round"
                                    fill="none" opacity="0.5"/>
                            </svg>
                        </div>
                        <p className="db-placeholder-text">Gráfico de Linha</p>
                        <p className="db-placeholder-hint">Insira o iframe do gráfico aqui</p>
                    </div>
                </div>

                <div className="db-chart-card">
                    <div className="db-chart-head">
                        <h3 className="db-chart-title">Contas a Pagar e Receber</h3>
                        <span className="db-chart-tag">Tabela</span>
                    </div>
                    <div className="db-chart-body">
                        <div className="db-placeholder-icon">
                            <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
                                <rect x="3" y="7" width="30" height="4" rx="2" fill="currentColor" opacity="0.5"/>
                                <rect x="3" y="15" width="30" height="3" rx="1.5" fill="currentColor" opacity="0.25"/>
                                <rect x="3" y="22" width="30" height="3" rx="1.5" fill="currentColor" opacity="0.25"/>
                                <rect x="3" y="29" width="18" height="3" rx="1.5" fill="currentColor" opacity="0.15"/>
                            </svg>
                        </div>
                        <p className="db-placeholder-text">Tabela de Contas</p>
                        <p className="db-placeholder-hint">Insira o iframe aqui</p>
                    </div>
                </div>
            </section>
        </div>
    );
}
