import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Layout } from './shared/components/layout';
import { Dashboard } from './modules/dashboard/pages';
import { FluxoCaixa } from './modules/fluxo-caixa/pages';
import { TransactionsPage } from './modules/transactions/pages';
import type { Transaction } from './shared/types';

function App() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  const addTransaction = (transaction: Transaction) => {
    setTransactions((prev) => [transaction, ...prev]);
  };

  const removeTransaction = (id: string) => {
    setTransactions((prev) => prev.filter((t) => t.id !== id));
  };

  return (
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
            element={<TransactionsPage transactions={transactions} onRemoveTransaction={removeTransaction} />} 
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
