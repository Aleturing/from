function SubmitButton(p) {
  console.log([p.client]);

  if (!p.client || !p.client.id) {
    return (
      <button className="text-white bg-yellow-300 rounded-2xl text-lg w-full py-3 focus:outline-none" disabled>
        Debe seleccionar un cliente válido.
      </button>
    );
  }

  return (
    <button
      className="text-white bg-blue-300 rounded-2xl text-lg w-full py-3 focus:outline-none"
      onClick={() => p.setIsSubmit(true)}
    >
      Pago
    </button>
  );
}

export default SubmitButton;
