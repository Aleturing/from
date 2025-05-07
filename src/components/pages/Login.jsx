import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // Importamos useNavigate

function Login({ onLogin }) {
  const [formData, setFormData] = useState({ nombre: "", contraseña: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate(); // Inicializamos useNavigate

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "https://back-bakend2.onrender.com/auth/login",
        formData
      );
      localStorage.setItem("usuario", JSON.stringify(response.data.usuario));
      onLogin(response.data.usuario);
      setError("");
      navigate("/products");
    } catch (err) {
      setError("Credenciales incorrectas, intenta de nuevo.");
    }
  };

  // Genera un array de letras para el logo
  const logoText = "PREVER".split("");

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      {/* Logo de la empresa con letra en cuadro azul */}
      <div className="flex space-x-1 mb-8">
        {logoText.map((letter, idx) => (
          <div
            key={idx}
            className="bg-blue-800 text-white text-6xl font-bold px-4 py-2 relative"
            style={{ borderRight: idx < logoText.length - 1 ? '2px solid white' : 'none' }}
          >
            {letter}
          </div>
        ))}
      </div>

      <div className="bg-white p-8 shadow-md rounded-md max-w-sm w-full">
        <h2 className="text-3xl font-semibold text-center mb-6">
          Inicio de Sesión
        </h2>
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="nombre" className="block text-lg font-medium mb-2">
              Usuario
            </label>
            <input
              type="text"
              name="nombre"
              id="nombre"
              value={formData.nombre}
              onChange={handleChange}
              required
              className="w-full p-2 border rounded"
              placeholder="Ingresa tu usuario"
            />
          </div>
          <div>
            <label htmlFor="contraseña" className="block text-lg font-medium mb-2">
              Contraseña
            </label>
            <input
              type="password"
              name="contraseña"
              id="contraseña"
              value={formData.contraseña}
              onChange={handleChange}
              required
              className="w-full p-2 border rounded"
              placeholder="Ingresa tu contraseña"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
          >
            Iniciar Sesión
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
