import './Dashboard.css';
import { ArrowUpRight, ArrowDownRight, TrendingUp, Percent, Building } from 'lucide-react';

export function Dashboard() {
    return (
        <div className="dashboard">
            <header className="dashboard-header">
                <h1>Modelo de Gestão Financeira - Painel de Controle</h1>
                <div className="header-actions">
                    <select className="date-select">
                        <option>Janeiro - Junho 2024</option>
                    </select>
                    <div className="period-buttons">
                        <button className="period-btn active">Últimos 30 dias</button>
                        <button className="period-btn">Este Trimestre</button>
                        <button className="period-btn">Este Ano</button>
                    </div>
                </div>
            </header>

            {/* Summary Cards */}
            <section className="summary-cards">
                <div className="card">
                    <div className="card-title">Receita Total</div>
                    <div className="card-value">R$ 745.000</div>
                    <div className="card-indicator positive">
                        <ArrowUpRight size={16} /> +12% vs. período anterior
                    </div>
                </div>
                <div className="card">
                    <div className="card-title">Despesa Total</div>
                    <div className="card-value">R$ 412.000</div>
                    <div className="card-indicator negative">
                        <ArrowDownRight size={16} /> -3% vs. período anterior
                    </div>
                </div>
                <div className="card">
                    <div className="card-title">Lucro Líquido</div>
                    <div className="card-value">R$ 333.000</div>
                    <div className="card-indicator positive">
                        <TrendingUp size={16} /> +4% vs. período anterior
                    </div>
                </div>
                <div className="card">
                    <div className="card-title">Margem de Lucro</div>
                    <div className="card-value">44,7%</div>
                    <div className="card-indicator neutral">
                        <Percent size={16} /> Margem estável
                    </div>
                </div>
                <div className="card">
                    <div className="card-title">Saldo Bancário Atual</div>
                    <div className="card-value">R$ 258.000</div>
                    <div className="card-indicator neutral">
                        <Building size={16} /> Em 3 contas
                    </div>
                </div>
            </section>

            {/* Main Charts Area */}
            <section className="dashboard-charts">
                <div className="chart-container large">
                    <h3>Fluxo de Caixa Mensal</h3>
                    <div className="iframe-placeholder">
                        {/* INSERIR IFRAME AQUI */}
                        <span>[Iframe - Gráfico de Barras]</span>
                    </div>
                </div>

                <div className="chart-container small">
                    <h3>Composição de Despesas por Categoria</h3>
                    <div className="iframe-placeholder">
                        {/* INSERIR IFRAME AQUI */}
                        <span>[Iframe - Gráfico de Pizza]</span>
                    </div>
                </div>

                <div className="chart-container large">
                    <h3>Projeção de Fluxo de Caixa</h3>
                    <div className="iframe-placeholder">
                        {/* INSERIR IFRAME AQUI */}
                        <span>[Iframe - Gráfico de Linha]</span>
                    </div>
                </div>

                <div className="chart-container small">
                    <h3>Contas a Pagar e Receber</h3>
                    <div className="table-placeholder">
                        {/* INSERIR IFRAME DA TABELA AQUI */}
                        <span>[Iframe - Tabela de Contas]</span>
                    </div>
                </div>
            </section>
        </div>
    );
}
