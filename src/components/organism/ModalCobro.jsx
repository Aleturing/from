import ListPay from "../atoms/ListPay";
import calculateTotalValue from "../../functions/calculateTotalValue";
import calculateTotalPaid from "../../functions/calculateTotalPaid";
import axios from "axios";
import { useState, useEffect } from "react";
import NewPayButton from "../atoms/NewPayButton";

function ModalCobro(p) {
  const total = calculateTotalValue(p.carrito); // total de los productos
  const paid = calculateTotalPaid(p.paid); // total pagado por el cliente

  const [otrosImpuestosHabilitados, setOtrosImpuestosHabilitados] = useState(false);
  const [otrosImpuestos, setOtrosImpuestos] = useState(0); // valor de otros impuestos
  const [numeroDeFactura, setNumeroDeFactura] = useState(0);
  const [esPagoEnDivisas, setEsPagoEnDivisas] = useState(false); // se actualizará automáticamente
  
  const iva = total * 0.16;

  // Actualiza automáticamente si existe algún pago en divisas en el array de pagos
  useEffect(() => {
    const pagoEnDivisasSeleccionado = p.paid.some((pago) => pago.mtd === "Pago en Divisas");
    setEsPagoEnDivisas(pagoEnDivisasSeleccionado);
  }, [p.paid]);

  useEffect(() => {
    if (otrosImpuestosHabilitados) {
      setOtrosImpuestos(total * 0.02); // 2% de otros impuestos
    } else {
      setOtrosImpuestos(0);
    }
  }, [otrosImpuestosHabilitados, total]);

  // Calcula IGTF solo si se seleccionó pago en divisas
  const igtf = esPagoEnDivisas ? total * 0.03 : 0;

  const postRequest = async (url, data) => {
    try {
      const response = await axios.post("https://back-bakend2.onrender.com/api" + url, data);
      return response.data;
    } catch (error) {
      console.error(`error en post a ${url}:`, error);
      throw error;
    }
  };

  const postFacturaVenta = async (cliente_id, total, usuario_id, tasa, iva, igtf) => {
    const data = { cliente_id, total, usuario_id, tasa, iva, igtf };
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

  async function obtenerUltimoNumeroFactura() {
    try {
      const response = await axios.get("https://back-bakend2.onrender.com/api/facturasVentas/ultimo-numero");
      console.log("Último número de factura:", response.data.ultimo_numero_factura);
      setNumeroDeFactura(response.data.ultimo_numero_factura);
    } catch (error) {
      console.error("Error al obtener el último número de factura:", error);
    }
  }

  const printAndProceed = async () => {
    if (paid < totalConImpuestos) {
      alert("El monto no es suficiente para procesar el pago");
      return;
    }

    try {
      const facturaVentaResponse = await postFacturaVenta(
        p.onLogin.id,
        total,
        1,
        1,
        iva,
        igtf
      );
      console.log("respuesta de factura de venta:", facturaVentaResponse);

      for (const detalle of p.carrito) {
        const detalleResponse = await postDetalleFactura(
          null,
          facturaVentaResponse.id,
          detalle.id,
          detalle.stock,
          detalle.price
        );
        console.log("respuesta de detalle de factura:", detalleResponse);
      }

      p.setPaid([]);
      p.setIsSubmit(false);
      p.setFacturaId(facturaVentaResponse.id);
      p.setIsPrint(true);
    } catch (error) {
      console.error("error en printAndProceed:", error);
    }
  };

  const totalConImpuestos = total + iva + otrosImpuestos + igtf;
  const cambio = paid - totalConImpuestos;
  const isPaidSufficient = paid >= totalConImpuestos;
  const falta = totalConImpuestos - paid;

  const limpiarCambios = () => {
    setOtrosImpuestosHabilitados(false);
    setOtrosImpuestos(0);
    p.setPaid([]);
  };

  useEffect(() => {
    if (p.condition) {
      obtenerUltimoNumeroFactura();
    }
  }, [p.condition]);

  if (p.condition) {
    return (
      <div className="fixed w-full h-screen left-0 top-0 z-10 flex justify-center items-center p-24">
        <div className="fixed glass w-full h-screen left-0 top-0 z-0"></div>
        <div className="rounded-3xl bg-white shadow-xl overflow-hidden z-10" style={{ width: "600px" }}>
          <div className="text-right my-3 mx-3">
            <button className="text-xl font-semibold" onClick={() => p.setIsSubmit(false)}>
              X
            </button>
          </div>
          <div id="receipt-content" className="text-left w-full text-sm p-6 overflow-auto">
            <div className="text-center">
              <h2 className="text-lg font-semibold">Modos de Pago</h2>
              <p className="text-base">Papelera Prever Business C.A.</p>
            </div>
            <div className="flex mt-6 text-base">
              <div className="flex-grow">
                No: <span>{numeroDeFactura}</span>
              </div>
              <div>{/* Aquí se podría colocar la fecha, si se requiere */}</div>
            </div>
            <div className="mt-6">
              <table className="w-full text-base">
                <thead>
                  <tr>
                    <th className="py-2 text-right">N</th>
                    <th className="py-2 text-left">Metodo de Pago</th>
                    <th className="py-2 text-right">Subtotal</th>
                  </tr>
                </thead>
                <tbody>
                  <ListPay paid={p.paid} setPaid={p.setPaid} />
                </tbody>
              </table>
              <NewPayButton paid={p.paid} setPaid={p.setPaid} />
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
                  <div className="text-xl">{otrosImpuestos.toFixed(2)}</div>
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

          {/* Se omite el checkbox extra para pago en divisas,
              ya que se determina automáticamente desde ListPay */}
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
              onClick={() => printAndProceed()}
              disabled={!isPaidSufficient}
            >
              {isPaidSufficient ? "PROCESAR" : "PAGO INSUFICIENTE"}
            </button>
          </div>
        </div>
      </div>
    );
  } else {
    return <></>;
  }
}

export default ModalCobro;
