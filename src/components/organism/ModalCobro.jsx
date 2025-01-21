import ListPay from "../atoms/ListPay";
import calculateTotalValue from "../../functions/calculateTotalValue";
import calculateTotalPaid from "../../functions/calculateTotalPaid";
import axios from "axios";
import { useState, useEffect } from "react";

function ModalCobro(p) {
  const total = calculateTotalValue(p.carrito); // total de los productos
  const paid = calculateTotalPaid(p.paid); // total pagado por el cliente

  // estado para controlar si otros impuestos están habilitados
  const [otrosImpuestosHabilitados, setOtrosImpuestosHabilitados] = useState(false);
  const [otrosImpuestos, setOtrosImpuestos] = useState(0); // valor de otros impuestos

  // calculo del iva (16%) sobre el total
  const iva = total * 0.16;

  // calculo de otros impuestos (2%) si el checkbox está marcado
  useEffect(() => {
    if (otrosImpuestosHabilitados) {
      setOtrosImpuestos(total * 0.02); // 2% de otros impuestos
    } else {
      setOtrosImpuestos(0); // si no está habilitado, no hay impuestos adicionales
    }
  }, [otrosImpuestosHabilitados, total]);

  const postRequest = async (url, data) => {
    try {
      const response = await axios.post("http://localhost:3000/api" + url, data);
      return response.data; // devuelve los datos de la respuesta
    } catch (error) {
      console.error(`error en post a ${url}:`, error);
      throw error;
    }
  };

  // funcion para enviar datos a /facturasVentas
  const postFacturaVenta = async (cliente_id, total, usuario_id, tasa) => {
    const data = { cliente_id, total, usuario_id, tasa };
    return await postRequest("/facturasVentas", data);
  };

  // funcion para enviar datos a /detalleFactura
  const postDetalleFactura = async (factura_compra_id, factura_venta_id, producto_id, cantidad, precio_unitario) => {
    const data = { factura_compra_id, factura_venta_id, producto_id, cantidad, precio_unitario };
    return await postRequest("/detalleFactura", data);
  };

  // funcion principal para gestionar las peticiones
  const printAndProceed = async () => {
    if (paid < totalConImpuestos) {
      alert("El monto no es suficiente para procesar el pago");
      return; // si el pago es insuficiente, no procesamos nada
    }

    try {
      // enviar datos de factura de venta
      const facturaVentaResponse = await postFacturaVenta(1, total, 1, 1);
      console.log("respuesta de factura de venta:", facturaVentaResponse);

      // enviar detalles de la factura
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

      // Resetear estado
      p.setPaid([]); // limpiar la tabla de pagos
      p.setIsSubmit(false);
      p.setFacturaId(facturaVentaResponse.id);
      p.setIsPrint(true);
    } catch (error) {
      console.error("error en printAndProceed:", error);
    }
  };

  // calculo del total a debitar con iva y otros impuestos
  const totalConImpuestos = total + iva + otrosImpuestos;

  // calculo del cambio (dinero pagado - total a debitar)
  const cambio = paid - totalConImpuestos;
  const isPaidSufficient = paid >= totalConImpuestos; // Verifica si el monto pagado es suficiente
  const falta = totalConImpuestos - paid; // Cuánto falta para completar el pago

  if (p.condition) {
    return (
      <div className="fixed w-full h-screen left-0 top-0 z-10 flex flex-wrap justify-center content-center p-24">
        <div className="fixed glass w-full h-screen left-0 top-0 z-0"></div>
        <div className="w-[600px] rounded-3xl bg-white shadow-xl overflow-hidden z-10">
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
                No: <span>{p.facturaId || 'Generando...'}</span> {/* Muestra el ID de la factura */}
              </div>
              <div>{new Date().toLocaleDateString()}</div> {/* Fecha actual */}
            </div>
            <div className="mt-6">
              <table className="w-full text-base">
                <thead>
                  <tr>
                    <th className="py-2 text-left">Metodo de Pago</th>
                    <th className="py-2 text-right w-2/12">Subtotal</th>
                  </tr>
                </thead>
                <tbody>
                  <ListPay paid={p.paid} setPaid={p.setPaid} />
                </tbody>
              </table>
            </div>
            <div className="mt-6">
              <div className="flex font-semibold text-lg">
                <div className="flex-grow">Monto a Pagar</div>
                <div className="text-xl">{total.toFixed(2)}</div>
              </div>

              {/* mostrar iva */}
              <div className="flex text-base font-semibold">
                <div className="flex-grow">IVA (16%)</div>
                <div className="text-xl">{iva.toFixed(2)}</div>
              </div>

              {/* mostrar otros impuestos si esta habilitado el checkbox */}
              {otrosImpuestosHabilitados && (
                <div className="flex text-base font-semibold">
                  <div className="flex-grow">Otros Impuestos (2%)</div>
                  <div className="text-xl">{otrosImpuestos.toFixed(2)}</div>
                </div>
              )}

              {/* monto total a pagar con iva y otros impuestos */}
              <div className="flex font-semibold text-lg">
                <div className="flex-grow">Total a Debitar</div>
                <div className="text-xl">{totalConImpuestos.toFixed(2)}</div>
              </div>

              {/* mostrar cambio solo si es necesario */}
              {cambio > 0 && (
                <div className="flex text-xl font-semibold text-green-500"> {/* Cambiar color a verde si el cambio es positivo */}
                  <div className="flex-grow">Cambio</div>
                  <div className="text-xl">{cambio.toFixed(2)}</div>
                </div>
              )}

              {/* mostrar cuánto falta solo si no se ha completado el pago */}
              {falta > 0 && (
                <div className="flex text-xl font-semibold text-red-500">
                  <div className="flex-grow">Monto Insuficiente</div>
                  <div className="text-xl">{falta.toFixed(2)}</div>
                </div>
              )}
            </div>
          </div>

          {/* checkbox para habilitar otros impuestos */}
          <div className="p-4">
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={otrosImpuestosHabilitados}
                onChange={() => setOtrosImpuestosHabilitados(!otrosImpuestosHabilitados)}
                className="mr-2"
              />
              Agregar otros impuestos
            </label>
          </div>

          <div className="p-4 w-full">
            <button
              className={`text-lg px-4 py-3 rounded-2xl w-full focus:outline-none ${isPaidSufficient ? 'bg-cyan-500' : 'bg-gray-500'} text-white`}
              onClick={() => printAndProceed()}
              disabled={!isPaidSufficient} // deshabilita el botón si el pago no es suficiente
            >
              {isPaidSufficient ? 'PROCESAR' : 'PAGO INSUFICIENTE'}
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
