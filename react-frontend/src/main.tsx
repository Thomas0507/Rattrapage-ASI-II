import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from "react-router-dom";
import './index.css'
import App from './App.js'
import { AuthProvider } from "./hooks/useAuth.jsx";
import Header from './pages/Header.js';
import { ProfileProvider } from "./pages/profile/ProfilePage";

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import React from 'react';

createRoot(document.getElementById('root') as HTMLElement).render(
      <BrowserRouter>
        <AuthProvider>
          <ProfileProvider> {/* Ajout du ProfileProvider */}
            <App />
          </ProfileProvider>
        </AuthProvider>
      </BrowserRouter>
)
