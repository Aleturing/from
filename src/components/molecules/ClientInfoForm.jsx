import { useState, useEffect } from "react";
import axios from "axios";

const ClientInfoForm = ({ clientInfo, setClientInfo }) => {
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");

  // Si quieres cargar los datos de un cliente existente al montar:
  useEffect(() => {
    if (clientInfo.id) {
      setMsg(""); // limpia mensajes anteriores
    }
  }, [clientInfo.id]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Si es el campo de teléfono, filtra solo números
    if (name === "telefono") {
      const soloNumeros = value.replace(/\D/g, ""); // elimina todo lo que no sea dígito
      setClientInfo({ ...clientInfo, [name]: soloNumeros });
    } else {
      setClientInfo({ ...clientInfo, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMsg("");

    try {
      if (clientInfo.id) {
        // Actualizar cliente existente
        await axios.put(
          `https://back-bakend2.onrender.com/api/clientes/${clientInfo.id}`,
          {
            nombre: clientInfo.nombre,
            cedula: clientInfo.cedula,
            telefono: clientInfo.telefono,
          }
        );
        setMsg("Cliente actualizado correctamente.");
      } else {
        // Crear nuevo cliente
        const { data } = await axios.post(
          "https://back-bakend2.onrender.com/api/clientes",
          {
            nombre: clientInfo.nombre,
            cedula: clientInfo.cedula,
            telefono: clientInfo.telefono,
          }
        );
        // data.id proviene del controlador: res.status(201).json({ id });
        setClientInfo((prev) => ({ ...prev, id: data.id }));
        setMsg("Cliente creado correctamente.");
      }
    } catch (error) {
      console.error("Error guardando cliente:", error);
      setMsg("Hubo un problema al guardar el cliente.");
    } finally {
      setLoading(false);
    }
  };
  return (
    <form onSubmit={handleSubmit} className="p-4 border-b border-gray-300">
      <h2 className="text-lg font-semibold mb-2">
        {clientInfo.id ? "Editar Cliente" : "Datos del Cliente"}
      </h2>

      <div className="space-y-3">
        <input
          type="text"
          name="nombre"
          value={clientInfo.nombre || ""}
          onChange={handleChange}
          placeholder="Nombre"
          className="w-full p-2 border rounded-lg"
          required
        />

        <input
          type="text"
          name="cedula"
          value={clientInfo.cedula || ""}
          onChange={handleChange}
          placeholder="Cédula o RIF"
          className="w-full p-2 border rounded-lg"
          required
        />

        <input
          type="tel"
          name="telefono"
          value={clientInfo.telefono || ""}
          onChange={handleChange}
          placeholder="Teléfono"
          className="w-full p-2 border rounded-lg"
          required
        />

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50"
          disabled={loading}
        >
          {loading
            ? clientInfo.id
              ? "Actualizando..."
              : "Guardando..."
            : clientInfo.id
            ? "Actualizar Cliente"
            : "Guardar Cliente"}
        </button>

        {msg && (
          <p
            className={`mt-2 text-sm ${
              msg.includes("correctamente") ? "text-green-600" : "text-red-600"
            }`}
          >
            {msg}
          </p>
        )}
      </div>
    </form>
  );
};

export default ClientInfoForm;
