import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from "react-router-dom";
import './index.css'
import App from './App.jsx'
import { AuthContextProvider } from "./context/AuthContext.jsx"
import { QuizProvider } from './context/QuizContext.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <AuthContextProvider>
        <QuizProvider>
          <App />
        </QuizProvider>
      </AuthContextProvider>
    </BrowserRouter>
  </StrictMode>,
)