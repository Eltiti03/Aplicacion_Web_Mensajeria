//Login.tsx

import { useState } from "react";
import { Link } from "react-router-dom";
import "../Styles/Login.css";
import "../Styles/LoginMovil.css";
import "./Register";

export default function Login() {
  const [USER, setUsername] = useState("");
  const [PASSWORD, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!USER || !PASSWORD) {
      setError("Debes completar todos los campos");
      setTimeout(() => setError(""), 1700);
      return;
    }

    setError("");
    console.log("Login enviado:", { USER, PASSWORD });
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
                value={USER}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Usuario"
              />
            </div>

            <div className="form-group">
              <input
                type="PASSWORD"
                value={PASSWORD}
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
