import React, { useState, useEffect } from "react";
import axios from "axios";
import LeftSideBar from "../organism/LeftSideBar";

function UserForm({ addUser }) {
  const [nombre, setNombre] = useState("");
  const [contraseña, setContraseña] = useState("");
  const [correo, setCorreo] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (nombre && contraseña && correo) {
      addUser({ nombre, contraseña, correo }, isAdmin);
      setNombre("");
      setContraseña("");
      setCorreo("");
      setIsAdmin(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 mt-4">
      <h2 className="text-2xl font-semibold">Crear Usuario</h2>
      <div>
        <label htmlFor="nombre" className="block text-lg">
          Nombre de Usuario
        </label>
        <input
          id="nombre"
          type="text"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          placeholder="Ingresa el nombre de usuario"
          className="w-full p-2 border rounded"
          required
        />
      </div>
      <div>
        <label htmlFor="correo" className="block text-lg">
          Correo Electrónico
        </label>
        <input
          id="correo"
          type="email"
          value={correo}
          onChange={(e) => setCorreo(e.target.value)}
          placeholder="Ingresa el correo electrónico"
          className="w-full p-2 border rounded"
          required
        />
      </div>
      <div>
        <label htmlFor="contraseña" className="block text-lg">
          Contraseña
        </label>
        <input
          id="contraseña"
          type="password"
          value={contraseña}
          onChange={(e) => setContraseña(e.target.value)}
          placeholder="Ingresa la contraseña"
          className="w-full p-2 border rounded"
          required
        />
      </div>
      <div>
        <label htmlFor="isAdmin" className="block text-lg">
          ¿Es administrador?
        </label>
        <input
          id="isAdmin"
          type="checkbox"
          checked={isAdmin}
          onChange={(e) => setIsAdmin(e.target.checked)}
          className="mr-2"
        />
        <span>{isAdmin ? "Sí" : "No"}</span>
      </div>
      <button
        type="submit"
        className="w-full bg-blue-500 text-white p-2 rounded"
      >
        Crear Usuario
      </button>
    </form>
  );
}

function User({ user, deleteUser, editUser }) {
  const [isEditing, setIsEditing] = useState(false);
  const [nombre, setNombre] = useState(user.nombre);
  const [correo, setCorreo] = useState(user.correo);

  const handleEdit = () => {
    if (isEditing) {
      editUser(user.id, { nombre, correo });
    }
    setIsEditing(!isEditing);
  };

  return (
    <div className="p-4 border-b flex items-center justify-between">
      {isEditing ? (
        <div className="flex flex-col space-y-2 w-full">
          <input
            type="text"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            className="p-2 border rounded w-full"
          />
          <input
            type="email"
            value={correo}
            onChange={(e) => setCorreo(e.target.value)}
            className="p-2 border rounded w-full"
          />
        </div>
      ) : (
        <div>
          <h3 className="text-xl font-semibold">{user.nombre}</h3>
          <p className="text-sm text-gray-500">{user.correo}</p>
        </div>
      )}
      <div className="flex space-x-2">
        <button
          onClick={handleEdit}
          className="bg-yellow-500 text-white px-4 py-2 rounded"
        >
          {isEditing ? "Guardar" : "Editar"}
        </button>
        <button
          onClick={() => deleteUser(user.id)}
          className="bg-red-500 text-white px-4 py-2 rounded"
        >
          Eliminar
        </button>
      </div>
    </div>
  );
}

function Users({ setOnLogin }) {
  const [users, setUsers] = useState([]);
  const [administradores, setAdministradores] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false);

  const getUsers = async () => {
    try {
      const response = await axios.get("https://back-bakend2.onrender.com/api/usuarios");
      setUsers(response.data);
    } catch (error) {
      console.error("Error al obtener usuarios:", error);
    }
  };

  const getAdmins = async () => {
    try {
      const response = await axios.get(
        "https://back-bakend2.onrender.com/api/administradores"
      );
      setAdministradores(response.data);
    } catch (error) {
      console.error("Error al obtener los administradores:", error);
    }
  };

  const addUser = async (userData, isAdmin) => {
    try {
      const response = await axios.post(
        "https://back-bakend2.onrender.com/api/usuarios",
        userData
      );

      if (isAdmin) {
        await axios.post("https://back-bakend2.onrender.com/api/administradores", {
          usuario_id: response.data.id,
          nivel_acceso: "admin",
        });
        getAdmins();
      }
      getUsers();
    } catch (error) {
      console.error("Error al agregar usuario:", error);
    }
  };

  const deleteUser = async (id) => {
    try {
      // Verificar si el usuario es administrador
      const adminAEliminar = administradores.find(admin => admin.usuario_id === id);
      
      // Si es administrador, eliminarlo primero de esa tabla
      if (adminAEliminar) {
        await axios.delete(`https://back-bakend2.onrender.com/api/administradores/${adminAEliminar.id}`);
      }
      
      // Luego eliminar el usuario
      await axios.delete(`https://back-bakend2.onrender.com/api/usuarios/${id}`);
      
      // Actualizar ambas listas
      getUsers();
      getAdmins();
    } catch (error) {
      console.error("Error al eliminar usuario:", error);
    }
  };

  const editUser = async (id, userData) => {
    try {
      await axios.put(`https://back-bakend2.onrender.com/api/usuarios/${id}`, userData);
      getUsers();
    } catch (error) {
      console.error("Error al editar usuario:", error);
    }
  };

  useEffect(() => {
    getUsers();
    getAdmins();
    const loggedInUser = { role: "admin" };
    setIsAdmin(loggedInUser.role === "admin");
  }, []);

  function obtenerUsuariosNoAdministradores(usuarios, administradores) {
    const idsAdministradores = administradores.map((admin) => admin.usuario_id);
    return usuarios.filter(
      (usuario) => !idsAdministradores.includes(usuario.id)
    );
  }

  function obtenerUsuariosAdministradores(usuarios, administradores) {
    const idsAdministradores = administradores.map((admin) => admin.usuario_id);
    return usuarios.filter((usuario) =>
      idsAdministradores.includes(usuario.id)
    );
  }

  const usuariosNoAdministradores = obtenerUsuariosNoAdministradores(
    users,
    administradores
  );
  const usuariosAdministradores = obtenerUsuariosAdministradores(
    users,
    administradores
  );

  return (
    <div className="hide-print flex flex-row h-screen antialiased text-blue-gray-800">
      <LeftSideBar setOnLogin={setOnLogin} />
      <div className="max-w-5xl mx-auto my-8">
        <UserForm addUser={addUser} isAdmin={isAdmin} />
        {isAdmin && (
          <div className="mt-8 grid grid-cols-2 gap-8">
            <div className="overflow-y-auto max-h-96 border p-4 rounded shadow">
              <h2 className="text-2xl font-semibold mb-4">Administradores</h2>
              {usuariosAdministradores.length === 0 ? (
                <p>No hay administradores registrados.</p>
              ) : (
                usuariosAdministradores.map((user) => (
                  <User
                    key={user.id}
                    user={user}
                    deleteUser={deleteUser}
                    editUser={editUser}
                  />
                ))
              )}
            </div>
            <div className="overflow-y-auto max-h-96 border p-4 rounded shadow">
              <h2 className="text-2xl font-semibold mb-4">Usuarios</h2>
              {usuariosNoAdministradores.length === 0 ? (
                <p>No hay usuarios registrados.</p>
              ) : (
                usuariosNoAdministradores.map((user) => (
                  <User
                    key={user.id}
                    user={user}
                    deleteUser={deleteUser}
                    editUser={editUser}
                  />
                ))
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Users;