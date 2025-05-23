import { useState } from "react";
import RegisterForm from "../components/auth/RegisterForm";
import { useNavigate } from "react-router-dom";
import '../styles/LoginPage.css';


function RegisterPage() {
  const navigate = useNavigate();

  const handleRegister = () => {
    navigate("/login");
  };

  return (

<div className="login-container">
<div className="logo-salcomp-reddd"></div>
<div className="separator"></div>
<div className="title-login">CADASTRO</div>
<RegisterForm onRegister={handleRegister} />
</div>
  );
}

export default RegisterPage;
