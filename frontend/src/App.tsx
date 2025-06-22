import { BrowserRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';
import AppRoutes from './routes/AppRoutes';
import { ThemeProvider } from './theme/ThemeContext';

function App() {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <AppRoutes />
        <ToastContainer position='top-right' autoClose={2500} />
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
