import { useMemo, useState } from "react";
import "./FluxoCaixa.css";

type Expense = {
  id: string;
  description: string;
  category: string;
  amount: number;
  date: string;
};

const CATEGORY_ICONS: Record<string, string> = {
  Moradia: "🏠",
  Alimentação: "🛒",
  Transporte: "🚗",
  Saúde: "❤️",
  Lazer: "🎬",
  Educação: "📚",
  Contas: "⚡",
  Outros: "📦",
};

function formatBRL(value: number) {
  return value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

function todayISO() {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

function formatDateBR(iso: string) {
  if (!iso) return "";
  const [y, m, d] = iso.split("-");
  return `${d}/${m}/${y}`;
}

export function FluxoCaixa() {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [income, setIncome] = useState<number>(0);
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("Moradia");
  const [amount, setAmount] = useState<string>("");
  const [date, setDate] = useState<string>(todayISO());
  const [animating, setAnimating] = useState(false);

  const totalExpenses = useMemo(() => expenses.reduce((acc, e) => acc + e.amount, 0), [expenses]);
  const balance = useMemo(() => income - totalExpenses, [income, totalExpenses]);

  const incomeValid = income > 0;
  const parsedAmount = Number(String(amount).replace(",", "."));
  const expenseValid = description.trim().length > 0 && Number.isFinite(parsedAmount) && parsedAmount > 0;

  function navigate(direction: "next" | "back") {
    if (animating) return;
    setAnimating(true);
    setTimeout(() => {
      if (direction === "next") setStep((s) => (s < 3 ? ((s + 1) as 1 | 2 | 3) : s));
      else setStep((s) => (s > 1 ? ((s - 1) as 1 | 2 | 3) : s));
      setAnimating(false);
    }, 180);
  }

  function handleAddExpense(e: React.FormEvent) {
    e.preventDefault();
    if (!expenseValid) return;
    setExpenses((prev) => [
      { id: crypto.randomUUID(), description: description.trim(), category, amount: parsedAmount, date },
      ...prev,
    ]);
    setDescription("");
    setAmount("");
  }

  function removeExpense(id: string) {
    setExpenses((prev) => prev.filter((e) => e.id !== id));
  }

  const steps = [
    { label: "Renda", desc: "Declare sua renda mensal" },
    { label: "Gastos", desc: "Cadastre suas despesas" },
    { label: "Revisão", desc: "Resumo do mês" },
  ];

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

          <div className="fx-kpis">
            <div className="fx-kpi">
              <span className="fx-kpi-label">Renda</span>
              <strong className="fx-kpi-val">{formatBRL(income)}</strong>
            </div>
            <div className="fx-kpi-divider" />
            <div className="fx-kpi">
              <span className="fx-kpi-label">Gastos</span>
              <strong className="fx-kpi-val">{formatBRL(totalExpenses)}</strong>
            </div>
            <div className="fx-kpi-divider" />
            <div className={`fx-kpi ${balance < 0 ? "neg" : balance > 0 ? "pos" : ""}`}>
              <span className="fx-kpi-label">Saldo</span>
              <strong className="fx-kpi-val">{formatBRL(balance)}</strong>
            </div>
          </div>
        </header>

        {/* Main card */}
        <div className="fx-card">
          {/* Stepper */}
          <div className="fx-stepper">
            {steps.map((s, i) => {
              const n = i + 1;
              const isActive = step === n;
              const isDone = step > n;
              return (
                <div key={n} className="fx-step-wrap">
                  <button
                    className={`fx-step ${isActive ? "is-active" : ""} ${isDone ? "is-done" : ""}`}
                    onClick={() => n < step && setStep(n as 1 | 2 | 3)}
                    disabled={n > step}
                    type="button"
                  >
                    <div className="fx-step-circle">
                      {isDone ? (
                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                          <path d="M2.5 7L5.5 10L11.5 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      ) : (
                        <span>{n}</span>
                      )}
                    </div>
                    <div className="fx-step-text">
                      <span className="fx-step-name">{s.label}</span>
                      <span className="fx-step-desc">{s.desc}</span>
                    </div>
                  </button>
                  {i < steps.length - 1 && (
                    <div className={`fx-step-track ${step > n ? "filled" : ""}`}>
                      <div className="fx-step-fill" style={{ width: step > n ? "100%" : "0%" }} />
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Content */}
          <div className={`fx-content ${animating ? "fx-fade-out" : "fx-fade-in"}`}>

            {/* ── STEP 1 ── */}
            {step === 1 && (
              <div className="fx-section">
                <div className="fx-section-head">
                  <h2 className="fx-section-title">Qual é sua renda mensal?</h2>
                  <p className="fx-section-sub">Informe o valor que entra todo mês — salário, freelance, etc.</p>
                </div>

                <div className="fx-income-layout">
                  <div className="fx-income-field">
                    <label className="fx-label" htmlFor="income">Valor da renda</label>
                    <div className="fx-input-group">
                      <span className="fx-input-prefix">R$</span>
                      <input
                        id="income"
                        className="fx-input"
                        type="number"
                        min={0}
                        step="0.01"
                        placeholder="0,00"
                        value={income === 0 ? "" : income}
                        onChange={(ev) => setIncome(Number(ev.target.value || 0))}
                      />
                    </div>
                    <p className="fx-input-hint">Você pode incluir apenas sua renda fixa.</p>
                  </div>

                  <div className="fx-income-preview">
                    <div className="fx-preview-row">
                      <span>Status</span>
                      <span className={`fx-chip ${incomeValid ? "ok" : "warn"}`}>
                        {incomeValid ? "✓ Informada" : "Aguardando"}
                      </span>
                    </div>
                    <div className="fx-preview-divider" />
                    <div className="fx-preview-row">
                      <span>Renda declarada</span>
                      <strong className="fx-preview-val">{formatBRL(income)}</strong>
                    </div>
                    <button className="fx-link-btn" onClick={() => setIncome(0)} type="button">
                      Zerar valor
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* ── STEP 2 ── */}
            {step === 2 && (
              <div className="fx-section">
                <div className="fx-section-head">
                  <h2 className="fx-section-title">Cadastre seus gastos</h2>
                  <p className="fx-section-sub">Adicione cada despesa com descrição, categoria e valor.</p>
                </div>

                <div className="fx-two-col">
                  <form className="fx-form" onSubmit={handleAddExpense}>
                    <div className="fx-field">
                      <label className="fx-label" htmlFor="desc">Descrição</label>
                      <input
                        id="desc"
                        className="fx-input"
                        type="text"
                        placeholder="Ex.: Aluguel, Mercado, Internet…"
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
                          {Object.keys(CATEGORY_ICONS).map((c) => (
                            <option key={c} value={c}>{CATEGORY_ICONS[c]} {c}</option>
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

                    <div className="fx-form-actions">
                      <button
                        type="submit"
                        className="fx-btn fx-btn-primary"
                        disabled={!expenseValid}
                      >
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                          <path d="M8 3v10M3 8h10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                        </svg>
                        Adicionar gasto
                      </button>
                      {expenses.length > 0 && (
                        <button
                          type="button"
                          className="fx-btn fx-btn-ghost"
                          onClick={() => setExpenses([])}
                        >
                          Limpar lista
                        </button>
                      )}
                    </div>
                  </form>

                  <aside className="fx-aside">
                    <div className="fx-aside-header">
                      <h3 className="fx-aside-title">Resumo parcial</h3>
                      <span className="fx-chip neutral">{expenses.length} item{expenses.length !== 1 ? "s" : ""}</span>
                    </div>

                    <div className="fx-summary-grid">
                      <div className="fx-summary-cell">
                        <span>Total gastos</span>
                        <strong>{formatBRL(totalExpenses)}</strong>
                      </div>
                      <div className={`fx-summary-cell ${balance < 0 ? "neg" : "pos"}`}>
                        <span>Saldo restante</span>
                        <strong>{formatBRL(balance)}</strong>
                      </div>
                    </div>

                    <div className="fx-expense-list">
                      {expenses.length === 0 ? (
                        <div className="fx-empty-state">
                          <div className="fx-empty-icon">💸</div>
                          <p>Nenhum gasto ainda.</p>
                        </div>
                      ) : (
                        <ul className="fx-items">
                          {expenses.slice(0, 6).map((ex) => (
                            <li key={ex.id} className="fx-item">
                              <div className="fx-item-icon">{CATEGORY_ICONS[ex.category] ?? "📦"}</div>
                              <div className="fx-item-body">
                                <div className="fx-item-name">{ex.description}</div>
                                <div className="fx-item-meta">{ex.category} · {formatDateBR(ex.date)}</div>
                              </div>
                              <div className="fx-item-right">
                                <span className="fx-item-val">{formatBRL(ex.amount)}</span>
                                <button
                                  className="fx-remove-btn"
                                  onClick={() => removeExpense(ex.id)}
                                  type="button"
                                  aria-label="Remover"
                                >
                                  ×
                                </button>
                              </div>
                            </li>
                          ))}
                        </ul>
                      )}
                      {expenses.length > 6 && (
                        <p className="fx-more">+{expenses.length - 6} gasto(s) visível(is) na revisão</p>
                      )}
                    </div>
                  </aside>
                </div>
              </div>
            )}

            {/* ── STEP 3 ── */}
            {step === 3 && (
              <div className="fx-section">
                <div className="fx-section-head">
                  <h2 className="fx-section-title">Resumo do mês</h2>
                  <p className="fx-section-sub">Confira seus números e ajuste o que precisar.</p>
                </div>

                <div className="fx-review-kpis">
                  {[
                    { label: "Renda declarada", val: income, cls: "" },
                    { label: "Total de gastos", val: totalExpenses, cls: "" },
                    { label: "Saldo final", val: balance, cls: balance < 0 ? "neg" : "pos" },
                  ].map(({ label, val, cls }) => (
                    <div key={label} className={`fx-review-kpi ${cls}`}>
                      <span>{label}</span>
                      <strong>{formatBRL(val)}</strong>
                    </div>
                  ))}
                </div>

                {expenses.length > 0 && (
                  <div className="fx-review-table">
                    <div className="fx-table-head">
                      <h3>Todos os gastos</h3>
                      <span className="fx-chip neutral">{expenses.length} item{expenses.length !== 1 ? "s" : ""}</span>
                    </div>
                    <ul className="fx-items fx-items-full">
                      {expenses.map((ex) => (
                        <li key={ex.id} className="fx-item">
                          <div className="fx-item-icon">{CATEGORY_ICONS[ex.category] ?? "📦"}</div>
                          <div className="fx-item-body">
                            <div className="fx-item-name">{ex.description}</div>
                            <div className="fx-item-meta">{ex.category} · {formatDateBR(ex.date)}</div>
                          </div>
                          <div className="fx-item-right">
                            <span className="fx-item-val">{formatBRL(ex.amount)}</span>
                            <button
                              className="fx-remove-btn"
                              onClick={() => removeExpense(ex.id)}
                              type="button"
                              aria-label="Remover"
                            >
                              ×
                            </button>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {expenses.length === 0 && (
                  <div className="fx-congrats">
                    <div className="fx-congrats-icon">🎉</div>
                    <p className="fx-congrats-text">Nenhum gasto cadastrado. Ótimo mês!</p>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Footer navigation */}
          <footer className="fx-footer">
            <button
              type="button"
              className="fx-btn fx-btn-ghost"
              onClick={() => navigate("back")}
              disabled={step === 1}
            >
              ← Voltar
            </button>

            <div className="fx-footer-dots">
              {[1, 2, 3].map((n) => (
                <div key={n} className={`fx-dot-ind ${step === n ? "active" : step > n ? "done" : ""}`} />
              ))}
            </div>

            <div>
              {step < 3 && (
                <button
                  type="button"
                  className="fx-btn fx-btn-primary"
                  onClick={() => navigate("next")}
                  disabled={step === 1 && !incomeValid}
                >
                  {step === 2 ? "Ir para revisão" : "Continuar"} →
                </button>
              )}
              {step === 3 && (
                <button
                  type="button"
                  className="fx-btn fx-btn-primary"
                  onClick={() => { setStep(1); setIncome(0); setExpenses([]); }}
                >
                  ↺ Recomeçar
                </button>
              )}
            </div>
          </footer>
        </div>
      </div>
    </div>
  );
}
