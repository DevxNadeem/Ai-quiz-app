import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from "react-router-dom";
import './index.css'
import App from './App.jsx'
import { AuthContextProvider } from "./context/AuthContext.jsx"
import { QuizFormProvider } from './context/QuizFormContext.jsx';
import { QuizListProvider } from './context/QuizListContext.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <AuthContextProvider>
        <QuizListProvider>
          <QuizFormProvider>
            <App />
          </QuizFormProvider>
        </QuizListProvider>s
      </AuthContextProvider>
    </BrowserRouter>
  </StrictMode>,
)
