import { useState } from "react";
import { useNavigate } from "react-router-dom"; // <- IMPORTAR ISSO!
import axios from "axios";

function LoginForm({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate(); // <- DEFINIR AQUI!

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://192.168.0.10:8000/api/auth/", {
        email: email,
        password: password,
      });

      console.log("Login bem-sucedido:", response.data);

      const token = response.data.token;
      localStorage.setItem("token", token);

      onLogin?.(); // se quiser chamar algo do componente pai

      navigate("/success"); // <- AGORA FUNCIONA!
    } catch (error) {
      if (error.response) {
        console.error("Erro da API:", error.response.data);
        alert("Email ou senha incorretos");
      } else {
        console.error("Erro desconhecido:", error);
        alert("Erro ao conectar com o servidor");
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="input-group email-group">
        <label htmlFor="email">
          <i className="bi bi-person" style={{ fontSize: '23px' }}></i> E-mail:
        </label>
        <input
          type="email"
          placeholder="Digite seu e-mail..."
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>

      <div className="input-group password-group">
        <label htmlFor="password">
          <i className="bi bi-lock-fill" style={{ fontSize: '23px' }}></i> Senha:
        </label>
        <input
          type={showPassword ? "text" : "password"}
          placeholder="Digite sua senha..."
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <i
          className={`bi ${showPassword ? "bi-eye-slash" : "bi-eye"} toggle-password`}
          style={{ fontSize: '23px' }}
          onClick={togglePasswordVisibility}
        ></i>
      </div>

      <center><button type="submit" className="login-button">ENTRAR</button></center>

      <div className="links">
        <a href="#" className="forgot-password">Esqueceu a senha?</a>
        <a href="/register" className="signup-link">Não tem conta? Cadastre-se</a>
      </div>
    </form>
  );
}

export default LoginForm;
