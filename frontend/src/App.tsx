import { ThemeProvider, useTheme } from './theme/ThemeContext';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';
import { Moon, Sun } from 'lucide-react';
import ProductTable from './features/products/ProductTable';
import { useProductStore } from './store/productStore';
import { useEffect } from 'react';

function MainApp() {
  const { theme, toggleTheme } = useTheme();
  const fetchProducts = useProductStore((s) => s.fetchProducts);

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className={'min-vh-100 p-4'}>
      <button onClick={toggleTheme} className='btn btn-outline-secondary mb-3'>
        <div className='d-flex align-items-center gap-2'>
          {theme === 'dark' ? (
            <>
              <Sun />
              <span>Light</span>

            </>
          ) : (
            <>
              <Moon />
              <span>Dark</span>
            </>
          )}
        </div>
      </button>
      <h1>🛒 Gerenciador de Produtos</h1>
      <div className='container py-4'>
        <h2 className='mb-4'>📦 Produtos</h2>
        <ProductTable />
      </div>
    </div>
  );
}

function App() {
  return (
    <ThemeProvider>
      <MainApp />
      <ToastContainer />
    </ThemeProvider>
  );
}

export default App;
