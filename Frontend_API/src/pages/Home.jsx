import { Link } from "react-router-dom";

function Home() {
  return (
    <div>
      <h1>Bem-vindo ao Sistema</h1>
      <nav>
        <Link to="/login">Login</Link> | <Link to="/register">Cadastrar</Link> | <Link to="/dashboard">Dashboard</Link>
      </nav>
    </div>
  );
}

export default Home;
