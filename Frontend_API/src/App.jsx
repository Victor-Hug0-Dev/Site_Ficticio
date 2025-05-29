import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { GoogleOAuthProvider } from '@react-oauth/google';
import { AuthProvider } from "./contexts/AuthContext";
import { GoogleAuthProvider } from './contexts/GoogleAuthContext';
import PrivateRoute from "./components/PrivateRoute";

// Importação das páginas
import Home from "./pages/Home";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import DashboardPage from "./pages/DashboardPage";
import UsersPage from "./pages/UsersPage";
import ForgotPassword from './pages/auth/ForgotPassword';

// ID do cliente Google OAuth
const GOOGLE_CLIENT_ID = "953019049266-ca51j47pmnorstp5gmgfn8i78d4hp4t8.apps.googleusercontent.com";

function App() {
  return (
    <Router>
      <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
        <AuthProvider>
          <GoogleAuthProvider>
            <Routes>
              {/* Rotas públicas */}
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />

              {/* Rotas privadas */}
              <Route
                path="/dashboard"
                element={
                  <PrivateRoute>
                    <DashboardPage />
                  </PrivateRoute>
                }
              />
              <Route
                path="/usuarios"
                element={
                  <PrivateRoute>
                    <UsersPage />
                  </PrivateRoute>
                }
              />

              {/* Rota para redirecionar qualquer caminho não encontrado */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </GoogleAuthProvider>
        </AuthProvider>
      </GoogleOAuthProvider>
    </Router>
  );
}

export default App;
