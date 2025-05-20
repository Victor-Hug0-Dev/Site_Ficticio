import { useNavigate } from "react-router-dom";
import LoginForm from "../components/LoginForm";
import '../styles/LoginPage.css';

function LoginPage() {
  const navigate = useNavigate();

  return (
    <div className="login-container">
      <div className="title-login">LOGIN</div>
      <LoginForm />
    </div>
  );
}

export default LoginPage;
