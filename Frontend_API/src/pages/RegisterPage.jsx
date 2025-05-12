import { useNavigate } from "react-router-dom";
import RegisterForm from "../components/RegisterForm";

function RegisterPage() {
  const navigate = useNavigate();

  const handleRegister = () => {
    navigate("/login");
  };

  return (
    <div>
      <h1>Cadastro</h1>
      <RegisterForm onRegister={handleRegister} />
    </div>
  );
}

export default RegisterPage;
