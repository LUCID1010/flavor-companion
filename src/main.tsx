
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// Initialize environment variables
if (!import.meta.env.VITE_RAPIDAPI_KEY) {
  console.warn("Warning: VITE_RAPIDAPI_KEY is not set in .env file. API calls may fail.");
}

createRoot(document.getElementById("root")!).render(<App />);
