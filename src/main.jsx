import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { UserDataProvider } from './Providers/UserData.jsx'
import App from './App.jsx'
import { GoogleOAuthProvider } from "@react-oauth/google";


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <UserDataProvider>
      <GoogleOAuthProvider clientId="573906751184-aiq0bdmd5if80d6n7fsqi52hkf1pc3jj.apps.googleusercontent.com">
        <App />
      </GoogleOAuthProvider>
    </UserDataProvider>
  </StrictMode>,
)
