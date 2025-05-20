import { forwardRef } from "react";

const PrintPaymentFormat = forwardRef(
  ({ carrito, facturaId, client, cobrarIGTF, cobrarOtros }, ref) => {
    const nombreCliente = client?.nombre || "N/A";
    const cedulaCliente = client?.cedula || "N/A";
    const telefonoCliente = client?.telefono || "N/A";
    const direccionCliente = client?.direccion || "N/A";

    const IVA_RATE = 0.16;
    const IGTF_RATE = 0.03;
    const OTROS_RATE = 0.02;

    const totalAmount = carrito.reduce((total, item) => {
      const precio = parseFloat(item.price) || 0;
      const cantidad = parseInt(item.stock, 10) || 0;
      return total + precio * cantidad;
    }, 0);

    const iva = totalAmount * IVA_RATE;
    const igtf = totalAmount * IGTF_RATE;
    const otrosImpuestos = totalAmount * OTROS_RATE;
    const totalConImpuestos =
      totalAmount +
      iva +
      (cobrarIGTF ? igtf : 0) +
      (cobrarOtros ? otrosImpuestos : 0);

    const now = new Date();
    const fechaFormateada = now.toLocaleDateString("es-VE");
    const horaFormateada = now.toLocaleTimeString("es-VE");
    return (
      <div className="relativeCSS" ref={ref}>
        <style type="text/css" media="print">
          {"@page { size: 215.9mm 279.4mm; margin: 20mm; }"}
        </style>

        <div className="p-4 text-black text-sm">
          {/* Encabezado */}
          <div className="text-center mb-4">
            <h1 className="text-2xl font-bold">SENIAT</h1>
          </div>
          <div className="flex justify-between mb-4">
            <div>
              <h1 className="text-xl font-bold">
                Papelera Prever Business C.A.
              </h1>
              <p>RIF: J-xxxxxxxxxxxxxxxx</p>
              <p>Dirección: xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx</p>
            </div>
            <div className="text-right">
              <p>Factura N°: {facturaId}</p>
              <p>Fecha: {fechaFormateada}</p>
              <p>Hora: {horaFormateada}</p>
            </div>
          </div>

          {/* Datos del cliente */}
          <div className="border-t border-b py-2 mb-4">
            <p>
              <strong>Cliente:</strong> {nombreCliente}
            </p>
            <p>
              <strong>Cédula/RIF:</strong> {cedulaCliente}
            </p>
            <p>
              <strong>Teléfono:</strong> {telefonoCliente}
            </p>
            <p>
              <strong>Dirección:</strong> {direccionCliente}
            </p>
          </div>

          {/* Detalle */}
          <div>
            <div className="flex text-xs font-semibold border-b pb-1">
              <div className="w-6/12">Artículo</div>
              <div className="w-3/12 text-right">Precio</div>
              <div className="w-3/12 text-right">Cantidad</div>
            </div>
            {carrito.map((e) => {
              const precio = parseFloat(e.price) || 0;
              const cantidad = parseInt(e.stock, 10) || 0;
              return (
                <div key={e.id} className="flex text-xs border-b py-1">
                  <div className="w-6/12">{e.tittle}</div>
                  <div className="w-3/12 text-right">{precio.toFixed(2)}</div>
                  <div className="w-3/12 text-right">{cantidad}</div>
                </div>
              );
            })}
          </div>

          {/* Totales */}
          <div className="mt-4 w-4/12 ml-auto text-xs">
            <div className="flex justify-between">
              <span>Subtotal:</span>
              <span>{totalAmount.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>IVA ({(IVA_RATE * 100).toFixed(0)}%):</span>
              <span>{iva.toFixed(2)}</span>
            </div>
            {cobrarIGTF && (
              <div className="flex justify-between">
                <span>IGTF ({(IGTF_RATE * 100).toFixed(0)}%):</span>
                <span>{igtf.toFixed(2)}</span>
              </div>
            )}
            {cobrarOtros && (
              <div className="flex justify-between">
                <span>Otros Impuestos ({(OTROS_RATE * 100).toFixed(0)}%):</span>
                <span>{otrosImpuestos.toFixed(2)}</span>
              </div>
            )}
            <div className="flex justify-between font-bold border-t pt-1">
              <span>Total:</span>
              <span>{totalConImpuestos.toFixed(2)}</span>
            </div>
          </div>

          {/* Pie de página legal */}
          <div className="mt-6 text-center text-xs">
            <p>
              Documento emitido conforme a la legislación tributaria de la
              República Bolivariana de Venezuela.
            </p>
            <p>Conserve este comprobante para fines fiscales.</p>
          </div>
        </div>
      </div>
    );
  }
);

export default PrintPaymentFormat;
