import React, { useState } from "react";

const NewPayButton = (p) => {
  const agregarOpcion = () => {
    const nuevaOpcion = { mtd: "Pago en Efectivo", id: p.paid.length + 1 };
    p.setPaid([...p.paid, nuevaOpcion]); // agrega la nueva opción al array de pagos
  };

  return (
    <div className="flex justify-center items-center w-full">
      <button
        onClick={agregarOpcion}
        className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
      >
        Agregar Método de Pago
      </button>
    </div>
  );
};

export default NewPayButton;
