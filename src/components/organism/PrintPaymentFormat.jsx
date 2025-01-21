import * as React from "react";

const PrintPaymentFormat = React.forwardRef((props, ref) => {
  // calcula el total de los articulos
  const totalAmount = props.carrito.reduce((total, item) => {
    return total + item.price * item.stock; // multiplica precio por cantidad y suma al total
  }, 0); // inicializa en 0

  // calcula el iva (16%)
  const iva = totalAmount * 0.16;

  // calcula otros impuestos (2%) si el checkbox esta habilitado
  const otrosImpuestos = props.otrosImpuestosHabilitados ? totalAmount * 0.02 : 0;

  // total a pagar con iva y otros impuestos
  const totalConImpuestos = totalAmount + iva + otrosImpuestos;

  return (
    <div className="relativeCSS" ref={ref}>
      <style type="text/css" media="print">
        {"@page { size: 215.9mm 279.4mm; }"}
      </style>

      <div className="flex flex-col h-screen">
        <div className="mt-2 mb-2 ml-4 mr-4 text-black h-full">
          <div className="h-5/6">
            <div className="flex">
              <div className="flex">
                <div className="flex w-8/12 items-center justify-items-center">
                  {/* <img src={logo} alt="logo" /> */}
                </div>
                <div className="flex w-4/12 flex-row text-center justify-center text-lg font-semibold">
                  <span>Factura: </span>
                  <span>{props.facturaId}</span>
                </div>
              </div>
            </div>

            <div className="flex text-xs border-black border rounded-lg mb-2">
              <div className="flex mr-2">
                <div className="w-7/12">
                  {/* Información adicional aquí si es necesario */}
                </div>

                <div className="border-l border-black w-5/12">
                  {/* Información adicional aquí si es necesario */}
                </div>
              </div>
            </div>

            <div className="flex text-xs border-t border-l border-r border-black justify-center">
              <span className="text-lg font-semibold justify-center py-2">
                Detalle
              </span>
            </div>

            <div className="flex text-xs border-t border-black">
              <span className="w-6/12 py-2 flex justify-center border-l border-black">
                Articulo
              </span>
              <span className="w-3/12 py-2 flex justify-center border-l border-black">
                Precio
              </span>
              <span className="w-3/12 py-2 flex justify-center border-l border-black border-r">
                Cantidad
              </span>
            </div>

            {/* Recorrer el carrito para mostrar los articulos */}
            {props.carrito.map((e) => {
              return (
                <div className="flex text-xs border-t border-black border-b">
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
              );
            })}

            {/* Mostrar el total calculado */}
            <div className="border-black border rounded-lg w-4/12">
              <div className="flex pl-2 justify-between ">
                <span>Total:</span>
                <span className="pr-2">
                  {totalAmount.toFixed(2)} {/* Muestra el total con dos decimales */}
                </span>
              </div>
            </div>

            {/* Mostrar IVA (16%) */}
            <div className="border-black border rounded-lg w-4/12 mt-2">
              <div className="flex pl-2 justify-between ">
                <span>IVA (16%):</span>
                <span className="pr-2">
                  {iva.toFixed(2)} {/* Muestra el IVA calculado con dos decimales */}
                </span>
              </div>
            </div>

            {/* Mostrar otros impuestos (2%) si el checkbox está habilitado */}
            {props.otrosImpuestosHabilitados && (
              <div className="border-black border rounded-lg w-4/12 mt-2">
                <div className="flex pl-2 justify-between ">
                  <span>Otros Impuestos (2%):</span>
                  <span className="pr-2">
                    {otrosImpuestos.toFixed(2)} {/* Muestra los otros impuestos calculados con dos decimales */}
                  </span>
                </div>
              </div>
            )}

            {/* Total a pagar con IVA y otros impuestos */}
            <div className="border-black border rounded-lg w-4/12 mt-2">
              <div className="flex pl-2 justify-between ">
                <span>Total a Pagar:</span>
                <span className="pr-2">
                  {totalConImpuestos.toFixed(2)} {/* Muestra el total con IVA y otros impuestos */}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});

export default PrintPaymentFormat;
