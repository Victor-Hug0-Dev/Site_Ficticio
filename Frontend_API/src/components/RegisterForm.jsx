import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function RegisterForm() {
  const [username, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await axios.post(
        'http://192.168.0.11:8000/api/register/',
        {
          username,
          email,
          password
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          }
        }
      );

      if (response.data) {
        navigate("/login");
      }
    } catch (error) {
      setError(error.response?.data?.message || "Erro ao registrar usuário");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleRegister}>
      {error && (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      )}

      <div className="input-group name-group">
        <label htmlFor="name">
          <i className="bi bi-person-vcard" style={{ fontSize: '23px' }}></i> Nome Completo:
        </label>
        <input
          type="text"
          placeholder="Digite seu nome completo..."
          value={username}
          onChange={(e) => setUserName(e.target.value)}
          required
          disabled={loading}
        />
      </div>

      <div className="input-group email-group">
        <label htmlFor="email">
          <i className="bi bi-person" style={{ fontSize: '23px' }}></i> E-mail:
        </label>
        <input
          type="email"
          placeholder="Digite seu e-mail aqui..."
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          disabled={loading}
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
          disabled={loading}
        />
        <i
          className={`bi ${showPassword ? "bi-eye-slash" : "bi-eye"} toggle-password`}
          style={{ fontSize: '23px' }}
          onClick={togglePasswordVisibility}
        ></i>
      </div>

      <center>
        <button 
          type="submit" 
          className="login-button"
          disabled={loading}
        >
          {loading ? "CADASTRANDO..." : "CADASTRAR"}
        </button>
      </center>

      <div className="links">
        <a href="/login" className="signup-link">Fazer Login</a>
      </div>
    </form>
  );
}

export default RegisterForm;
