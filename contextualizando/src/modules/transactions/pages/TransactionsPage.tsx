import { useState, useMemo } from "react";
import type { Transaction } from "../../fluxo-caixa/constants";
import {
  CATEGORY_ICONS,
  PAYMENT_METHODS,
  STATUS_CONFIG,
  /* ENTRADA_CATEGORIES,
  SAIDA_CATEGORIES,*/
  formatBRL,
  formatDateBR,
} from "../../fluxo-caixa/constants";
import { Search, Filter, X, ArrowLeftRight } from "lucide-react";
import "./TransactionsPage.css";

interface TransactionsPageProps {
  transactions: Transaction[];
  onRemoveTransaction: (id: string) => void;
}

export function TransactionsPage({ transactions, onRemoveTransaction }: TransactionsPageProps) {
  // Search and filter states
  const [searchTerm, setSearchTerm] = useState("");
  const [typeFilter, setTypeFilter] = useState<"todos" | "entrada" | "saida">("todos");
  const [categoryFilter, setCategoryFilter] = useState<string>("todas");
  const [statusFilter, setStatusFilter] = useState<string>("todos");
  const [showFilters, setShowFilters] = useState(false);

  // Get unique categories from transactions
  const availableCategories = useMemo(() => {
    const cats = new Set(transactions.map((t) => t.category));
    return Array.from(cats).sort();
  }, [transactions]);

  // Filter transactions
  const filteredTransactions = useMemo(() => {
    return transactions.filter((t) => {
      // Search filter
      const matchesSearch =
        searchTerm === "" ||
        t.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        t.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
        t.paymentMethod.toLowerCase().includes(searchTerm.toLowerCase());

      // Type filter
      const matchesType = typeFilter === "todos" || t.type === typeFilter;

      // Category filter
      const matchesCategory = categoryFilter === "todas" || t.category === categoryFilter;

      // Status filter
      const matchesStatus = statusFilter === "todos" || t.status === statusFilter;

      return matchesSearch && matchesType && matchesCategory && matchesStatus;
    });
  }, [transactions, searchTerm, typeFilter, categoryFilter, statusFilter]);

  // Calculate totals based on filtered transactions
  const totalEntradas = filteredTransactions
    .filter((t) => t.type === "entrada")
    .reduce((acc, t) => acc + t.amount, 0);
  const totalSaidas = filteredTransactions
    .filter((t) => t.type === "saida")
    .reduce((acc, t) => acc + t.amount, 0);
  const balance = totalEntradas - totalSaidas;

  // Clear all filters
  const clearFilters = () => {
    setSearchTerm("");
    setTypeFilter("todos");
    setCategoryFilter("todas");
    setStatusFilter("todos");
  };

  const hasActiveFilters =
    searchTerm !== "" ||
    typeFilter !== "todos" ||
    categoryFilter !== "todas" ||
    statusFilter !== "todos";

  return (
    <div className="tx-root">
      {/* Ambient glow background */}
      <div className="tx-ambient" aria-hidden="true">
        <div className="tx-glow tx-glow-1" />
        <div className="tx-glow tx-glow-2" />
      </div>

      <div className="tx-wrap">
        {/* Header */}
        <header className="tx-header">
          <div className="tx-header-text">
            <p className="tx-eyebrow">Histórico Completo</p>
            <h1 className="tx-title">Transações</h1>
          </div>
        </header>

        {/* Search and Filter Bar */}
        <div className="tx-search-card">
          <div className="tx-search-row">
            <div className="tx-search-input-wrap">
              <Search size={18} className="tx-search-icon" />
              <input
                type="text"
                className="tx-search-input"
                placeholder="Buscar por descrição, categoria ou pagamento..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              {searchTerm && (
                <button
                  className="tx-clear-btn"
                  onClick={() => setSearchTerm("")}
                  type="button"
                >
                  <X size={14} />
                </button>
              )}
            </div>
            <button
              className={`tx-filter-toggle ${showFilters ? "active" : ""}`}
              onClick={() => setShowFilters(!showFilters)}
              type="button"
            >
              <Filter size={18} />
              <span>Filtros</span>
              {hasActiveFilters && <span className="tx-filter-badge" />}
            </button>
          </div>

          {/* Expandable Filters */}
          {showFilters && (
            <div className="tx-filters-row">
              <div className="tx-filter-group">
                <label className="tx-filter-label">Tipo</label>
                <select
                  className="tx-filter-select"
                  value={typeFilter}
                  onChange={(e) => setTypeFilter(e.target.value as typeof typeFilter)}
                >
                  <option value="todos">Todos</option>
                  <option value="entrada">Entrada</option>
                  <option value="saida">Saída</option>
                </select>
              </div>

              <div className="tx-filter-group">
                <label className="tx-filter-label">Categoria</label>
                <select
                  className="tx-filter-select"
                  value={categoryFilter}
                  onChange={(e) => setCategoryFilter(e.target.value)}
                >
                  <option value="todas">Todas</option>
                  {availableCategories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>

              <div className="tx-filter-group">
                <label className="tx-filter-label">Status</label>
                <select
                  className="tx-filter-select"
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                >
                  <option value="todos">Todos</option>
                  <option value="recebido">Recebido</option>
                  <option value="pago">Pago</option>
                  <option value="pendente">Pendente</option>
                  <option value="agendado">Agendado</option>
                </select>
              </div>

              {hasActiveFilters && (
                <button className="tx-clear-filters-btn" onClick={clearFilters} type="button">
                  <X size={14} />
                  Limpar filtros
                </button>
              )}
            </div>
          )}
        </div>

        {/* Resumo Cards */}
        <div className="tx-resumo-grid">
          <div className="tx-resumo-card pos">
            <div className="tx-resumo-icon">
              <ArrowLeftRight size={20} />
            </div>
            <div className="tx-resumo-content">
              <span className="tx-resumo-label">Total Entradas</span>
              <strong className="tx-resumo-val">{formatBRL(totalEntradas)}</strong>
            </div>
          </div>
          <div className="tx-resumo-card neg">
            <div className="tx-resumo-icon">
              <ArrowLeftRight size={20} />
            </div>
            <div className="tx-resumo-content">
              <span className="tx-resumo-label">Total Saídas</span>
              <strong className="tx-resumo-val">{formatBRL(totalSaidas)}</strong>
            </div>
          </div>
          <div className={`tx-resumo-card ${balance < 0 ? "neg" : "pos"}`}>
            <div className="tx-resumo-icon">
              <ArrowLeftRight size={20} />
            </div>
            <div className="tx-resumo-content">
              <span className="tx-resumo-label">Saldo</span>
              <strong className="tx-resumo-val">{formatBRL(balance)}</strong>
            </div>
          </div>
          <div className="tx-resumo-card neutral">
            <div className="tx-resumo-content">
              <span className="tx-resumo-label">Quantidade</span>
              <strong className="tx-resumo-val">{filteredTransactions.length}</strong>
              {filteredTransactions.length !== transactions.length && (
                <span className="tx-resumo-total">de {transactions.length}</span>
              )}
            </div>
          </div>
        </div>

        {/* Tabela de Transações */}
        <div className="tx-card">
          <div className="tx-card-header">
            <h2 className="tx-card-title">Lista de Transações</h2>
            <div className="tx-header-actions">
              {hasActiveFilters && (
                <span className="tx-filter-info">
                  {filteredTransactions.length} de {transactions.length} resultados
                </span>
              )}
              <span className="tx-chip neutral">{filteredTransactions.length} item{filteredTransactions.length !== 1 ? "s" : ""}</span>
            </div>
          </div>
          {filteredTransactions.length === 0 ? (
            <div className="tx-empty-state">
              <div className="tx-empty-icon">📊</div>
              <p>
                {hasActiveFilters
                  ? "Nenhuma transação encontrada com os filtros aplicados."
                  : "Nenhuma transação cadastrada ainda."}
              </p>
              <p className="tx-empty-sub">
                {hasActiveFilters
                  ? "Tente ajustar os filtros ou limpar a busca."
                  : "Adicione transações no fluxo de caixa para visualizá-las aqui."}
              </p>
              {hasActiveFilters && (
                <button className="tx-btn-clear" onClick={clearFilters} type="button">
                  Limpar filtros
                </button>
              )}
            </div>
          ) : (
            <div className="tx-table-container">
              <table className="tx-table">
                <thead>
                  <tr>
                    <th>Data</th>
                    <th>Descrição</th>
                    <th>Categoria</th>
                    <th>Tipo</th>
                    <th>Valor</th>
                    <th>Conta/Pagamento</th>
                    <th>Status</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {filteredTransactions.map((t) => (
                    <tr key={t.id} className={t.type === "entrada" ? "row-entrada" : "row-saida"}>
                      <td>{formatDateBR(t.date)}</td>
                      <td>
                        <div className="tx-table-desc">
                          <span className="tx-table-icon">{CATEGORY_ICONS[t.category]}</span>
                          {t.description}
                        </div>
                      </td>
                      <td>{t.category}</td>
                      <td>
                        <span className={`tx-type-badge ${t.type}`}>
                          {t.type === "entrada" ? "Entrada" : "Saída"}
                        </span>
                      </td>
                      <td className={`tx-table-value ${t.type}`}>
                        {t.type === "entrada" ? "+" : "-"} {formatBRL(t.amount)}
                      </td>
                      <td>
                        <span className="tx-payment-badge">
                          {PAYMENT_METHODS[t.paymentMethod]} {t.paymentMethod}
                        </span>
                      </td>
                      <td>
                        <span className={`tx-status-badge ${STATUS_CONFIG[t.status].colorClass}`}>
                          {STATUS_CONFIG[t.status].label}
                        </span>
                      </td>
                      <td>
                        <button
                          className="tx-remove-btn"
                          onClick={() => onRemoveTransaction(t.id)}
                          type="button"
                          aria-label="Remover"
                        >
                          ×
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
