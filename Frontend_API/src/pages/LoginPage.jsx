import { useState } from "react";
import LoginForm from "../components/LoginForm";
import { useNavigate } from "react-router-dom";

function LoginPage() {
  const [loggedIn, setLoggedIn] = useState(false);
  const navigate = useNavigate();

  const handleLogin = () => {
    setLoggedIn(true);
    navigate("/success");
  };

  return (
    <div>
      <h1>Login</h1>
      {!loggedIn ? <LoginForm onLogin={handleLogin} /> : null}
    </div>
  );
}

export default LoginPage;
