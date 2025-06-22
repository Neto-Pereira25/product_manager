import { BrowserRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';
import { ThemeProvider } from './theme/ThemeContext';
import MainApp from './pages/Main';

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
