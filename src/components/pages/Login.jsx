import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login({ onLogin }) {
  const [formData, setFormData] = useState({ nombre: "", contraseña: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

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

  const renderLogo = () => {
    const renderWord = (word) =>
      word.split("").map((char, index) => (
        <div
          key={index}
          className="bg-blue-600 text-white text-6xl font-bold px-4 py-2 border-r border-white last:border-r-0"
        >
          {char}
        </div>
      ));

    return (
      <div className="mb-8 flex flex-col items-center">
        <div className="flex">{renderWord("PREVER")}</div>
        <div className="h-2"></div>
        <div className="flex">
          {renderWord("BUSSINE")}
          <div className="w-2"></div>
          <div className="bg-blue-600 text-white text-6xl font-bold px-4 py-2">
            C.A
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="flex flex-col items-center justify-start min-h-screen bg-gray-100 pt-10">
      {renderLogo()}

      <div className="bg-white p-8 shadow-md rounded-md max-w-sm w-full mt-6">
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
            <label
              htmlFor="contraseña"
              className="block text-lg font-medium mb-2"
            >
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
