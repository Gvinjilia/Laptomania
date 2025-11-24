import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { AuthProvider } from './context/AuthContext.jsx'
import { BrowserRouter } from 'react-router';
import { LaptopProvider } from './context/LaptopContext.jsx';

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <AuthProvider>
      <LaptopProvider>
        <App />
      </LaptopProvider>
    </AuthProvider>
  </BrowserRouter>,
)
