import React, { useState } from 'react';

const Amount = (p) => {

  const handleChange = (event) => {
    const targetPayment = p.paids.find((item) => item.id === p.id);

    if (targetPayment) {
      targetPayment.mnt = event.target.value;
    }

    p.setPaid([...p.paids]);
  };

  return (
    <div>
      <input
        type="number"
        value={p.amount}
        onChange={handleChange}
        placeholder="Monto"
        required
        style={{
          textAlign: 'center', // centra el texto dentro del campo de entrada
        }}
      />
    </div>
  );
};

export default Amount;
