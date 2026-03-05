import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Layout } from '../shared/components/layout';
import { Dashboard } from '../modules/dashboard/pages';
import { FluxoCaixa } from '../modules/fluxo-caixa/pages';
import { TransactionsPage } from '../modules/transactions/pages';
import type { Transaction } from '../shared/types';
import { useEffect, useState } from 'react';
import { config } from '../shared/config';
import { createGoogleSheetsService, parseLancamentoSheetToTransactions } from '../shared/services';
import { LoadingOverlay } from '../shared/components/Loading3D/LoadingOverlay';

export function AppRoutes() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [transactionsLoading, setTransactionsLoading] = useState(false);
  const [transactionsError, setTransactionsError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function loadFromSheets() {
      const { spreadsheetId, apiKey } = config.googleSheets;
      if (!spreadsheetId || !apiKey) return;

      setTransactionsLoading(true);
      setTransactionsError(null);

      try {
        const service = createGoogleSheetsService({ spreadsheetId, apiKey });
        const data = await service.getData('Lançamento!A:H');
        const parsed = data ? parseLancamentoSheetToTransactions(data) : [];
        if (cancelled) return;
        setTransactions(parsed);
      } catch (e) {
        if (cancelled) return;
        setTransactionsError(e instanceof Error ? e.message : 'Erro desconhecido');
      } finally {
        if (cancelled) return;
        setTransactionsLoading(false);
      }
    }

    void loadFromSheets();

    return () => {
      cancelled = true;
    };
  }, []);

  const addTransaction = (transaction: Transaction) => {
    setTransactions((prev) => [transaction, ...prev]);
  };

  const removeTransaction = (id: string) => {
    setTransactions((prev) => prev.filter((t) => t.id !== id));
  };

  return (
    <>
      {transactionsLoading && <LoadingOverlay message="Carregando transações do Google Sheets..." />}
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Dashboard transactions={transactions} />} />
            <Route 
              path="fluxo-caixa" 
              element={<FluxoCaixa transactions={transactions} onAddTransaction={addTransaction} onRemoveTransaction={removeTransaction} />} 
            />
            <Route 
              path="transacoes" 
              element={
                <TransactionsPage
                  transactions={transactions}
                  onRemoveTransaction={removeTransaction}
                  loading={transactionsLoading}
                  error={transactionsError}
                />
              } 
            />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}
