import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Layout } from './shared/components/layout';
import { Dashboard } from './modules/dashboard/pages';
import { FluxoCaixa } from './modules/fluxo-caixa/pages';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="fluxo-caixa" element={<FluxoCaixa />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
