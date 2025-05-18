import { useState, useEffect } from "react";
import axios from "axios";

const ClientInfoForm = ({ clientInfo, setClientInfo }) => {
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");

  // Buscar cliente por cédula/RIF
  useEffect(() => {
    const buscarClientePorCedula = async () => {
      if (clientInfo.cedula && clientInfo.cedula.length >= 6) {
        try {
          const { data } = await axios.get(
            `https://back-bakend2.onrender.com/api/clientes/cedula/${clientInfo.cedula}`
          );

          if (data) {
            setClientInfo({
              id: data.id,
              nombre: data.nombre,
              cedula: data.cedula,
              telefono: data.telefono,
              direccion: data.direccion,
            });
            setMsg("Cliente encontrado.");
          }
        } catch (err) {
          // Si no existe, limpia el ID y el mensaje
          setClientInfo((prev) => ({ ...prev, id: null }));
          setMsg("Cliente no registrado.");
        }
      }
    };

    buscarClientePorCedula();
  }, [clientInfo.cedula]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "telefono") {
      const soloNumeros = value.replace(/\D/g, "");
      setClientInfo({ ...clientInfo, [name]: soloNumeros });
    } else {
      setClientInfo({ ...clientInfo, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMsg("");

    const payload = {
      nombre: clientInfo.nombre,
      cedula: clientInfo.cedula,
      telefono: clientInfo.telefono,
      direccion: clientInfo.direccion,
    };

    try {
      if (clientInfo.id) {
        await axios.put(
          `https://back-bakend2.onrender.com/api/clientes/${clientInfo.id}`,
          payload
        );
        setMsg("Cliente actualizado correctamente.");
      } else {
        const { data } = await axios.post(
          "https://back-bakend2.onrender.com/api/clientes",
          payload
        );
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

        <input
          type="text"
          name="direccion"
          value={clientInfo.direccion || ""}
          onChange={handleChange}
          placeholder="Dirección"
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
              msg.includes("correctamente") || msg === "Cliente encontrado."
                ? "text-green-600"
                : "text-red-600"
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
