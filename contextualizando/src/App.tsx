import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout/Layout';
import { Dashboard } from './pages/Dashboard/Dashboard';
import { Relatorios } from './pages/Relatorios/Relatorios';
import { Orcamento } from './pages/Orcamento/Orcamento';
import { FluxoCaixa } from './pages/FluxoCaixa/FluxoCaixa';
import { Configuracoes } from './pages/Configuracoes/Configuracoes';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="relatorios" element={<Relatorios />} />
          <Route path="orcamento" element={<Orcamento />} />
          <Route path="fluxo-caixa" element={<FluxoCaixa />} />
          <Route path="configuracoes" element={<Configuracoes />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
