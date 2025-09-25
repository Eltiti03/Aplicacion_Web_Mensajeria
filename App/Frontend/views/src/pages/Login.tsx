//Login.tsx

import { useState } from "react";
import { Link /*useNavigate*/ } from "react-router-dom";
import "../Styles/Login.css";
import "../Styles/LoginMovil.css";
import axios from "axios";
import "./Register";

export default function Login() {
  const [MAIL, setUsername] = useState("");
  const [PASS, setPassword] = useState("");
  const [error, setError] = useState("");

  //const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!MAIL || !PASS) {
      setError("Debes completar todos los campos");
      setTimeout(() => setError(""), 1700);
      return;
    }

    const res = await axios.post("http://localhost:1235/", { MAIL, PASS });
    console.log(res);
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h1>INICIAR SESION</h1>

        {error && <p className="error">{error}</p>}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <input
              type="text"
              value={MAIL}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Usuario"
            />
          </div>

          <div className="form-group">
            <input
              type="PASSWORD"
              value={PASS}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••"
            />
          </div>

          <button type="submit">Entrar</button>
          <p className="label-register">
            ¿No tienes cuenta? <Link to="/Register">Regístrate</Link>
          </p>
        </form>
      </div>
    </div>
  );
}
