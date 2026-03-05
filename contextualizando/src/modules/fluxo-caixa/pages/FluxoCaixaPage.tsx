import { useState } from "react";
import type { Transaction } from "../../../shared/types";
import {
  todayISO,
  ENTRADA_CATEGORIES,
  SAIDA_CATEGORIES,
  PAYMENT_METHODS,
} from "../../../shared/types";
import "./FluxoCaixaPage.css";

// Função para formatar valor em moeda brasileira em tempo real
function formatCurrencyInput(value: string): string {
  // Remove tudo que não for número
  const numericValue = value.replace(/\D/g, "");
  
  // Converte para número (em centavos)
  const numberValue = parseInt(numericValue, 10);
  
  if (isNaN(numberValue)) return "";
  
  // Formata como moeda brasileira
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(numberValue / 100);
}

// Função para converter valor formatado de volta para número
function parseCurrencyValue(formattedValue: string): number {
  const cleanValue = formattedValue.replace(/[^\d,]/g, "").replace(",", ".");
  return parseFloat(cleanValue) || 0;
}

interface FluxoCaixaProps {
  transactions: Transaction[];
  onAddTransaction: (transaction: Transaction) => void;
  onRemoveTransaction: (id: string) => void;
}

export function FluxoCaixa({ transactions, onAddTransaction, onRemoveTransaction }: FluxoCaixaProps) {

  // Form states
  const [description, setDescription] = useState("");
  const [type, setType] = useState<"entrada" | "saida">("saida");
  const [category, setCategory] = useState("Moradia");
  const [amount, setAmount] = useState<string>("");
  const [date, setDate] = useState<string>(todayISO());
  const [paymentMethod, setPaymentMethod] = useState<string>("Banco");
  const [status, setStatus] = useState<"recebido" | "pendente" | "agendado" | "pago">("pago");

  const parsedAmount = parseCurrencyValue(amount);
  const transactionValid = description.trim().length > 0 && parsedAmount > 0;

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

    onAddTransaction({
      id: crypto.randomUUID(),
      description: description.trim(),
      category,
      amount: parsedAmount,
      date,
      type,
      paymentMethod,
      status
    });

    // Reset form mantendo o tipo atual
    setDescription("");
    setAmount("");
    setDate(todayISO());
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
                    <input
                      id="amt"
                      className="fx-input fx-input-currency"
                      type="text"
                      inputMode="decimal"
                      placeholder="R$ 0,00"
                      value={amount}
                      onChange={(ev) => setAmount(formatCurrencyInput(ev.target.value))}
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
                    onClick={() => transactions.forEach(t => onRemoveTransaction(t.id))}
                  >
                    Limpar tudo
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
