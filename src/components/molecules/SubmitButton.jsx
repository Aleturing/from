function SubmitButton(p) {
  return (
    <button className="text-white bg-blue-300 rounded-2xl text-lg w-full py-3 focus:outline-none" onClick={()=>p.setIsSubmit(true)}>
      Pago
    </button>
  );
}
export default SubmitButton;
