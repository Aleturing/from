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
    <tr>
      <td className="py-2 text-center" x-text="index+1"></td>
      <td className="py-2 text-left">
        <SelectorPay
          options={options}
          label="Elige una opción"
          onChange={(e) => handleSelectorChange(e)}
        />
        <br />
        <small x-text="priceFormat(item.price)"></small>
      </td>
      <td className="py-2 text-center" x-text="item.qty">
        <Amount amount = {p.paid.mnt} setPaid={p.setPaid} id = {p.paid.id} paids = {p.paids}/>
      </td>

      <td
        className="py-2 text-right"
        x-text="priceFormat(item.qty * item.price)"
      ></td>
    </tr>
  );
}
export default ItemPay;
