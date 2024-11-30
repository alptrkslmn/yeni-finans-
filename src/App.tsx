import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Dashboard } from './pages/Dashboard';
import { Transactions } from './pages/Transactions';
import { Settings } from './pages/Settings';
import { Preview } from './pages/Preview';
import { Reports } from './pages/Reports';
import { useTheme } from './hooks/useTheme';
import './styles/print.css';

function App() {
  const { isDarkMode } = useTheme();

  return (
    <div className={`min-h-screen ${isDarkMode ? 'dark bg-gray-900' : 'bg-gray-50'}`}>
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/transactions" element={<Transactions />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/preview" element={<Preview />} />
            <Route path="/reports" element={<Reports />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </div>
  );
}

export default App;