import './app/index.css';
import App from './app/App.tsx';
import { createRoot } from 'react-dom/client';
import { ToastContainer } from 'react-toastify';

createRoot(document.getElementById('root')!).render(
  <>
    <App />
    <ToastContainer position='top-right' theme='dark' limit={1} />
  </>
);
