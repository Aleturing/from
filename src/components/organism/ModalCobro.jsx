import React, { useState, useEffect } from "react";
import ListPay from "../atoms/ListPay";
import NewPayButton from "../atoms/NewPayButton";
import calculateTotalValue from "../../functions/calculateTotalValue";
import calculateTotalPaid from "../../functions/calculateTotalPaid";
import axios from "axios";

function ModalCobro({
  carrito,
  paid,
  setPaid,
  client,
  onLogin,
  condition,
  setIsSubmit,
  setIsPrint,
  setFacturaId,
  otrosImpuestosHabilitados,
  setOtrosImpuestosHabilitados,
  esPagoEnDivisas,
  setEsPagoEnDivisas,
}) {
  const [otrosImpuestos, setOtrosImpuestos] = useState(0);
  const [numeroDeFactura, setNumeroDeFactura] = useState(0);

  const total = calculateTotalValue(carrito);
  const paidTotal = calculateTotalPaid(paid);

  const IVA_RATE = 0.16;
  const IGTF_RATE = 0.03;
  const OTROS_RATE = 0.02;

  const iva = total * IVA_RATE;
  const igtf = esPagoEnDivisas ? total * IGTF_RATE : 0;
  const otros = otrosImpuestosHabilitados ? total * OTROS_RATE : 0;
  const totalConImpuestos = total + iva + igtf + otros;

  const cambio = paidTotal - totalConImpuestos;
  const falta = totalConImpuestos - paidTotal;
  const isPaidSufficient =
    parseFloat(paidTotal).toFixed(2) >=
    parseFloat(totalConImpuestos).toFixed(2);

  useEffect(() => {
    if (otrosImpuestosHabilitados) {
      setOtrosImpuestos(total * OTROS_RATE);
    } else {
      setOtrosImpuestos(0);
    }
  }, [otrosImpuestosHabilitados, total]);

  useEffect(() => {
    const pagoEnDivisasSeleccionado = paid.some(
      (pago) => pago.mtd === "Pago en Divisas"
    );

    setEsPagoEnDivisas(pagoEnDivisasSeleccionado);
  }, [paid]);

  useEffect(() => {
    if (condition) {
      obtenerUltimoNumeroFactura();
    }
  }, [condition]);

  const obtenerUltimoNumeroFactura = async () => {
    try {
      const response = await axios.get(
        "https://back-bakend2.onrender.com/api/facturasVentas/ultimo-numero"
      );
      setNumeroDeFactura(response.data.ultimo_numero_factura);
    } catch (error) {
      console.error("Error al obtener el último número de factura:", error);
    }
  };

  const postRequest = async (url, data) => {
    try {
      const response = await axios.post(
        `https://back-bakend2.onrender.com/api${url}`,
        data
      );
      return response.data;
    } catch (error) {
      console.error(`Error en post a ${url}:`, error);
      throw error;
    }
  };

  const postFacturaVenta = async (
    cliente_id,
    total,
    usuario_id,
    tasa,
    iva,
    igtf
  ) => {
    const data = {
      cliente_id,
      fecha: new Date().toISOString().split("T")[0],
      total,
      usuario_id,
      anulada: false,
      tasa,
      iva,
      igtf,
      detalle_factura_id: null,
      devolucion_venta_id: null,
    };
    return await postRequest("/facturasVentas", data);
  };

  const postDetalleFactura = async (
    factura_compra_id,
    factura_venta_id,
    producto_id,
    cantidad,
    precio_unitario
  ) => {
    const data = {
      factura_compra_id,
      factura_venta_id,
      producto_id,
      cantidad,
      precio_unitario,
    };
    return await postRequest("/detalleFactura", data);
  };

  const printAndProceed = async () => {
    if (!isPaidSufficient) {
      alert("El monto no es suficiente para procesar el pago");
      return;
    }

    try {
      const facturaVentaResponse = await postFacturaVenta(
        client.id,
        total,
        onLogin.id,
        1,
        iva,
        igtf
      );

      for (const detalle of carrito) {
        await postDetalleFactura(
          null,
          facturaVentaResponse.id,
          detalle.id,
          detalle.stock,
          detalle.price
        );
      }

      setIsSubmit(false);
      setFacturaId(facturaVentaResponse.id);
      setIsPrint(true);
    } catch (error) {
      console.error("Error en printAndProceed:", error);
    }
  };

  const limpiarCambios = () => {
    setOtrosImpuestosHabilitados(false);
    setOtrosImpuestos(0);
    setPaid([]);
  };

  if (!condition) return null;

  return (
    <div className="fixed w-full h-screen left-0 top-0 z-10 flex justify-center items-center p-24">
      <div className="fixed glass w-full h-screen left-0 top-0 z-0"></div>
      <div
        className="rounded-3xl bg-white shadow-xl overflow-hidden z-10"
        style={{ width: "600px" }}
      >
        <div className="text-right my-3 mx-3">
          <button
            className="text-xl font-semibold"
            onClick={() => setIsSubmit(false)}
          >
            X
          </button>
        </div>
        <div
          id="receipt-content"
          className="text-left w-full text-sm p-6 overflow-auto"
        >
          <div className="text-center">
            <h2 className="text-lg font-semibold">Modos de Pago</h2>
            <p className="text-base">Papelera Prever Business C.A.</p>
          </div>
          <div className="flex mt-6 text-base">
            <div className="flex-grow">
              No: <span>{numeroDeFactura}</span>
            </div>
            <div>{/* Fecha y hora si es necesario */}</div>
          </div>
          <div className="mt-6">
            <table className="w-full text-base">
              <thead>
                <tr>
                  <th className="py-2 text-right">N</th>
                  <th className="py-2 text-left">Método de Pago</th>
                  <th className="py-2 text-right">Subtotal</th>
                </tr>
              </thead>
              <tbody>
                <ListPay paid={paid} setPaid={setPaid} />
              </tbody>
            </table>
            <NewPayButton paid={paid} setPaid={setPaid} />
          </div>
          <div className="mt-6">
            <div className="flex font-semibold text-lg">
              <div className="flex-grow">Monto a Pagar</div>
              <div className="text-xl">{total.toFixed(2)}</div>
            </div>

            <div className="flex text-base font-semibold">
              <div className="flex-grow">IVA (16%)</div>
              <div className="text-xl">{iva.toFixed(2)}</div>
            </div>

            {otrosImpuestosHabilitados && (
              <div className="flex text-base font-semibold">
                <div className="flex-grow">Otros Impuestos (2%)</div>
                <div className="text-xl">{otros.toFixed(2)}</div>
              </div>
            )}

            {esPagoEnDivisas && (
              <div className="flex text-base font-semibold">
                <div className="flex-grow">IGTF (3%)</div>
                <div className="text-xl">{igtf.toFixed(2)}</div>
              </div>
            )}

            <div className="flex font-semibold text-lg">
              <div className="flex-grow">Total a Debitar</div>
              <div className="text-xl">{totalConImpuestos.toFixed(2)}</div>
            </div>

            {cambio > 0 && (
              <div className="flex text-xl font-semibold">
                <div className="flex-grow">Cambio</div>
                <div className="text-xl">{cambio.toFixed(2)}</div>
              </div>
            )}

            {falta > 0 && (
              <div className="flex text-xl font-semibold text-red-500">
                <div className="flex-grow">Monto Insuficiente</div>
                <div className="text-xl">{falta.toFixed(2)}</div>
              </div>
            )}
          </div>
        </div>

        <div className="p-4">
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={otrosImpuestosHabilitados}
              onChange={() =>
                setOtrosImpuestosHabilitados(!otrosImpuestosHabilitados)
              }
              className="mr-2"
            />
            Agregar otros impuestos
          </label>
        </div>

        <div className="p-4 w-full">
          <button
            className="text-lg px-4 py-3 rounded-2xl w-full bg-gray-300 text-black focus:outline-none"
            onClick={limpiarCambios}
          >
            LIMPIAR
          </button>
        </div>

        <div className="p-4 w-full">
          <button
            className={`text-lg px-4 py-3 rounded-2xl w-full focus:outline-none ${
              isPaidSufficient ? "bg-cyan-500" : "bg-gray-500"
            } text-white`}
            onClick={printAndProceed}
            disabled={!isPaidSufficient}
          >
            {isPaidSufficient ? "PROCESAR" : "PAGO INSUFICIENTE"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default ModalCobro;
