import SelectorPay from "./SelectorPay";
import Amount from "../atoms/Amount";

function ItemPay(p) {
  const options = [
    { value: "Pago en Tarjeta", label: "Pago en Tarjeta" },
    { value: "Pago en Efectivo", label: "Pago en Efectivo" },
    { value: "Pago en Divisas", label: "Pago en Divisas" },
  ];

  const handleSelectorChange = (value) => {
    const targetPayment = p.paids.find((item) => item.id === p.paid.id);

    if (targetPayment) {
      targetPayment.mtd = value;
    }

    p.setPaid([...p.paids]);
  };

  return (
    <tr className="w-full">
      <td className="py-2 text-center">
        {p.paid.id}
      </td>
      <td className="py-2 text-left w-full">
        <SelectorPay
          options={options}
          label="Elige una opción"
          onChange={(e) => handleSelectorChange(e)}
        />
      </td>
      <td className="py-2 text-right">
        <Amount amount={p.paid.mnt} setPaid={p.setPaid} id={p.paid.id} paids={p.paids} />
      </td>
      <td className="py-2 text-right">
        {/* Mostrar el precio calculado o lo que necesites */}
      </td>
    </tr>
  );
}
export default ItemPay;
