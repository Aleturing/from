import { forwardRef } from "react";

const PrintSalesFormat = forwardRef(
  ({ invoices = [], user = "", date = "", amount = "" }, ref) => {
    // Format date for display
    const formatDisplayDate = (dateString) => {
      if (!dateString) return "N/A";
      const dateObj = new Date(dateString);
      return dateObj.toLocaleDateString("es-VE");
    };

    // Calculate totals
    const totalSales = invoices.reduce(
      (sum, inv) => sum + parseFloat(inv.total || 0),
      0
    );
    const totalIVA = invoices.reduce(
      (sum, inv) => sum + parseFloat(inv.IVA || 0),
      0
    );

    return (
      <div className="relativeCSS" ref={ref}>
        <style type="text/css" media="print">
          {"@page { size: 215.9mm 279.4mm; margin: 20mm; }"}
        </style>

        <div className="p-4 text-black text-sm">
          {/* Encabezado */}
          <div className="text-center mb-4">
            <h1 className="text-2xl font-bold">REPORTE DE VENTAS</h1>
            <p className="text-lg">Papelera Prever Business C.A.</p>
            <p>RIF: J-xxxxxxxxxxxxxxxx</p>
          </div>

          {/* Filtros aplicados */}
          <div className="border-b pb-2 mb-4">
            <div className="flex justify-between">
              <div>
                <p>
                  <strong>Usuario:</strong> {user || "Todos los usuarios"}
                </p>
                <p>
                  <strong>Fecha:</strong> {date || "Todas las fechas"}
                </p>
              </div>
              <div>
                <p>
                  <strong>Monto:</strong> {amount || "Todos los montos"}
                </p>
                <p>
                  <strong>Total Facturas:</strong> {invoices.length}
                </p>
              </div>
            </div>
          </div>

          {/* Listado de facturas */}
          <div className="mb-4">
            <div className="flex font-semibold border-b pb-1 text-xs">
              <div className="w-2/12">Factura ID</div>
              <div className="w-3/12">Usuario</div>
              <div className="w-2/12">Fecha</div>
              <div className="w-2/12 text-right">Total</div>
              <div className="w-2/12 text-right">IVA</div>
              <div className="w-1/12 text-right">Detalle</div>
            </div>

            {invoices.map((inv) => (
              <div key={inv.id} className="flex border-b py-1 text-xs">
                <div className="w-2/12">{inv.id}</div>
                <div className="w-3/12">{inv.usuario_nombre || "N/A"}</div>
                <div className="w-2/12">{formatDisplayDate(inv.fecha)}</div>
                <div className="w-2/12 text-right">
                  ${parseFloat(inv.total || 0).toFixed(2)}
                </div>
                <div className="w-2/12 text-right">
                  {parseFloat(inv.IVA || 0).toFixed(2)}
                </div>
                <div className="w-1/12 text-right">[+]</div>
              </div>
            ))}
          </div>

          {/* Totales */}
          <div className="mt-4 w-4/12 ml-auto text-sm border-t pt-2">
            <div className="flex justify-between">
              <span>Total Facturas:</span>
              <span>{invoices.length}</span>
            </div>
            <div className="flex justify-between">
              <span>Total Ventas:</span>
              <span>${totalSales.toFixed(2)}</span>
            </div>
            <div className="flex justify-between font-bold">
              <span>Total IVA:</span>
              <span>${totalIVA.toFixed(2)}</span>
            </div>
          </div>

          {/* Pie de página */}
          <div className="mt-8 text-center text-xs">
            <p>Reporte generado el {new Date().toLocaleDateString("es-VE")}</p>
            <p>Documento interno para control de ventas</p>
          </div>
        </div>
      </div>
    );
  }
);

export default PrintSalesFormat;
