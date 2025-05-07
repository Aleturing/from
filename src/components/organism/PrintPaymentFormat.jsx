import * as React from "react";

const PrintPaymentFormat = React.forwardRef((props, ref) => {
  // Recupera el nombre del usuario desde el almacenamiento local
  const usuario = JSON.parse(localStorage.getItem("usuario"));
  const nombreUsuario = usuario ? usuario.nombre : "Usuario desconocido";

  // Calcula el total de los artículos
  const totalAmount = props.carrito.reduce((total, item) => {
    return total + item.price * item.stock; // Multiplica precio por cantidad y suma al total
  }, 0); // Inicializa en 0

  // Calcula el IVA (16%)
  const iva = totalAmount * 0.16;

  // Calcula el IGTF (3%)
  const igtf = totalAmount * 0.03;

  // Calcula otros impuestos (2%) si el checkbox está habilitado
  const otrosImpuestos = props.otrosImpuestosHabilitados
    ? totalAmount * 0.02
    : 0;

  // Total a pagar con IVA y otros impuestos
  const totalConImpuestos = totalAmount + iva + otrosImpuestos + igtf;

  // Obtener la fecha y hora actuales
  const fechaActual = new Date();
  const dia = String(fechaActual.getDate()).padStart(2, "0");
  const mes = String(fechaActual.getMonth() + 1).padStart(2, "0"); // Los meses en JavaScript van de 0 a 11
  const año = fechaActual.getFullYear();
  const horas = String(fechaActual.getHours()).padStart(2, "0");
  const minutos = String(fechaActual.getMinutes()).padStart(2, "0");

  // Formatear la fecha y hora en el formato deseado
  const fechaFormateada = `${dia}/${mes}/${año}`;
  const horaFormateada = `${horas}:${minutos}`;

  return (
    <div className="relativeCSS" ref={ref}>
      <style type="text/css" media="print">
        {"@page { size: 215.9mm 279.4mm; }"}
      </style>

      <div className="flex flex-col h-screen">
        <div className="mt-2 mb-2 ml-4 mr-4 text-black h-full">
          <div className="h-5/6">
            {/* Sección alineada a la izquierda */}
            <div className="flex flex-col text-left text-lg font-semibold leading-tight mt-2">
              <span>Factura: {props.facturaId}</span>
              <span>
                Fecha: {fechaFormateada} - Hora: {horaFormateada}
              </span>
              <span>Facturado por: {nombreUsuario}</span>
            </div>

            {/* Sección de Detalles */}
            <div className="flex text-xs border-t border-l border-r border-black justify-center mt-4">
              <span className="text-lg font-semibold justify-center py-2">
                Detalle
              </span>
            </div>

            <div className="flex text-xs border-t border-black">
              <span className="w-6/12 py-2 flex justify-center border-l border-black">
                Artículo
              </span>
              <span className="w-3/12 py-2 flex justify-center border-l border-black">
                Precio
              </span>
              <span className="w-3/12 py-2 flex justify-center border-l border-black border-r">
                Cantidad
              </span>
            </div>

            {/* Recorrer el carrito para mostrar los artículos */}
            {props.carrito.map((e) => (
              <div
                className="flex text-xs border-t border-black border-b"
                key={e.id}
              >
                <span className="w-6/12 py-2 flex justify-center border-l border-black">
                  {e.tittle}
                </span>
                <span className="w-3/12 py-2 flex justify-center border-l border-black">
                  {e.price}
                </span>
                <span className="w-3/12 py-2 flex justify-center border-l border-black border-r">
                  {e.stock}
                </span>
              </div>
            ))}

            {/* Mostrar el total calculado */}
            <div className="border-black border rounded-lg w-4/12 mt-4">
              <div className="flex pl-2 justify-between ">
                <span>Total:</span>
                <span className="pr-2">{totalAmount.toFixed(2)}</span>
              </div>
            </div>

            {/* Mostrar IVA (16%) */}
            <div className="border-black border rounded-lg w-4/12 mt-2">
              <div className="flex pl-2 justify-between ">
                <span>IVA (16%):</span>
                <span className="pr-2">{iva.toFixed(2)}</span>
              </div>
            </div>

            {/* Mostrar IGTF (3%) */}
            <div className="border-black border rounded-lg w-4/12 mt-2">
              <div className="flex pl-2 justify-between ">
                <span>IGTF (3%):</span>
                <span className="pr-2">{igtf.toFixed(2)}</span>
              </div>
            </div>

            {/* Mostrar otros impuestos (2%) si el checkbox está habilitado */}
            {props.otrosImpuestosHabilitados && (
              <div className="border-black border rounded-lg w-4/12 mt-2">
                <div className="flex pl-2 justify-between ">
                  <span>Otros Impuestos (2%):</span>
                  <span className="pr-2">{otrosImpuestos.toFixed(2)}</span>
                </div>
              </div>
            )}

            {/* Total a pagar con IVA y otros impuestos */}
            <div className="border-black border rounded-lg w-4/12 mt-2">
              <div className="flex pl-2 justify-between ">
                <span>Total a Pagar:</span>
                <span className="pr-2">{totalConImpuestos.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});

export default PrintPaymentFormat;
