import { useMemo, useState } from "react";
import "../../App.css";
import "./FluxoCaixa.css";

type Expense = {
  id: string;
  description: string;
  category: string;
  amount: number;
  date: string; // YYYY-MM-DD
};

function formatBRL(value: number) {
  return value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

function todayISO() {
  const d = new Date();
  const yyyy = d.getFullYear();
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const dd = String(d.getDate()).padStart(2, "0");
  return `${yyyy}-${mm}-${dd}`;
}

export function FluxoCaixa() {
  const [step, setStep] = useState<1 | 2 | 3>(1);

  // Step 1: renda
  const [income, setIncome] = useState<number>(0);

  // Step 2: gastos
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("Moradia");
  const [amount, setAmount] = useState<string>("");
  const [date, setDate] = useState<string>(todayISO());

  const totalExpenses = useMemo(
    () => expenses.reduce((acc, e) => acc + e.amount, 0),
    [expenses]
  );

  const balance = useMemo(() => income - totalExpenses, [income, totalExpenses]);

  const incomeValid = income > 0;
  const parsedAmount = Number(String(amount).replace(",", "."));
  const expenseValid =
    description.trim().length > 0 && Number.isFinite(parsedAmount) && parsedAmount > 0;

  function next() {
    setStep((s) => (s === 1 ? 2 : s === 2 ? 3 : 3));
  }
  function back() {
    setStep((s) => (s === 3 ? 2 : s === 2 ? 1 : 1));
  }

  function handleAddExpense(e: React.FormEvent) {
    e.preventDefault();
    if (!expenseValid) return;

    const newExpense: Expense = {
      id: crypto.randomUUID(),
      description: description.trim(),
      category,
      amount: parsedAmount,
      date,
    };

    setExpenses((prev) => [newExpense, ...prev]);
    setDescription("");
    setAmount("");
  }

  function removeExpense(id: string) {
    setExpenses((prev) => prev.filter((e) => e.id !== id));
  }

  function clearAllExpenses() {
    setExpenses([]);
  }

  return (
    <div className="fx-page">
      <header className="fx-header">
        <div className="fx-header-left">
          <h1 className="fx-title">Fluxo de Caixa</h1>
          <p className="fx-subtitle">
            Preencha sua renda, cadastre gastos e revise o saldo do mês.
          </p>
        </div>

        <div className="fx-kpis">
          <div className="fx-kpi">
            <span className="fx-kpi-label">Renda</span>
            <strong className="fx-kpi-value">{formatBRL(income)}</strong>
          </div>
          <div className="fx-kpi">
            <span className="fx-kpi-label">Gastos</span>
            <strong className="fx-kpi-value">{formatBRL(totalExpenses)}</strong>
          </div>
          <div className={`fx-kpi ${balance < 0 ? "neg" : "pos"}`}>
            <span className="fx-kpi-label">Saldo</span>
            <strong className="fx-kpi-value">{formatBRL(balance)}</strong>
          </div>
        </div>
      </header>

      <section className="fx-shell">
        {/* Stepper */}
        <div className="fx-stepper">
          <div className={`fx-step ${step >= 1 ? "active" : ""}`}>
            <div className="fx-step-dot">{step > 1 ? "✓" : "1"}</div>
            <div className="fx-step-meta">
              <span className="fx-step-title">Declaração de renda</span>
              <span className="fx-step-desc">Declare sua renda mensal.</span>
            </div>
          </div>

          <div className={`fx-step-line ${step >= 2 ? "active" : ""}`} />

          <div className={`fx-step ${step >= 2 ? "active" : ""}`}>
            <div className="fx-step-dot">{step > 2 ? "✓" : "2"}</div>
            <div className="fx-step-meta">
              <span className="fx-step-title">Declaração de gastos</span>
              <span className="fx-step-desc">Cadastre suas despesas do mês</span>
            </div>
          </div>

          <div className={`fx-step-line ${step >= 3 ? "active" : ""}`} />

          <div className={`fx-step ${step >= 3 ? "active" : ""}`}>
            <div className="fx-step-dot">3</div>
            <div className="fx-step-meta">
              <span className="fx-step-title">Revisão</span>
              <span className="fx-step-desc">Resumo do mês</span>
            </div>
          </div>
        </div>

        {/* Conteúdo */}
        <div className="fx-card">
          {step === 1 && (
            <div className="fx-card-body">
              <div className="fx-card-head">
                <h2 className="fx-card-title">Etapa 1: Renda mensal</h2>
                <p className="fx-card-hint">
                  Informe sua renda principal (ex.: salário).
                </p>
              </div>

              <form className="fx-form" onSubmit={(e) => e.preventDefault()}>
                <div className="fx-grid-2">
                  <div className="fx-field">
                    <label htmlFor="income">Renda mensal (R$)</label>
                    <input
                      id="income"
                      className="fx-input"
                      type="number"
                      min={0}
                      step="0.01"
                      placeholder="Ex.: 3500.00"
                      value={income === 0 ? "" : income}
                      onChange={(ev) => setIncome(Number(ev.target.value || 0))}
                    />
                    <span className="fx-help">
                      Dica: você pode incluir apenas sua renda  <a href="https://sambaporno.com">fixa.</a>
                    </span>
                  </div>

                  <div className="fx-panel">
                    <div className="fx-panel-row">
                      <span className="fx-panel-label">Status</span>
                      <span className={`fx-badge ${incomeValid ? "ok" : "warn"}`}>
                        {incomeValid ? "Renda informada" : "Informe um valor válido"}
                      </span>
                    </div>
                    <div className="fx-panel-row">
                      <span className="fx-panel-label">Renda atual</span>
                      <strong className="fx-panel-value">{formatBRL(income)}</strong>
                    </div>

                    <button
                      type="button"
                      className="fx-btn fx-btn-ghost"
                      onClick={() => setIncome(0)}
                    >
                      Zerar renda
                    </button>
                  </div>
                </div>
              </form>
            </div>
          )}

          {step === 2 && (
            <div className="fx-card-body">
              <div className="fx-card-head">
                <h2 className="fx-card-title">Etapa 2: Gastos do mês</h2>
                <p className="fx-card-hint">
                  Cadastre despesas com descrição, categoria, valor e data.
                </p>
              </div>

              <div className="fx-grid-2">
                <form className="fx-form" onSubmit={handleAddExpense}>
                  <div className="fx-field">
                    <label htmlFor="desc">Descrição</label>
                    <input
                      id="desc"
                      className="fx-input"
                      type="text"
                      placeholder="Ex.: Mercado, Aluguel, Internet..."
                      value={description}
                      onChange={(ev) => setDescription(ev.target.value)}
                    />
                  </div>

                  <div className="fx-row">
                    <div className="fx-field">
                      <label htmlFor="cat">Categoria</label>
                      <select
                        id="cat"
                        className="fx-input"
                        value={category}
                        onChange={(ev) => setCategory(ev.target.value)}
                      >
                        <option>Moradia</option>
                        <option>Alimentação</option>
                        <option>Transporte</option>
                        <option>Saúde</option>
                        <option>Lazer</option>
                        <option>Educação</option>
                        <option>Contas</option>
                        <option>Outros</option>
                      </select>
                    </div>

                    <div className="fx-field">
                      <label htmlFor="amount">Valor (R$)</label>
                      <input
                        id="amount"
                        className="fx-input"
                        type="text"
                        inputMode="decimal"
                        placeholder="Ex.: 120,50"
                        value={amount}
                        onChange={(ev) => setAmount(ev.target.value)}
                      />
                      <span className="fx-help">Aceita vírgula ou ponto.</span>
                    </div>
                  </div>

                  <div className="fx-field">
                    <label htmlFor="date">Data</label>
                    <input
                      id="date"
                      className="fx-input"
                      type="date"
                      value={date}
                      onChange={(ev) => setDate(ev.target.value)}
                    />
                  </div>

                  <div className="fx-actions">
                    <button
                      type="submit"
                      className="fx-btn fx-btn-primary"
                      disabled={!expenseValid}
                    >
                      Adicionar gasto
                    </button>
                    <button
                      type="button"
                      className="fx-btn fx-btn-ghost"
                      onClick={clearAllExpenses}
                      disabled={expenses.length === 0}
                    >
                      Limpar lista
                    </button>
                  </div>
                </form>

                <aside className="fx-side">
                  <div className="fx-side-head">
                    <h3 className="fx-side-title">Resumo parcial</h3>
                    <span className="fx-pill">{expenses.length} gasto(s)</span>
                  </div>

                  <div className="fx-side-box">
                    <div className="fx-side-row">
                      <span className="fx-side-label">Total gastos</span>
                      <strong className="fx-side-value">
                        {formatBRL(totalExpenses)}
                      </strong>
                    </div>
                    <div className="fx-side-row">
                      <span className="fx-side-label">Saldo</span>
                      <strong className="fx-side-value">
                        {formatBRL(balance)}
                      </strong>
                    </div>
                  </div>

                  <div className="fx-list">
                    {expenses.length === 0 ? (
                      <div className="fx-empty">
                        Nenhum gasto cadastrado ainda.
                      </div>
                    ) : (
                      <ul className="fx-items">
                        {expenses.slice(0, 6).map((ex) => (
                          <li key={ex.id} className="fx-item">
                            <div className="fx-item-main">
                              <div className="fx-item-top">
                                <strong className="fx-item-desc">
                                  {ex.description}
                                </strong>
                                <span className="fx-item-amount">
                                  {formatBRL(ex.amount)}
                                </span>
                              </div>
                              <div className="fx-item-meta">
                                <span className="fx-tag">{ex.category}</span>
                                <span className="fx-dot">•</span>
                                <span className="fx-date">{ex.date}</span>
                              </div>
                            </div>
                            <button
                              type="button"
                              className="fx-icon-btn"
                              onClick={() => removeExpense(ex.id)}
                              aria-label="Remover gasto"
                              title="Remover"
                            >
                              ✕
                            </button>
                          </li>
                        ))}
                      </ul>
                    )}
                    {expenses.length > 6 && (
                      <div className="fx-more">
                        +{expenses.length - 6} gasto(s) na revisão
                      </div>
                    )}
                  </div>
                </aside>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="fx-card-body">
              <div className="fx-card-head">
                <h2 className="fx-card-title">Etapa 3: Revisão</h2>
                <p className="fx-card-hint">
                  Confira renda, gastos e saldo. Você pode remover itens.
                </p>
              </div>

              <div className="fx-review">
                <div className="fx-review-kpis">
                  <div className="fx-review-kpi">
                    <span>Renda</span>
                    <strong>{formatBRL(income)}</strong>
                  </div>
                  <div className="fx-review-kpi">
                    <span>Gastos</span>
                    <strong>{formatBRL(totalExpenses)}</strong>
                  </div>
                  <div className={`fx-review-kpi ${balance < 0 ? "neg" : "pos"}`}>
                    <span>Saldo</span>
                    <strong>{formatBRL(balance)}</strong>
                  </div>
                </div>

                <div className="fx-review-list">
                  <div className="fx-review-head">
                    <h3 className="fx-review-title">Todos os gastos</h3>
                    <span className="fx-pill">{expenses.length} item(ns)</span>
                  </div>

                  {expenses.length === 0 ? (
                    <div className="fx-empty"> <a href="https://trollerworld.neocities.org/">Nenhum gasto até agora parabéns</a></div> 
                  ) : (
                    <ul className="fx-items">
                      {expenses.map((ex) => (
                        <li key={ex.id} className="fx-item">
                          <div className="fx-item-main">
                            <div className="fx-item-top">
                              <strong className="fx-item-desc">
                                {ex.description}
                              </strong>
                              <span className="fx-item-amount">
                                {formatBRL(ex.amount)}
                              </span>
                            </div>
                            <div className="fx-item-meta">
                              <span className="fx-tag">{ex.category}</span>
                              <span className="fx-dot">•</span>
                              <span className="fx-date">{ex.date}</span>
                            </div>
                          </div>
                          <button
                            type="button"
                            className="fx-icon-btn"
                            onClick={() => removeExpense(ex.id)}
                            aria-label="Remover gasto"
                            title="Remover"
                          >
                            ✕
                          </button>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Footer navegação */}
          <footer className="fx-card-footer">
            <button
              type="button"
              className="fx-btn fx-btn-ghost"
              onClick={back}
              disabled={step === 1}
            >
              Voltar
            </button>

            <div className="fx-footer-right">
              {step === 1 && (
                <button
                  type="button"
                  className="fx-btn fx-btn-primary"
                  onClick={next}
                  disabled={!incomeValid}
                >
                  Continuar
                </button>
              )}

              {step === 2 && (
                <button
                  type="button"
                  className="fx-btn fx-btn-primary"
                  onClick={next}
                  disabled={!incomeValid}
                >
                  Ir para revisão
                </button>
              )}

              {step === 3 && (
                <button
                  type="button"
                  className="fx-btn fx-btn-primary"
                  onClick={() => setStep(1)}
                >
                  Recomeçar
                </button>
              )}
            </div>
          </footer>
        </div>
      </section>
    </div>
  );
}