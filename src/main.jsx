import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { AuthProvider } from "./Pages/AuthPages/AuthContext.jsx";
import { SpinnerProvider } from "./Pages/AuthPages/SpinnerContext.jsx";
import { store } from "./store/store.js";
import './index.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import App from './App.jsx'
import "./i18n";
const queryClient = new QueryClient();

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <SpinnerProvider>
          <App />
        </SpinnerProvider>
      </AuthProvider>
    </QueryClientProvider>
  </Provider>
)
