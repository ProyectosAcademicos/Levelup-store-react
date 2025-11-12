import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'

// 1) Bootstrap
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-icons/font/bootstrap-icons.css'

// 2) Tus estilos globales
import './index.css'
import './components/LoginContenido/LoginContenido.css'
import './components/CatalogoContenido/CatalogoContenido.css'

// 3) JS de Bootstrap 
import 'bootstrap/dist/js/bootstrap.bundle.min.js'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
