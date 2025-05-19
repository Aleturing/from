import { useReactToPrint } from "react-to-print";
import { useRef } from "react";
import ReactModal from "react-modal";
import PrintPaymentFormat from "./PrintPaymentFormat";

ReactModal.setAppElement("#root");

const PrintDecision = (p) => {
  const contentRef = useRef(null);
  const reactToPrintFn = useReactToPrint({ contentRef });

  const handlePrint = () => {
    reactToPrintFn(); // Inicia la impresión
    p.setIsPrint(false); // Cierra el modal después de imprimir
  };

  const handleClose = () => {
    p.setIsPrint(false); // Cierra el modal sin imprimir
  };

  return (
    <ReactModal
      isOpen={p.condition}
      onRequestClose={handleClose} // Permite cerrar el modal al hacer clic fuera de él o presionar "Esc"
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
      overlayClassName="fixed inset-0"
    >
      <div className="bg-white rounded-lg p-6 w-96 shadow-lg text-center">
        <h2 className="text-lg font-semibold mb-4">
          ¿Desea imprimir el recibo?
        </h2>
        <div className="flex justify-around">
          <button
            onClick={handlePrint}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Sí, imprimir
          </button>
          <button
            onClick={handleClose}
            className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
          >
            No, cerrar
          </button>
        </div>
        {/* Contenido oculto para impresión */}
        <div style={{ display: "none" }}>
          <PrintPaymentFormat
            ref={contentRef}
            carrito={p.carrito}
            paids={p.paid}
            facturaId={p.facturaId}
            client={p.client}
            mostrarImpuestos={p.paid.some(
              (pago) => pago.mtd === "Pago en Divisas"
            )}
          />
        </div>
      </div>
    </ReactModal>
  );
};

export default PrintDecision;
