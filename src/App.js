import "./App.css";
import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Sales from "./components/pages/Sales";
import Users from "./components/pages/Users";
import Operations from "./components/pages/Operations";
import Products from "./components/pages/Products";
import Login from "./components/pages/Login";
import axios from "axios";

function App() {
  const [loading, setLoading] = useState(true);
  const [hasAdmin, setHasAdmin] = useState(false);
  const [onLogin, setOnLogin] = useState({});


  const checkAdmins = async () => {
    try {
      // Realiza una consulta para verificar si existen registros en la tabla "administrador"
      const response = await axios.get(
        "https://back-bakend2.onrender.com/api/administradores"
      ); // Ajusta la URL según tu API
      setHasAdmin(response.data.length > 0); // Si hay registros, hay administradores
    } catch (error) {
      console.error("Error al verificar administradores:", error);
    } finally {
      setLoading(false); // Marca que se ha completado la carga
    }
  };
  useEffect(() => {
    checkAdmins();
  }, []);

  if (loading) {
    // Mientras se verifica si hay administradores, puedes mostrar un spinner o mensaje de carga.
    return <div className="App">Cargando...</div>;
  }

  return (
    <Router>
      <div className="App">
        <Routes>
          {/* Redirigir a Users si no hay administradores */}
          <Route
            path="/"
            element={!
              onLogin?.nombre ?  (
                <Login onLogin={setOnLogin} />
              ) : (
                <Users setOnLogin={setOnLogin} />
              )
            }
          />

          {/* Otras rutas */}
          <Route
            path="/users"
            element={
              onLogin?.nombre ? (
                <Users setOnLogin={setOnLogin} />
              ) : (
                <Login onLogin={setOnLogin} />
              )
            }
          />
          <Route
            path="/operations"
            element={
              onLogin?.nombre ? (
                <Operations onLogin={onLogin} setOnLogin={setOnLogin} />
              ) : (
                <Login onLogin={setOnLogin} />
              )
            }
          />
          <Route
            path="/products"
            element={
              onLogin?.nombre ? (
                <Products setOnLogin={setOnLogin} />
              ) : (
                <Login onLogin={setOnLogin} />
              )
            }
          />
          <Route
            path="/login"
            element={
              onLogin?.nombre ? (
                <Operations onLogin={onLogin} setOnLogin={setOnLogin} />
              ) : (
                <Login onLogin={setOnLogin} />
              )
            }
          />
          <Route
            path="/sales"
            element={
              onLogin?.nombre ? (
                <Sales setOnLogin={setOnLogin} />
              ) : (
                <Login onLogin={setOnLogin} />
              )
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
