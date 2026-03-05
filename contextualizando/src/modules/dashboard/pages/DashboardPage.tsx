import './DashboardPage.css';
import React, { useState } from 'react';
import type { Transaction } from '../../../shared/types';
import { formatBRL } from '../../../shared/types';
import { Table, PieChart, BarChart3 } from 'lucide-react';

interface DashboardProps {
  transactions: Transaction[];
}

export function Dashboard({ transactions }: DashboardProps) {
  // View modes for cards
  const [recentView, setRecentView] = useState<'table' | 'pie'>('table');
  const [categoryView, setCategoryView] = useState<'bars' | 'pie'>('bars');
  const [statusView, setStatusView] = useState<'list' | 'donut'>('list');

  // Calculate metrics from real transactions
  const totalEntradas = transactions
    .filter(t => t.type === 'entrada')
    .reduce((acc, t) => acc + t.amount, 0);
  
  const totalSaidas = transactions
    .filter(t => t.type === 'saida')
    .reduce((acc, t) => acc + t.amount, 0);
  
  const saldo = totalEntradas - totalSaidas;
  
  const taxaEconomia = totalEntradas > 0 
    ? ((totalEntradas - totalSaidas) / totalEntradas * 100).toFixed(1)
    : '0';

  // Get recent transactions (last 5)
  const recentTransactions = transactions.slice(0, 5);

  // Calculate additional metrics
  // 1. Biggest expense
  const saidas = transactions.filter(t => t.type === 'saida');
  const maiorGasto = saidas.length > 0 
    ? Math.max(...saidas.map(t => t.amount))
    : 0;
  const categoriaMaiorGasto = saidas.find(t => t.amount === maiorGasto)?.category || '-';

  // 2. Daily average spending
  const uniqueDates = new Set(transactions.map(t => t.date)).size;
  const mediaDiariaGastos = uniqueDates > 0 
    ? totalSaidas / uniqueDates 
    : 0;

  // 3. Pending transactions
  const pendentes = transactions.filter(t => t.status === 'pendente');
  const totalPendentes = pendentes.length;
  const valorPendentes = pendentes.reduce((acc, t) => acc + t.amount, 0);

  // 4. Scheduled transactions (agendado)
  const agendados = transactions.filter(t => t.status === 'agendado');
  const totalAgendados = agendados.length;
  const valorAgendadoEntradas = agendados.filter(t => t.type === 'entrada').reduce((acc, t) => acc + t.amount, 0);
  const valorAgendadoSaidas = agendados.filter(t => t.type === 'saida').reduce((acc, t) => acc + t.amount, 0);

  // 5. Top spending category
  const gastosPorCategoria = saidas.reduce((acc, t) => {
    acc[t.category] = (acc[t.category] || 0) + t.amount;
    return acc;
  }, {} as Record<string, number>);
  const categoriaTop = Object.entries(gastosPorCategoria)
    .sort(([,a], [,b]) => b - a)[0];

  return (
    <div className="db-root">
      {/* Header */}
      <header className="db-header">
        <div className="db-header-left">
          <p className="db-eyebrow">Gestão Financeira</p>
          <h1 className="db-title">DASHBOARD</h1>
        </div>

        <div className="db-header-right">
          <span className="db-chip">
            {transactions.length} transações
          </span>
        </div>
      </header>

      {/* KPI Cards - Row 1: Main Metrics */}
      <section className="db-kpis">
        <div className="db-kpi-card pos">
          <span className="db-kpi-label">Renda do mês</span>
          <strong className="db-kpi-value">{formatBRL(totalEntradas)}</strong>
        </div>
        <div className="db-kpi-card neg">
          <span className="db-kpi-label">Total de Gastos</span>
          <strong className="db-kpi-value">{formatBRL(totalSaidas)}</strong>
        </div>
        <div className="db-kpi-card">
          <span className="db-kpi-label">Taxa de Economia</span>
          <strong className="db-kpi-value">{taxaEconomia}%</strong>
        </div>
        <div className={`db-kpi-card ${saldo >= 0 ? 'pos' : 'neg'}`}>
          <span className="db-kpi-label">Saldo Atual</span>
          <strong className="db-kpi-value">{formatBRL(saldo)}</strong>
        </div>
      </section>

      {/* KPI Cards - Row 2: Additional Metrics */}
      <section className="db-kpis" style={{ marginTop: '12px' }}>
        <div className="db-kpi-card neg">
          <span className="db-kpi-label">Maior Gasto</span>
          <strong className="db-kpi-value">{formatBRL(maiorGasto)}</strong>
          <span className="db-kpi-sub">{categoriaMaiorGasto}</span>
        </div>
        <div className="db-kpi-card">
          <span className="db-kpi-label">Média Diária</span>
          <strong className="db-kpi-value">{formatBRL(mediaDiariaGastos)}</strong>
          <span className="db-kpi-sub">gastos/dia</span>
        </div>
        <div className="db-kpi-card warning">
          <span className="db-kpi-label">Pendentes</span>
          <strong className="db-kpi-value">{totalPendentes}</strong>
          <span className="db-kpi-sub">{formatBRL(valorPendentes)}</span>
        </div>
        <div className="db-kpi-card info">
          <span className="db-kpi-label">Agendados</span>
          <strong className="db-kpi-value">{totalAgendados}</strong>
          <span className="db-kpi-sub">+{formatBRL(valorAgendadoEntradas)} / -{formatBRL(valorAgendadoSaidas)}</span>
        </div>
      </section>

      {/* Quick Stat: Top Category */}
      {categoriaTop && (
        <section className="db-quick-stat">
          <div className="db-quick-stat-content">
            <span className="db-quick-label">Categoria com mais gastos:</span>
            <span className="db-quick-value">{categoriaTop[0]}</span>
            <span className="db-quick-amount">{formatBRL(categoriaTop[1])}</span>
          </div>
        </section>
      )}

      {/* Charts Grid */}
      <section className="db-charts">
        {/* Recent Transactions */}
        <div className="db-chart-card db-span-2">
          <div className="db-chart-head">
            <h3 className="db-chart-title">Transações Recentes</h3>
            <div className="db-chart-actions">
              <button 
                className={`db-mini-btn ${recentView === 'table' ? 'active' : ''}`}
                onClick={() => setRecentView('table')}
                title="Tabela"
              >
                <Table size={14} />
              </button>
              <button 
                className={`db-mini-btn ${recentView === 'pie' ? 'active' : ''}`}
                onClick={() => setRecentView('pie')}
                title="Gráfico Pizza"
              >
                <PieChart size={14} />
              </button>
            </div>
          </div>
          <div className="db-chart-body" style={{ padding: 0 }}>
            {recentTransactions.length === 0 ? (
              <div className="db-empty">
                <p>Nenhuma transação ainda</p>
              </div>
            ) : recentView === 'table' ? (
              <table className="db-table">
                <thead>
                  <tr>
                    <th>Data</th>
                    <th>Descrição</th>
                    <th>Categoria</th>
                    <th>Valor</th>
                  </tr>
                </thead>
                <tbody>
                  {recentTransactions.map((t) => (
                    <tr key={t.id} className={t.type}>
                      <td>{t.date}</td>
                      <td>{t.description}</td>
                      <td>{t.category}</td>
                      <td className={t.type === 'entrada' ? 'pos' : 'neg'}>
                        {t.type === 'entrada' ? '+' : '-'} {formatBRL(t.amount)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <div className="db-pie-chart">
                {(() => {
                  const entradaTotal = recentTransactions.filter(t => t.type === 'entrada').reduce((a, t) => a + t.amount, 0);
                  const saidaTotal = recentTransactions.filter(t => t.type === 'saida').reduce((a, t) => a + t.amount, 0);
                  const total = entradaTotal + saidaTotal;
                  if (total === 0) return <div className="db-empty"><p>Sem dados</p></div>;
                  
                  return (
                    <div className="db-pie-container">
                      <svg viewBox="0 0 100 100" className="db-pie-svg">
                        <circle cx="50" cy="50" r="40" fill="none" stroke="var(--green)" strokeWidth="20" 
                          strokeDasharray={`${(entradaTotal / total) * 251.2} 251.2`} transform="rotate(-90 50 50)" />
                        <circle cx="50" cy="50" r="40" fill="none" stroke="var(--red)" strokeWidth="20" 
                          strokeDasharray={`${(saidaTotal / total) * 251.2} 251.2`} 
                          strokeDashoffset={`-${(entradaTotal / total) * 251.2}`}
                          transform="rotate(-90 50 50)" />
                      </svg>
                      <div className="db-pie-legend">
                        <div className="db-pie-item">
                          <span className="db-pie-dot" style={{ background: 'var(--green)' }} />
                          <span>Entradas {Math.round((entradaTotal/total)*100)}%</span>
                        </div>
                        <div className="db-pie-item">
                          <span className="db-pie-dot" style={{ background: 'var(--red)' }} />
                          <span>Saídas {Math.round((saidaTotal/total)*100)}%</span>
                        </div>
                      </div>
                    </div>
                  );
                })()}
              </div>
            )}
          </div>
        </div>

        {/* Summary by Category */}
        <div className="db-chart-card">
          <div className="db-chart-head">
            <h3 className="db-chart-title">Gastos por Categoria</h3>
            <div className="db-chart-actions">
              <button 
                className={`db-mini-btn ${categoryView === 'bars' ? 'active' : ''}`}
                onClick={() => setCategoryView('bars')}
                title="Barras"
              >
                <BarChart3 size={14} />
              </button>
              <button 
                className={`db-mini-btn ${categoryView === 'pie' ? 'active' : ''}`}
                onClick={() => setCategoryView('pie')}
                title="Pizza"
              >
                <PieChart size={14} />
              </button>
            </div>
          </div>
          <div className="db-chart-body">
            {(() => {
              const categoryTotals = transactions
                .filter(t => t.type === 'saida')
                .reduce((acc, t) => {
                  acc[t.category] = (acc[t.category] || 0) + t.amount;
                  return acc;
                }, {} as Record<string, number>);
              
              const sorted = Object.entries(categoryTotals)
                .sort(([, a]: [string, number], [, b]: [string, number]) => b - a)
                .slice(0, 5);
              
              if (sorted.length === 0) {
                return (
                  <div className="db-empty">
                    <p>Sem gastos registrados</p>
                  </div>
                );
              }
              
              if (categoryView === 'bars') {
                const max = sorted[0][1];
                return (
                  <div className="db-bars">
                    {sorted.map(([cat, val]: [string, number]) => (
                      <div key={cat} className="db-bar-row">
                        <span className="db-bar-label">{cat}</span>
                        <div className="db-bar-track">
                          <div 
                            className="db-bar-fill" 
                            style={{ width: `${((val as number) / (max as number)) * 100}%` }}
                          />
                        </div>
                        <span className="db-bar-value">{formatBRL(val as number)}</span>
                      </div>
                    ))}
                  </div>
                );
              } else {
                const total = sorted.reduce((acc, [, val]) => acc + (val as number), 0);
                return (
                  <div className="db-pie-chart">
                    <div className="db-pie-container">
                      <svg viewBox="0 0 100 100" className="db-pie-svg">
                        {sorted.reduce((acc, [cat, val], i) => {
                          const prevOffset = acc.offset;
                          const percentage = ((val as number) / total) * 100;
                          const colors = ['var(--red)', 'var(--amber)', 'var(--accent)', '#8b5cf6', '#ec4899'];
                          acc.elements.push(
                            <circle 
                              key={cat}
                              cx="50" cy="50" r="40" fill="none" 
                              stroke={colors[i % colors.length]} 
                              strokeWidth="20"
                              strokeDasharray={`${(percentage / 100) * 251.2} 251.2`}
                              strokeDashoffset={-prevOffset}
                              transform="rotate(-90 50 50)"
                            />
                          );
                          acc.offset += (percentage / 100) * 251.2;
                          return acc;
                        }, { elements: [] as React.ReactNode[], offset: 0 }).elements}
                      </svg>
                      <div className="db-pie-legend">
                        {sorted.map(([cat, val], i) => {
                          const colors = ['var(--red)', 'var(--amber)', 'var(--accent)', '#8b5cf6', '#ec4899'];
                          return (
                            <div key={cat} className="db-pie-item">
                              <span className="db-pie-dot" style={{ background: colors[i % colors.length] }} />
                              <span>{cat} {Math.round(((val as number) / total) * 100)}%</span>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                );
              }
            })()}
          </div>
        </div>

        {/* Status Summary */}
        <div className="db-chart-card">
          <div className="db-chart-head">
            <h3 className="db-chart-title">Resumo por Status</h3>
            <div className="db-chart-actions">
              <button 
                className={`db-mini-btn ${statusView === 'list' ? 'active' : ''}`}
                onClick={() => setStatusView('list')}
                title="Lista"
              >
                <Table size={14} />
              </button>
              <button 
                className={`db-mini-btn ${statusView === 'donut' ? 'active' : ''}`}
                onClick={() => setStatusView('donut')}
                title="Donut"
              >
                <PieChart size={14} />
              </button>
            </div>
          </div>
          <div className="db-chart-body">
            {(() => {
              const statusCounts = transactions.reduce((acc, t) => {
                acc[t.status] = (acc[t.status] || 0) + 1;
                return acc;
              }, {} as Record<string, number>);
              
              const statusLabels: Record<string, string> = {
                'recebido': 'Recebido',
                'pago': 'Pago',
                'pendente': 'Pendente',
                'agendado': 'Agendado'
              };
              
              const statusColors: Record<string, string> = {
                'recebido': 'var(--green)',
                'pago': 'var(--green)',
                'pendente': 'var(--amber)',
                'agendado': 'var(--accent)'
              };
              
              if (Object.keys(statusCounts).length === 0) {
                return (
                  <div className="db-empty">
                    <p>Sem dados</p>
                  </div>
                );
              }
              
              if (statusView === 'list') {
                return (
                  <div className="db-status-list">
                    {Object.entries(statusCounts).map(([status, count]: [string, number]) => (
                      <div key={status} className={`db-status-item ${status}`}>
                        <span className="db-status-dot" />
                        <span className="db-status-label">{statusLabels[status] || status}</span>
                        <span className="db-status-count">{count as number}</span>
                      </div>
                    ))}
                  </div>
                );
              } else {
                const total = Object.values(statusCounts).reduce((a, b) => a + b, 0);
                return (
                  <div className="db-pie-chart">
                    <div className="db-pie-container">
                      <svg viewBox="0 0 100 100" className="db-pie-svg">
                        {Object.entries(statusCounts).reduce((acc, [status, count]) => {
                          const prevOffset = acc.offset;
                          const percentage = ((count as number) / total) * 100;
                          acc.elements.push(
                            <circle 
                              key={status}
                              cx="50" cy="50" r="40" fill="none" 
                              stroke={statusColors[status]} 
                              strokeWidth="15"
                              strokeDasharray={`${(percentage / 100) * 251.2} 251.2`}
                              strokeDashoffset={-prevOffset}
                              transform="rotate(-90 50 50)"
                            />
                          );
                          acc.offset += (percentage / 100) * 251.2;
                          return acc;
                        }, { elements: [] as React.ReactNode[], offset: 0 }).elements}
                      </svg>
                      <div className="db-pie-legend">
                        {Object.entries(statusCounts).map(([status, count]) => (
                          <div key={status} className="db-pie-item">
                            <span className="db-pie-dot" style={{ background: statusColors[status] }} />
                            <span>{statusLabels[status]} {Math.round(((count as number) / total) * 100)}%</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                );
              }
            })()}
          </div>
        </div>

        {/* Top Entradas */}
        <div className="db-chart-card">
          <div className="db-chart-head">
            <h3 className="db-chart-title">Maiores Receitas</h3>
            <span className="db-chart-tag">Top 5</span>
          </div>
          <div className="db-chart-body">
            {(() => {
              const entradaTotals = transactions
                .filter(t => t.type === 'entrada')
                .reduce((acc, t) => {
                  acc[t.category] = (acc[t.category] || 0) + t.amount;
                  return acc;
                }, {} as Record<string, number>);
              
              const sorted = Object.entries(entradaTotals)
                .sort(([, a]: [string, number], [, b]: [string, number]) => b - a)
                .slice(0, 5);
              
              if (sorted.length === 0) {
                return (
                  <div className="db-empty">
                    <p>Sem receitas registradas</p>
                  </div>
                );
              }
              
              const max = sorted[0][1];
              
              return (
                <div className="db-bars">
                  {sorted.map(([cat, val]: [string, number]) => (
                    <div key={cat} className="db-bar-row">
                      <span className="db-bar-label">{cat}</span>
                      <div className="db-bar-track">
                        <div 
                          className="db-bar-fill" 
                          style={{ width: `${((val as number) / (max as number)) * 100}%`, background: 'var(--green)' }}
                        />
                      </div>
                      <span className="db-bar-value">{formatBRL(val as number)}</span>
                    </div>
                  ))}
                </div>
              );
            })()}
          </div>
        </div>

        {/* Status Financeiro em Valor */}
        <div className="db-chart-card">
          <div className="db-chart-head">
            <h3 className="db-chart-title">Status de Pagamento</h3>
            <span className="db-chart-tag">Em R$</span>
          </div>
          <div className="db-chart-body">
            {(() => {
              const statusValues = transactions
                .filter(t => t.type === 'saida')
                .reduce((acc, t) => {
                  acc[t.status] = (acc[t.status] || 0) + t.amount;
                  return acc;
                }, {} as Record<string, number>);
              
              const totalSaidasValue = Object.values(statusValues).reduce((a, b) => a + b, 0);
              
              if (totalSaidasValue === 0) {
                return (
                  <div className="db-empty">
                    <p>Sem dados</p>
                  </div>
                );
              }
              
              const statusLabels: Record<string, string> = {
                'pago': 'Pago',
                'pendente': 'Pendente',
                'agendado': 'Agendado'
              };
              
              const statusColors: Record<string, string> = {
                'pago': 'var(--green)',
                'pendente': 'var(--amber)',
                'agendado': 'var(--accent)'
              };
              
              return (
                <div className="db-pie-chart">
                  <div className="db-pie-container">
                    <svg viewBox="0 0 100 100" className="db-pie-svg">
                      {Object.entries(statusValues).reduce((acc, [status, val]) => {
                        const prevOffset = acc.offset;
                        const percentage = ((val as number) / totalSaidasValue) * 100;
                        acc.elements.push(
                          <circle 
                            key={status}
                            cx="50" cy="50" r="40" fill="none" 
                            stroke={statusColors[status] || 'var(--text-muted)'} 
                            strokeWidth="20"
                            strokeDasharray={`${(percentage / 100) * 251.2} 251.2`}
                            strokeDashoffset={-prevOffset}
                            transform="rotate(-90 50 50)"
                          />
                        );
                        acc.offset += (percentage / 100) * 251.2;
                        return acc;
                      }, { elements: [] as React.ReactNode[], offset: 0 }).elements}
                    </svg>
                    <div className="db-pie-legend">
                      {Object.entries(statusValues).map(([status, val]) => (
                        <div key={status} className="db-pie-item">
                          <span className="db-pie-dot" style={{ background: statusColors[status] || 'var(--text-muted)' }} />
                          <span>{statusLabels[status] || status}: {formatBRL(val as number)}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })()}
          </div>
        </div>

        {/* Evolução Mensal */}
        <div className="db-chart-card db-span-2">
          <div className="db-chart-head">
            <h3 className="db-chart-title">Evolução Mensal</h3>
            <span className="db-chart-tag">Entradas vs Saídas</span>
          </div>
          <div className="db-chart-body">
            {(() => {
              const monthlyData = transactions.reduce((acc, t) => {
                const month = t.date.substring(0, 7);
                if (!acc[month]) {
                  acc[month] = { entradas: 0, saidas: 0 };
                }
                if (t.type === 'entrada') {
                  acc[month].entradas += t.amount;
                } else {
                  acc[month].saidas += t.amount;
                }
                return acc;
              }, {} as Record<string, { entradas: number; saidas: number }>);
              
              const sortedMonths = Object.entries(monthlyData)
                .sort(([a], [b]) => a.localeCompare(b))
                .slice(-6);
              
              if (sortedMonths.length === 0) {
                return (
                  <div className="db-empty">
                    <p>Sem dados mensais</p>
                  </div>
                );
              }
              
              const maxValue = Math.max(
                ...sortedMonths.map(([, data]) => Math.max(data.entradas, data.saidas))
              );
              
              return (
                <div className="db-monthly-chart">
                  {sortedMonths.map(([month, data]) => {
                    const monthLabel = new Date(month + '-01').toLocaleDateString('pt-BR', { month: 'short', year: '2-digit' });
                    return (
                      <div key={month} className="db-monthly-item">
                        <span className="db-monthly-label">{monthLabel}</span>
                        <div className="db-monthly-bars">
                          <div className="db-monthly-bar-group">
                            <div 
                              className="db-monthly-bar entrada" 
                              style={{ height: `${(data.entradas / maxValue) * 60}px` }}
                              title={`Entradas: ${formatBRL(data.entradas)}`}
                            />
                            <div 
                              className="db-monthly-bar saida" 
                              style={{ height: `${(data.saidas / maxValue) * 60}px` }}
                              title={`Saídas: ${formatBRL(data.saidas)}`}
                            />
                          </div>
                        </div>
                        <span className="db-monthly-saldo" style={{ color: data.entradas - data.saidas >= 0 ? 'var(--green)' : 'var(--red)' }}>
                          {formatBRL(data.entradas - data.saidas)}
                        </span>
                      </div>
                    );
                  })}
                </div>
              );
            })()}
          </div>
        </div>
      </section>
    </div>
  );
}
