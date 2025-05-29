import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { useGoogleAuth } from "../contexts/GoogleAuthContext";

function PrivateRoute({ children }) {
  const { isAuthenticated: isJwtAuthenticated } = useAuth();
  const { isAuthenticated: isGoogleAuthenticated } = useGoogleAuth();
  
  // Verifica se está autenticado em qualquer um dos contextos
  const isAuthenticated = isJwtAuthenticated || isGoogleAuthenticated;
  
  if (!isAuthenticated) {
    console.log('Usuário não autenticado, redirecionando para login...');
    console.log('JWT Auth:', isJwtAuthenticated);
    console.log('Google Auth:', isGoogleAuthenticated);
    return <Navigate to="/login" />;
  }

  console.log('Usuário autenticado, permitindo acesso ao dashboard...');
  return children;
}

export default PrivateRoute;
