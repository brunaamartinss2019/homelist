import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter as Router } from 'react-router';
import worker from './mocks';
import App from './App.jsx'
import AuthContextProvider from './components/contexts/auth-context.jsx';

worker.start({ onUnhandledRequest: 'warn' })
  .then(() => {
    createRoot(document.getElementById('root')).render(
      <StrictMode>
        <Router>
          <AuthContextProvider>
            <App />
          </AuthContextProvider>
        </Router>
      </StrictMode>,
    )
  })
  .catch((error) => console.log(error))


