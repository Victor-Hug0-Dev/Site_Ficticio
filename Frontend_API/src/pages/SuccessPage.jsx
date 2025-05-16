import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function SuccessPage() {
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        alert("Você precisa estar logado!");
        navigate("/login");
        return;
      }

      try {
        const response = await axios.get("http://192.168.0.4:8000/api/profile/", {
          headers: {
            'Authorization': `Token ${token}`,
            'Content-Type': 'application/json',
          }
        });

        setProfile(response.data);
      } catch (error) {
        console.error("Erro ao buscar o perfil:", error);
        alert("Erro ao carregar dados do perfil.");
        handleLogout();
      }
    };

    fetchProfile();
  }, []);

  return (
    <div>
      <h1>Bem-vindo!</h1>

      {profile ? (
        <div>
          <p><strong>Nome:</strong> {profile.name || profile.username}</p>
          <p><strong>Email:</strong> {profile.email}</p>
          {/* Adicione mais campos conforme sua API retornar */}
        </div>
      ) : (
        <p>Carregando dados do perfil...</p>
      )}

      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}

export default SuccessPage;
