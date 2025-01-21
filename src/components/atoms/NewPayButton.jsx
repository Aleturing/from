import React, { useState } from "react";

const NewPayButton = (p) => {
  const agregarOpcion = () => {
    const nuevaOpcion = { mtd: "Pago en Efectivo", id: (p.paid.length + 1) };
    p.setPaid([...p.paid, nuevaOpcion]); // agrega la nueva opción al array de pagos
  };

  return (
    <div>
      <button onClick={agregarOpcion}>Agregar Opción</button>
    </div>
  );
};

export default NewPayButton;
