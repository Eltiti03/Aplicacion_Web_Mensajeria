//Register.tsx

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../Styles/RegisterMovil.css";
import "../Styles/Register.css";
import axios from "axios";

function Register() {
  const [MAIL, setUsername] = useState("");
  const [PASS, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  const handleS = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");

    if (!MAIL || !PASS) {
      setMessage("Debes completar todos los campos");
      setTimeout(() => setMessage(""), 1700);
      return;
    }

    const res = await axios.post("http://localhost:1235/register", {
      MAIL,
      PASS,
    });

    try {
      console.log(res.data.success);
      if (res.data.success) {
        console.log("Navegando a /...");
        setUsername("");
        setPassword("");
        navigate("/");
      } else {
        setMessage("Usuario o contraseña incorrectos!!");
        setTimeout(() => setMessage(""), 1700);
      }

      setMessage("");
      console.log("Login enviado:", { MAIL, PASS });
    } catch (error: unknown) {
      console.log(error);
      setMessage("Error de conexion en el servidor...");
      setTimeout(() => setMessage(""), 1700);
    }
  };

  return (
    <div className="register-container">
      <div className="register-card">
        <h1>REGISTRO</h1>

        {message && <p className="register-error">{message}</p>}

        <form onSubmit={handleS}>
          <div className="register-group">
            <input
              type="text"
              value={MAIL}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Usuario"
            />
          </div>

          <div className="register-group">
            <input
              type="password"
              value={PASS}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••"
            />
          </div>

          <button className="register-btn" type="submit">
            Registrarte
          </button>
        </form>
      </div>
    </div>
  );
}

export default Register;
