import { useMemo, useState } from "react";
import type {
  Transaction,
} from "../constants";
import {
  CATEGORY_ICONS,
  ENTRADA_CATEGORIES,
  SAIDA_CATEGORIES,
  PAYMENT_METHODS,
  STATUS_CONFIG,
  formatBRL,
  todayISO,
  formatDateBR,
} from "../constants";
import "./FluxoCaixaPage.css";

export function FluxoCaixa() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  // Form states
  const [description, setDescription] = useState("");
  const [type, setType] = useState<"entrada" | "saida">("saida");
  const [category, setCategory] = useState("Moradia");
  const [amount, setAmount] = useState<string>("");
  const [date, setDate] = useState<string>(todayISO());
  const [paymentMethod, setPaymentMethod] = useState<string>("Banco");
  const [status, setStatus] = useState<"recebido" | "pendente" | "agendado" | "pago">("pago");

  const totalEntradas = useMemo(() =>
    transactions.filter(t => t.type === "entrada").reduce((acc, t) => acc + t.amount, 0),
    [transactions]
  );
  const totalSaidas = useMemo(() =>
    transactions.filter(t => t.type === "saida").reduce((acc, t) => acc + t.amount, 0),
    [transactions]
  );
  const balance = useMemo(() => totalEntradas - totalSaidas, [totalEntradas, totalSaidas]);

  const parsedAmount = Number(String(amount).replace(",", "."));
  const transactionValid = description.trim().length > 0 && Number.isFinite(parsedAmount) && parsedAmount > 0;

  // Atualizar categoria quando mudar o tipo
  const handleTypeChange = (newType: "entrada" | "saida") => {
    setType(newType);
    if (newType === "entrada") {
      setCategory("Salário");
      setStatus("recebido");
    } else {
      setCategory("Moradia");
      setStatus("pago");
    }
  };

  function handleAddTransaction(e: React.FormEvent) {
    e.preventDefault();
    if (!transactionValid) return;

    setTransactions((prev) => [
      {
        id: crypto.randomUUID(),
        description: description.trim(),
        category,
        amount: parsedAmount,
        date,
        type,
        paymentMethod,
        status
      },
      ...prev,
    ]);

    // Reset form mantendo o tipo atual
    setDescription("");
    setAmount("");
    setDate(todayISO());
  }

  function removeTransaction(id: string) {
    setTransactions((prev) => prev.filter((t) => t.id !== id));
  }

  const currentCategories = type === "entrada" ? ENTRADA_CATEGORIES : SAIDA_CATEGORIES;
  const currentStatusOptions = type === "entrada"
    ? [{ value: "recebido", label: "Recebido" }, { value: "pendente", label: "Pendente" }, { value: "agendado", label: "Agendado" }] as const
    : [{ value: "pago", label: "Pago" }, { value: "pendente", label: "Pendente" }, { value: "agendado", label: "Agendado" }] as const;

  return (
    <div className="fx-root">
      {/* Ambient glow background */}
      <div className="fx-ambient" aria-hidden="true">
        <div className="fx-glow fx-glow-1" />
        <div className="fx-glow fx-glow-2" />
      </div>

      <div className="fx-wrap">
        {/* Header */}
        <header className="fx-header">
          <div className="fx-header-text">
            <p className="fx-eyebrow">Finanças Pessoais</p>
            <h1 className="fx-title">Fluxo de Caixa</h1>
          </div>
        </header>

        {/* Cards Grid */}
        <div className="fx-cards-grid">
          {/* Card 1: Cadastro */}
          <div className="fx-card fx-card-cadastro">
            <div className="fx-card-header">
              <h2 className="fx-card-title">Cadastrar Transação</h2>
              <p className="fx-card-sub">Adicione entradas e saídas</p>
            </div>
            <form className="fx-form" onSubmit={handleAddTransaction}>
              {/* Tipo (Entrada/Saída) */}
              <div className="fx-field">
                <label className="fx-label">Tipo</label>
                <div className="fx-type-toggle">
                  <button
                    type="button"
                    className={`fx-type-btn ${type === "entrada" ? "active entrada" : ""}`}
                    onClick={() => handleTypeChange("entrada")}
                  >
                    <span className="fx-type-icon">↓</span>
                    Entrada
                  </button>
                  <button
                    type="button"
                    className={`fx-type-btn ${type === "saida" ? "active saida" : ""}`}
                    onClick={() => handleTypeChange("saida")}
                  >
                    <span className="fx-type-icon">↑</span>
                    Saída
                  </button>
                </div>
              </div>

              <div className="fx-field">
                <label className="fx-label" htmlFor="desc">Descrição</label>
                <input
                  id="desc"
                  className="fx-input"
                  type="text"
                  placeholder="Ex.: Salário Mensal, Aluguel, Mercado..."
                  value={description}
                  onChange={(ev) => setDescription(ev.target.value)}
                />
              </div>

              <div className="fx-row-2">
                <div className="fx-field">
                  <label className="fx-label" htmlFor="cat">Categoria</label>
                  <select
                    id="cat"
                    className="fx-input fx-select"
                    value={category}
                    onChange={(ev) => setCategory(ev.target.value)}
                  >
                    {currentCategories.map((c) => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>
                <div className="fx-field">
                  <label className="fx-label" htmlFor="amt">Valor (R$)</label>
                  <div className="fx-input-group">
                    <span className="fx-input-prefix">R$</span>
                    <input
                      id="amt"
                      className="fx-input"
                      type="text"
                      inputMode="decimal"
                      placeholder="0,00"
                      value={amount}
                      onChange={(ev) => setAmount(ev.target.value)}
                    />
                  </div>
                </div>
              </div>

              <div className="fx-row-2">
                <div className="fx-field">
                  <label className="fx-label" htmlFor="date">Data</label>
                  <input
                    id="date"
                    className="fx-input"
                    type="date"
                    value={date}
                    onChange={(ev) => setDate(ev.target.value)}
                  />
                </div>
                <div className="fx-field">
                  <label className="fx-label" htmlFor="payment">Conta/Pagamento</label>
                  <select
                    id="payment"
                    className="fx-input fx-select"
                    value={paymentMethod}
                    onChange={(ev) => setPaymentMethod(ev.target.value)}
                  >
                    {Object.entries(PAYMENT_METHODS).map(([method]) => (
                      <option key={method} value={method}>{method}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="fx-field">
                <label className="fx-label" htmlFor="status">Status</label>
                <select
                  id="status"
                  className="fx-input fx-select"
                  value={status}
                  onChange={(ev) => setStatus(ev.target.value as typeof status)}
                >
                  {currentStatusOptions.map((opt) => (
                    <option key={opt.value} value={opt.value}>{opt.label}</option>
                  ))}
                </select>
              </div>

              <div className="fx-form-actions">
                <button
                  type="submit"
                  className="fx-btn fx-btn-primary"
                  disabled={!transactionValid}
                >
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M8 3v10M3 8h10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                  </svg>
                  Adicionar
                </button>
                {transactions.length > 0 && (
                  <button
                    type="button"
                    className="fx-btn fx-btn-ghost"
                    onClick={() => setTransactions([])}
                  >
                    Limpar tudo
                  </button>
                )}
              </div>
            </form>
          </div>

          {/* Card 2: Resumo */}
          <div className="fx-card fx-card-resumo">
            <div className="fx-card-header">
              <h2 className="fx-card-title">Resumo</h2>
              <span className="fx-chip neutral">{transactions.length} item{transactions.length !== 1 ? "s" : ""}</span>
            </div>
            <div className="fx-resumo-grid">
              <div className="fx-resumo-card pos">
                <span className="fx-resumo-label">Total Entradas</span>
                <strong className="fx-resumo-val">{formatBRL(totalEntradas)}</strong>
              </div>
              <div className="fx-resumo-card neg">
                <span className="fx-resumo-label">Total Saídas</span>
                <strong className="fx-resumo-val">{formatBRL(totalSaidas)}</strong>
              </div>
              <div className={`fx-resumo-card ${balance < 0 ? "neg" : "pos"} full-width`}>
                <span className="fx-resumo-label">Saldo</span>
                <strong className="fx-resumo-val">{formatBRL(balance)}</strong>
              </div>
            </div>
          </div>

          {/* Card 3: Histórico */}
          <div className="fx-card fx-card-historico">
            <div className="fx-card-header">
              <h2 className="fx-card-title">Histórico de Transações</h2>
            </div>
            {transactions.length === 0 ? (
              <div className="fx-empty-state">
                <div className="fx-empty-icon">📊</div>
                <p>Nenhuma transação cadastrada ainda.</p>
                <p style={{ fontSize: "0.875rem", color: "var(--text-muted)", marginTop: "0.5rem" }}>
                  Adicione entradas e saídas para visualizar seu fluxo de caixa.
                </p>
              </div>
            ) : (
              <div className="fx-table-container">
                <table className="fx-table">
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
                    {transactions.map((t) => (
                      <tr key={t.id} className={t.type === "entrada" ? "row-entrada" : "row-saida"}>
                        <td>{formatDateBR(t.date)}</td>
                        <td>
                          <div className="fx-table-desc">
                            <span className="fx-table-icon">{CATEGORY_ICONS[t.category]}</span>
                            {t.description}
                          </div>
                        </td>
                        <td>{t.category}</td>
                        <td>
                          <span className={`fx-type-badge ${t.type}`}>
                            {t.type === "entrada" ? "Entrada" : "Saída"}
                          </span>
                        </td>
                        <td className={`fx-table-value ${t.type}`}>
                          {t.type === "entrada" ? "+" : "-"} {formatBRL(t.amount)}
                        </td>
                        <td>
                          <span className="fx-payment-badge">
                            {PAYMENT_METHODS[t.paymentMethod]} {t.paymentMethod}
                          </span>
                        </td>
                        <td>
                          <span className={`fx-status-badge ${STATUS_CONFIG[t.status].colorClass}`}>
                            {STATUS_CONFIG[t.status].label}
                          </span>
                        </td>
                        <td>
                          <button
                            className="fx-remove-btn"
                            onClick={() => removeTransaction(t.id)}
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
    </div>
  );
}
