import { Moon, Sun } from 'lucide-react';
import { BrowserRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';
import AppRoutes from './routes/AppRoutes';
import { ThemeProvider, useTheme } from './theme/ThemeContext';

function MainApp() {
  const { theme, toggleTheme } = useTheme();

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
      <AppRoutes />
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <MainApp />
        <ToastContainer position='top-right' autoClose={2500} />
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
