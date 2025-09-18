import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login({ setUsuario }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  

  const handleLogin = async (e) => {
    e.preventDefault();

   const usuarioPrueba = {
      email: "admin@prueba.com",
      password: "123456",
      nombre: "Admin"
    };

    // Validación local
    if (email === usuarioPrueba.email && password === usuarioPrueba.password) {
      setUsuario(usuarioPrueba); // Guardar usuario logeado
      navigate("/respuestas");    // Redirigir a Respuestas
    } else {
      alert("Credenciales incorrectas");
    }
  };

  return (
    <div className="flex h-screen items-center justify-center bg-gradient-to-r from-white-200 via-blue-200 to-blue-300">
      <div className="bg-white shadow-lg rounded-2xl w-full max-w-md p-8">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Iniciar Sesión
        </h2>

        <form onSubmit={handleLogin} className="space-y-5">
          <input
            type="email"
            placeholder="Correo"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-4 py-2 border rounded-lg"
          />

          <input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full px-4 py-2 border rounded-lg"
          />

          <button
            type="submit"
            className="w-full py-2 bg-red-500 text-white font-semibold rounded-lg shadow-md hover:bg-pink-600"
          >
            Entrar
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
