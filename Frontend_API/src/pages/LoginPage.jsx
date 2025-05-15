import { useState } from "react";
import LoginForm from "../components/LoginForm";
import { useNavigate } from "react-router-dom";
import './LoginPage.css';

function LoginPage() {
  const [loggedIn, setLoggedIn] = useState(false);
  const navigate = useNavigate();

  const handleLogin = () => {
    setLoggedIn(true);
    navigate("/success");
  };

  return (
    <div className="login-container">
    <div className="title-login">LOGIN</div>
    {!loggedIn ? <LoginForm onLogin={handleLogin} /> : null}
  </div>

  );

}

export default LoginPage;
