import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useReactToPrint } from "react-to-print";
import LeftSideBar from "../organism/LeftSideBar";
import PrintSalesFormat from "../organism/PrintSalesFormat";

const Sales = ({ setOnLogin }) => {
  const [invoices, setInvoices] = useState([]);
  const [filteredInvoices, setFilteredInvoices] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterDate, setFilterDate] = useState("");
  const [filterUser, setFilterUser] = useState("");
  const [filterAmount, setFilterAmount] = useState("");
  const contentRef = useRef(null);
  const reactToPrintFn = useReactToPrint({ contentRef });

  const printRef = useRef();

  useEffect(() => {
    const fetchInvoices = async () => {
      try {
        const { data } = await axios.get(
          "https://back-bakend2.onrender.com/api/facturasVentas"
        );
        setInvoices(data);
        setFilteredInvoices(data);
      } catch (err) {
        console.error("Error fetching invoices:", err);
      }
    };
    fetchInvoices();
  }, []);

  useEffect(() => {
    let result = invoices;
    if (searchQuery) {
      result = result.filter((inv) => inv.id?.toString().includes(searchQuery));
    }
    if (filterDate) {
      result = result.filter((inv) => inv.fecha?.includes(filterDate));
    }
    if (filterUser) {
      result = result.filter((inv) =>
        inv.usuario_nombre?.toLowerCase().includes(filterUser.toLowerCase())
      );
    }
    if (filterAmount) {
      result = result.filter(
        (inv) => parseFloat(inv.total || 0) >= parseFloat(filterAmount)
      );
    }
    setFilteredInvoices(result);
  }, [invoices, searchQuery, filterDate, filterUser, filterAmount]);

  const calculateTotalEarnings = (interval) => {
    const now = new Date();
    return filteredInvoices.reduce((sum, inv) => {
      const date = new Date(inv.fecha);
      let include = false;
      switch (interval) {
        case "daily":
          include = date.toDateString() === now.toDateString();
          break;
        case "weekly":
          include = (now - date) / (1000 * 3600 * 24) <= 7;
          break;
        case "monthly":
          include =
            date.getMonth() === now.getMonth() &&
            date.getFullYear() === now.getFullYear();
          break;
        case "yearly":
          include = date.getFullYear() === now.getFullYear();
          break;
        default:
          break;
      }
      return include ? sum + parseFloat(inv.total || 0) : sum;
    }, 0);
  };

  const formatDate = (iso) => {
    const d = new Date(iso);
    return d.toLocaleDateString() + " " + d.toLocaleTimeString();
  };

  const handlePrint = () => {
    reactToPrintFn(); // Inicia la impresión
  };

  return (
    <div className="hide-print flex h-screen text-blue-gray-800 antialiased">
      <LeftSideBar setOnLogin={setOnLogin} />

      <main className="flex-1 p-5 overflow-auto">
        {/* Botón de impresión */}
        <div className="mb-4">
          <button
            onClick={handlePrint}
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
          >
            🖨️ Imprimir resumen de ventas
          </button>
        </div>

        {/* Contenido para imprimir */}
        <div className="hidden print:block text-black" ref={printRef}>
          <div className="p-5">
            <h1 className="text-2xl font-bold mb-4 text-center">
              Resumen de Ventas
            </h1>

            <div className="mb-4">
              <p>
                <strong>Total Diario:</strong> $
                {calculateTotalEarnings("daily").toFixed(2)}
              </p>
              <p>
                <strong>Total Semanal:</strong> $
                {calculateTotalEarnings("weekly").toFixed(2)}
              </p>
              <p>
                <strong>Total Mensual:</strong> $
                {calculateTotalEarnings("monthly").toFixed(2)}
              </p>
              <p>
                <strong>Total Anual:</strong> $
                {calculateTotalEarnings("yearly").toFixed(2)}
              </p>
            </div>

            <div className="mt-6 border-t pt-4">
              <p className="text-lg font-semibold">
                Total general: $
                {filteredInvoices
                  .reduce((acc, curr) => acc + parseFloat(curr.total || 0), 0)
                  .toFixed(2)}
              </p>
              <p className="text-sm text-gray-600">
                Total de facturas: {filteredInvoices.length}
              </p>
            </div>
          </div>
        </div>

        {/* Filtros */}
        <div className="flex gap-2 mb-5">
          <input
            type="text"
            placeholder="Buscar factura..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="border p-2 rounded"
          />
          <input
            type="date"
            value={filterDate}
            onChange={(e) => setFilterDate(e.target.value)}
            className="border p-2 rounded"
          />
          <input
            type="text"
            placeholder="Filtrar por usuario"
            value={filterUser}
            onChange={(e) => setFilterUser(e.target.value)}
            className="border p-2 rounded"
          />
          <input
            type="number"
            placeholder="Filtrar por monto"
            value={filterAmount}
            onChange={(e) => setFilterAmount(e.target.value)}
            className="border p-2 rounded"
          />
        </div>

        {/* Totales */}
        <div className="mb-5 space-y-1">
          <p>Total Diario: ${calculateTotalEarnings("daily").toFixed(2)}</p>
          <p>Total Semanal: ${calculateTotalEarnings("weekly").toFixed(2)}</p>
          <p>Total Mensual: ${calculateTotalEarnings("monthly").toFixed(2)}</p>
          <p>Total Anual: ${calculateTotalEarnings("yearly").toFixed(2)}</p>
        </div>

        {/* Lista de facturas */}
        <div className="grid grid-cols-3 gap-2 max-h-96 overflow-y-scroll">
          {filteredInvoices.map((inv) => (
            <div
              key={inv.id}
              className="border border-gray-300 p-2 rounded-lg bg-white"
            >
              <p>Factura ID: {inv.id}</p>
              <p>Usuario: {inv.usuario_nombre}</p>
              <p>Fecha: {formatDate(inv.fecha)}</p>
              <p>Total: ${parseFloat(inv.total || 0).toFixed(2)}</p>
              <p>IVA: {inv.IVA}</p>
            </div>
          ))}
        </div>

        {/* Contenido oculto para impresión */}
        <div style={{ display: "none" }}>
          <PrintSalesFormat
            ref={contentRef}
            invoices={filteredInvoices}
            user={filterUser}
            date={filterDate}
            amount={filterAmount}
          />
        </div>
      </main>
    </div>
  );
};

export default Sales;
