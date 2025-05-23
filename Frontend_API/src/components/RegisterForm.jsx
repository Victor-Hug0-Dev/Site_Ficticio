import { useState } from "react";
import axios from "axios";

// form registrar
function RegisterForm({ onRegister }) {
  const [user_name, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState('');

  // Mostrar a senha
  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  // Função para registrar o usuário
  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      // Fazendo a requisição com axios
      const response = await axios.post(
        'http://192.168.0.7:8000/api/user/', 
        {
          user_name,
          email,
          password,
        },
        {
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json', // Mudança para 'application/json'
          },
        }
      );

      // Exibe a resposta do servidor
      console.log(response.data);
      setMessage('✅ Cadastro realizado com sucesso!');
    } catch (error) {
      // Exibe erro caso a requisição falhe
      console.error(error);
      setMessage('❌ Erro ao cadastrar usuário.');
    }

    // estrutura para salvar as credenciais ou armazenas de login em react
    // criar um env para ambiente de teste e produção

    // Limpar os campos após o cadastro
    setUserName('');
    setEmail('');
    setPassword('');
  };

  return (
    <form onSubmit={handleRegister}>
      <div className="input-group name-group">
        <label htmlFor="name"><i className="bi bi-person-vcard" style={{ fontSize: '23px' }}></i> Nome Completo:</label>
        <input
          type="text"
          placeholder="Digite seu nome completo..."
          value={user_name}
          onChange={(e) => setUserName(e.target.value)}
          required
        />
      </div>
      <div className="input-group email-group"> 
        <label htmlFor="email"><i className="bi bi-person" style={{ fontSize: '23px' }}></i> E-mail:</label>
        <input
          type="email"
          placeholder="Digite seu e-mail aqui..."
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div className="input-group password-group">
        <label htmlFor="password"><i className="bi bi-lock-fill" style={{ fontSize: '23px' }}></i> Senha:</label>
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

      <center><button type="submit" className="login-button">CADASTRAR</button></center>

      {message && <p style={{ marginTop: '10px' }}>{message}</p>}

      <div className="links">
      <a href="#" className="signup-link">Fazer Login</a>
    </div>
    </form>
  );
}

export default RegisterForm;
