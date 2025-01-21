import React, { useState, useEffect } from "react";
import axios from "axios";
import LeftSideBar from "../organism/LeftSideBar";

const Sales = ({ setOnLogin }) => {
  const [invoices, setInvoices] = useState([]);
  const [filteredInvoices, setFilteredInvoices] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterDate, setFilterDate] = useState("");
  const [filterUser, setFilterUser] = useState("");
  const [filterAmount, setFilterAmount] = useState("");

  useEffect(() => {
    // Función para obtener facturas desde la API
    const fetchInvoices = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/facturasVentas"
        ); // Ajusta la URL a tu servidor
        setInvoices(response.data);
        setFilteredInvoices(response.data);
      } catch (error) {
        console.error("Error fetching invoices:", error);
      }
    };

    fetchInvoices();
  }, []);

  const filterInvoices = () => {
    let filtered = invoices;
    if (searchQuery) {
      filtered = filtered.filter((invoice) =>
        invoice.id.toString().includes(searchQuery)
      );
    }
    if (filterDate) {
      filtered = filtered.filter((invoice) =>
        invoice.date.includes(filterDate)
      );
    }
    if (filterUser) {
      filtered = filtered.filter((invoice) =>
        invoice.user.toLowerCase().includes(filterUser.toLowerCase())
      );
    }
    if (filterAmount) {
      filtered = filtered.filter(
        (invoice) => invoice.amount >= parseFloat(filterAmount)
      );
    }
    setFilteredInvoices(filtered);
  };

  // Función para calcular las ganancias totales (diario, semanal, etc.)
  const calculateTotalEarnings = (interval) => {
    let total = 0;
    filteredInvoices.forEach((invoice) => {
      const date = new Date(invoice.date);
      const now = new Date();
      let isInRange = false;

      switch (interval) {
        case "daily":
          isInRange = date.toDateString() === now.toDateString();
          break;
        case "weekly":
          const diffDays = Math.floor((now - date) / (1000 * 3600 * 24));
          isInRange = diffDays <= 7;
          break;
        case "monthly":
          isInRange =
            date.getMonth() === now.getMonth() &&
            date.getFullYear() === now.getFullYear();
          break;
        case "yearly":
          isInRange = date.getFullYear() === now.getFullYear();
          break;
        default:
          break;
      }

      if (isInRange) {
        total += invoice.amount;
      }
    });
    return total;
  };

  return (
    <div className="hide-print flex flex-row h-screen antialiased text-blue-gray-800">
      <LeftSideBar setOnLogin={setOnLogin}/>
      <div class="p-5">
        <div class="flex gap-2 mb-5">
          <input
            type="text"
            placeholder="Buscar factura..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <input
            type="date"
            value={filterDate}
            onChange={(e) => setFilterDate(e.target.value)}
          />
          <input
            type="text"
            placeholder="Filtrar por usuario"
            value={filterUser}
            onChange={(e) => setFilterUser(e.target.value)}
          />
          <input
            type="number"
            placeholder="Filtrar por monto"
            value={filterAmount}
            onChange={(e) => setFilterAmount(e.target.value)}
          />
          <button onClick={filterInvoices}>Aplicar filtros</button>
        </div>

        <div class="mb-5">
          <p>Total Ganancias - Diario: ${calculateTotalEarnings("daily")}</p>
          <p>Total Ganancias - Semanal: ${calculateTotalEarnings("weekly")}</p>
          <p>Total Ganancias - Mensual: ${calculateTotalEarnings("monthly")}</p>
          <p>Total Ganancias - Anual: ${calculateTotalEarnings("yearly")}</p>
        </div>

        {/* Contenedor de Facturas */}
        <div className="grid grid-cols-3 gap-2 max-h-96 overflow-y-scroll">
          {filteredInvoices.map((invoice) => (
            <div
              class="border border-gray-300 p-2 rounded-lg bg-white"
              key={invoice.id}
            >
              <p>Factura ID: {invoice.id}</p>
              <p>Usuario: {invoice.usuario_nombre}</p>
              <p>Fecha: {invoice.fecha}</p>
              <p>Monto: {invoice.total}</p>
              {/* <p>Artículos: {invoice.items.join(", ")}</p> */}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Sales;
