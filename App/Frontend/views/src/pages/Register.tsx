//Register.tsx

import { useState } from "react";
import "../Styles/Register.css";

function Register() {
  const [USER, setUser] = useState("");
  const [PASSWORD, setPass] = useState("");
  const [message, setMessage] = useState("");

  const handleS = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");

    if (!USER || !PASSWORD) {
      setMessage("Debes completar todos los campos");
      setTimeout(() => setMessage(""), 1700);
      return;
    }

    setMessage("");
    console.log("Usuario Registrado:", { USER, PASSWORD });
  };

  return (
    <body>
      <div className="register-container">
        <div className="register-card">
          <h1>REGISTRO</h1>

          {message && <p className="register-error">{message}</p>}

          <form onSubmit={handleS}>
            <div className="register-group">
              <input
                type="text"
                value={USER}
                onChange={(e) => setUser(e.target.value)}
                placeholder="Usuario"
              />
            </div>

            <div className="register-group">
              <input
                type="password"
                value={PASSWORD}
                onChange={(e) => setPass(e.target.value)}
                placeholder="••••••"
              />
            </div>

            <button className="register-btn" type="submit">
              Registrarte
            </button>
          </form>
        </div>
      </div>
    </body>
  );
}

export default Register;
