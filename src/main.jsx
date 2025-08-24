import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.jsx'
import './index.css'
import { verifyTelegramUser } from './auth.js'

window.Telegram?.WebApp?.ready?.()
window.Telegram?.WebApp?.expand?.()

verifyTelegramUser()
  .then(r => console.log('verify', r))
  .catch(e => console.log('verify_error', String(e)))

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
)
