import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import 'bootstrap/dist/css/bootstrap.min.css';
import { DataProvider } from './components/DataContext.tsx';
import 'semantic-ui-css/semantic.min.css'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <DataProvider>
    <App />
  </DataProvider>
  </StrictMode>,
)
