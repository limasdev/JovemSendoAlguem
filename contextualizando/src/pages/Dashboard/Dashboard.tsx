import './Dashboard.css';
import { ArrowUpRight, ArrowDownRight, TrendingUp, Percent, Building } from 'lucide-react';

export function Dashboard() {
    return (
        <div className="dashboard">
            <header className="dashboard-header">
                <h1>Modelo de Gestão Financeira - Painel de Controle</h1>
                <div className="header-actions">
                    <select className="date-select">
                        <option>Janeiro 2025</option>
                        <option>Fevereiro 2025</option>
                        <option>Março 2025</option>
                        <option>Abril 2025</option>
                        <option>Maio 2025</option>
                        <option>Junho 2025</option>
                        <option>Julho 2025</option>
                        <option>Agosto 2025</option>
                        <option>Setembro 2025</option>
                        <option>Outubro 2025</option>
                        <option>Novembro 2025</option>
                        <option>Dezembro 2025</option>
                    </select>
                    <div className="period-buttons">
                        <button className="period-btn active">Últimos 30 dias</button>
                    </div>
                </div>
            </header>

            {/* Summary Cards */}
            <section className="summary-cards">
                <div className="card">
                    <div className="card-title">Despesa Total</div>
                    <div className="card-value">R$ 000</div> 
                </div>
                <div className="card">
                    <div className="card-title">Lucro Líquido</div>
                    <div className="card-value">R$ 000</div>
                </div>
                <div className="card">
                    <div className="card-title">Margem de Lucro</div>
                    <div className="card-value"> %</div>
                </div>
                <div className="card">
                    <div className="card-title">Saldo Bancário Atual</div>
                    <div className="card-value">R$ 0</div>
                </div>
            </section>

            {/* Main Charts Area */}
            <section className="dashboard-charts">
                <div className="chart-container large">
                    <h3>Fluxo de Caixa Mensal</h3>
                    <div className="iframe-placeholder">
                        {/* INSERIR IFRAME AQUI */}
                        <span>[Gráfico de Barras]</span>
                    </div>
                </div>

                <div className="chart-container small">
                    <h3>Composição de Despesas por Categoria</h3>
                    <div className="iframe-placeholder">
                        {/* INSERIR IFRAME AQUI */}
                        <span>[Gráfico de Pizza]</span>
                    </div>
                </div>

                <div className="chart-container large">
                    <h3>Projeção de Fluxo de Caixa</h3>
                    <div className="iframe-placeholder">
                        {/* INSERIR IFRAME AQUI */}
                        <span>[Gráfico de Linha]</span>
                    </div>
                </div>

                <div className="chart-container small">
                    <h3>Contas a Pagar e Receber</h3>
                    <div className="table-placeholder">
                        {/* INSERIR IFRAME DA TABELA AQUI */}
                        <span>[Tabela de Contas]</span>
                    </div>
                </div>
            </section>
        </div>
    );
}
