import { useState } from "react";
import axios from "axios";

const ClientInfoForm = ({ clientInfo, setClientInfo }) => {
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");
  const [formBloqueado, setFormBloqueado] = useState(true);
  const [cedulaInput, setCedulaInput] = useState(clientInfo.cedula || "");
  const [cedulaBloqueada, setCedulaBloqueada] = useState(false);
  const [busquedaRealizada, setBusquedaRealizada] = useState(false);
  const [modoEdicion, setModoEdicion] = useState(false); // NUEVO: controla si está en modo editar

  const buscarClientePorCedula = async () => {
    const cedula = cedulaInput.trim();
    if (!cedula || cedula.length < 6) {
      setMsg("Ingrese una cédula o RIF válido para buscar.");
      return;
    }
    setLoading(true);
    setMsg("");
    try {
      const { data } = await axios.get(
        `https://back-bakend2.onrender.com/api/clientes/cedula/${cedula}`
      );

      if (data) {
        setClientInfo({
          id: data.id,
          nombre: data.nombre,
          cedula: data.cedula,
          telefono: data.telefono,
          direccion: data.direccion,
        });
        setCedulaInput(data.cedula);
        setCedulaBloqueada(true); // Cédula bloqueada si cliente existe
        setFormBloqueado(true); // Campos bloqueados inicialmente (modo sólo lectura)
        setModoEdicion(false); // No en edición
        setMsg("Cliente encontrado.");
      } else {
        setClientInfo({
          id: null,
          cedula,
          nombre: "",
          telefono: "",
          direccion: "",
        });
        setCedulaBloqueada(false);
        setFormBloqueado(false); // desbloqueado para nuevo cliente
        setModoEdicion(true); // modo edición para nuevo cliente
        setMsg("Nuevo cliente. Complete los datos.");
      }
    } catch (error) {
      setClientInfo({
        id: null,
        cedula,
        nombre: "",
        telefono: "",
        direccion: "",
      });
      setCedulaBloqueada(false);
      setFormBloqueado(false);
      setModoEdicion(true);
      setMsg("Nuevo cliente. Complete los datos.");
    } finally {
      setLoading(false);
      setBusquedaRealizada(true);
    }
  };

  const limpiarFormulario = () => {
    setClientInfo({
      id: null,
      cedula: "",
      nombre: "",
      telefono: "",
      direccion: "",
    });
    setCedulaInput("");
    setCedulaBloqueada(false);
    setFormBloqueado(true);
    setModoEdicion(false);
    setMsg("");
    setBusquedaRealizada(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "cedula") {
      setCedulaInput(value);
    } else {
      if (name === "telefono") {
        const soloNumeros = value.replace(/\D/g, "");
        setClientInfo({ ...clientInfo, [name]: soloNumeros });
      } else {
        setClientInfo({ ...clientInfo, [name]: value });
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!modoEdicion) {
      // Si no está en modo edición, el botón sirve para activar edición
      setFormBloqueado(false);
      setModoEdicion(true);
      setMsg("Modo edición activado. Modifique los datos y guarde.");
      return;
    }

    // Si está en modo edición, guardamos cambios
    setLoading(true);
    setMsg("");

    try {
      const payload = {
        cedula: clientInfo.cedula,
        nombre: clientInfo.nombre,
        telefono: clientInfo.telefono,
        direccion: clientInfo.direccion,
      };

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
        setCedulaBloqueada(true);
        setMsg("Cliente creado correctamente.");
      }

      setFormBloqueado(true);
      setModoEdicion(false);
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
          name="cedula"
          value={cedulaInput}
          onChange={handleChange}
          placeholder="Cédula o RIF"
          className="w-full p-2 border rounded-lg"
          disabled={cedulaBloqueada}
          required
        />

        <button
          type="button"
          onClick={buscarClientePorCedula}
          disabled={loading || !cedulaInput.trim()}
          className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
        >
          {loading ? "Buscando..." : "Buscar Cliente"}
        </button>

        <input
          type="text"
          name="nombre"
          value={clientInfo.nombre || ""}
          onChange={handleChange}
          placeholder="Nombre"
          className="w-full p-2 border rounded-lg"
          disabled={formBloqueado}
          required
        />

        <input
          type="tel"
          name="telefono"
          value={clientInfo.telefono || ""}
          onChange={handleChange}
          placeholder="Teléfono"
          className="w-full p-2 border rounded-lg"
          disabled={formBloqueado}
          required
        />

        <input
          type="text"
          name="direccion"
          value={clientInfo.direccion || ""}
          onChange={handleChange}
          placeholder="Dirección"
          className="w-full p-2 border rounded-lg"
          disabled={formBloqueado}
        />

        <div className="flex space-x-2 mt-2">
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50 flex-grow"
            disabled={loading}
          >
            {loading
              ? modoEdicion
                ? clientInfo.id
                  ? "Guardando..."
                  : "Guardando..."
                : "Procesando..."
              : modoEdicion
              ? clientInfo.id
                ? "Guardar"
                : "Guardar"
              : "Actualizar"}
          </button>

          <button
            type="button"
            onClick={limpiarFormulario}
            className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 flex-grow"
          >
            Limpiar
          </button>
        </div>

        {msg && (
          <p
            className={`mt-2 text-sm ${
              msg.includes("correctamente") ? "text-green-600" : "text-yellow-600"
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
