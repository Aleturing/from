import ChangeNegativo from "./ChangeNegativo";
import ChangePositivo from "./ChangePositivo";
import ConfirmPaid from "./ConfirmPaid";
import SubmitButton from "./SubmitButton";
import calculateTotalValue from "../../functions/calculateTotalValue";
import calculateTotalPaid from "../../functions/calculateTotalPaid";

function TotalSubmit(p) {
  const toPay = calculateTotalValue(p.carrito).toFixed(2); // Total con dos decimales
  const paid = calculateTotalPaid(p.paid).toFixed(2); // Total pagado con dos decimales
  const change = (paid - toPay).toFixed(2); // Cambio con dos decimales

  if (p.condition)
    return (
      <div className="select-none h-auto w-full text-center pt-3 pb-4 px-4">
        <div className="flex mb-3 text-lg font-semibold text-blue-gray-700">
          <div>TOTAL</div>
          <div className="text-right w-full">{toPay}</div>
        </div>
        {/* Cambios Positivo y Negativo */}
        <ChangePositivo total={change} />
        <ChangeNegativo total={change} />
        {/* Confirmación de Pago */}
        <ConfirmPaid total={change} carrito={p.carrito} />
        {/* Botón de Envío */}
        <SubmitButton setIsSubmit={p.setIsSubmit} client={p.clientInfo}/>
      </div>
    );
}

export default TotalSubmit;

