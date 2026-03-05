import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout/Layout';
import { Dashboard } from './pages/Dashboard/Dashboard';
import { FluxoCaixa } from './pages/FluxoCaixa/FluxoCaixa';

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
