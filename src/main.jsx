import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { UserDataProvider } from './Providers/UserData.jsx'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <UserDataProvider>
      <App />
    </UserDataProvider>
  </StrictMode>,
)
