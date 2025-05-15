import { useState } from "react";

// form login

function LoginForm({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false); //mostrar a senha

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aqui você pode adicionar a validação ou chamar uma API para autenticação
    if (email === "user@user.com" && password === "123") {
      onLogin();23
    } else {
      alert("Email ou senha incorretos");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
         <div className="input-group email-group">
         <label htmlFor="email"><i class="bi bi-person" style={{ fontSize: '23px' }}></i> E-mail:</label>
      <input
        type="email"a
        placeholder="Digite seu e-mail..."
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      </div>
      <div className="input-group password-group">
      <label htmlFor="email"><i className="bi bi-lock-fill" style={{ fontSize: '23px' }}></i> Senha:</label>
  <input
    type={showPassword ? "text" : "password"}
    placeholder="Digite sua senha..."
    value={password}
    onChange={(e) => setPassword(e.target.value)}
    required
  />
  <i
    className={`bi ${showPassword ? "bi-eye-slash" : "bi-eye"} toggle-password`} style={{ fontSize: '23px' }}
    onClick={() => setShowPassword((prev) => !prev)}
  ></i>
</div>
      <center><button type="submit" className="login-button">ENTRAR</button></center>
      <div className="links">
      <a href="#" className="forgot-password">Esqueceu a senha?</a>
      <a href="#" className="signup-link">Não tem conta? Cadastre-se</a>
    </div>
    </form>
    
  
  );
}

export default LoginForm;
