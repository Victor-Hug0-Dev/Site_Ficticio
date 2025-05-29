import { useNavigate } from "react-router-dom";
import LoginForm from "../components/auth/LoginForm";
import '../styles/LoginPage.css';
import '../styles/img.css';

function LoginPage() {
  const navigate = useNavigate();

  return (
    <div className="login-container">
      <center><div className="logo-salcomp-reddd"></div></center>
      <div className="separator"></div>
      <div className="title-login">LOGIN</div>
      <LoginForm />
    </div>
  );
}

export default LoginPage;
