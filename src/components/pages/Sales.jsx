// src/components/pages/Sales.jsx
import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import ReactToPrint from "react-to-print";
import LeftSideBar from "../organism/LeftSideBar";

const Sales = ({ setOnLogin }) => {
  const [invoices, setInvoices] = useState([]);
  const [filteredInvoices, setFilteredInvoices] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterDate, setFilterDate] = useState("");
  const [filterUser, setFilterUser] = useState("");
  const [filterAmount, setFilterAmount] = useState("");
  const printRef = useRef();

  // Carga inicial de facturas
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

  // Filtrado reactivo
  useEffect(() => {
    let result = invoices;
    if (searchQuery) {
      result = result.filter(inv =>
        inv.id.toString().includes(searchQuery)
      );
    }
    if (filterDate) {
      result = result.filter(inv => inv.fecha.includes(filterDate));
    }
    if (filterUser) {
      result = result.filter(inv =>
        inv.usuario_nombre.toLowerCase().includes(filterUser.toLowerCase())
      );
    }
    if (filterAmount) {
      result = result.filter(inv => inv.total >= parseFloat(filterAmount));
    }
    setFilteredInvoices(result);
  }, [invoices, searchQuery, filterDate, filterUser, filterAmount]);

  // Cálculo de totales
  const calculateTotalEarnings = interval => {
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
      }
      return include ? sum + inv.total : sum;
    }, 0);
  };

  // Formatea fecha para impresión
  const formatDate = iso => {
    const d = new Date(iso);
    return d.toLocaleDateString() + " " + d.toLocaleTimeString();
  };

  return (
    <div className="hide-print flex h-screen text-blue-gray-800 antialiased">
      <LeftSideBar setOnLogin={setOnLogin} />

      <main className="flex-1 p-5 overflow-auto">
        {/* Botón de impresión */}
        <div className="mb-4">
          <ReactToPrint
            trigger={() => (
              <button className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
                🖨️ Imprimir todas las facturas
              </button>
            )}
            content={() => printRef.current}
            pageStyle="@page { size: auto; margin: 20mm; }"
          />
        </div>

        {/* Contenido oculto para imprimir */}
        <div className="hidden" ref={printRef}>
          <h1 className="text-2xl font-bold mb-4">Listado de Facturas</h1>
          {filteredInvoices.map(inv => (
            <div key={inv.id} className="mb-4 border-b pb-2">
              <p><strong>ID:</strong> {inv.id}</p>
              <p><strong>Usuario:</strong> {inv.usuario_nombre}</p>
              <p><strong>Fecha:</strong> {formatDate(inv.fecha)}</p>
              <p><strong>Total:</strong> ${inv.total.toFixed(2)}</p>
              <p><strong>IVA:</strong> {inv.IVA}</p>
            </div>
          ))}
        </div>

        {/* Filtros */}
        <div className="flex gap-2 mb-5">
          <input
            type="text"
            placeholder="Buscar factura..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="border p-2 rounded"
          />
          <input
            type="date"
            value={filterDate}
            onChange={e => setFilterDate(e.target.value)}
            className="border p-2 rounded"
          />
          <input
            type="text"
            placeholder="Filtrar por usuario"
            value={filterUser}
            onChange={e => setFilterUser(e.target.value)}
            className="border p-2 rounded"
          />
          <input
            type="number"
            placeholder="Filtrar por monto"
            value={filterAmount}
            onChange={e => setFilterAmount(e.target.value)}
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

        {/* Grid de facturas */}
        <div className="grid grid-cols-3 gap-2 max-h-96 overflow-y-scroll">
          {filteredInvoices.map(inv => (
            <div
              key={inv.id}
              className="border border-gray-300 p-2 rounded-lg bg-white"
            >
              <p>Factura ID: {inv.id}</p>
              <p>Usuario: {inv.usuario_nombre}</p>
              <p>Fecha: {inv.fecha}</p>
              <p>
                Total: ${inv.total.toFixed(2)} — IVA: {inv.IVA}
              </p>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default Sales;
