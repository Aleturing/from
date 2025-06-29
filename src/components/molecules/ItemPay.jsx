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

  const handleDelete = () => {
    if (p.paids.length <= 1) return; // No eliminar si solo queda uno
    const nuevosPagos = p.paids.filter((item) => item.id !== p.paid.id);
    p.setPaid(nuevosPagos);
  };

  return (
    <tr className="w-full">
      <td className="py-2 text-center align-middle">
        <div className="flex items-center justify-center gap-1">
          <button
            onClick={handleDelete}
            disabled={p.paids.length <= 1}
            className="text-base font-semibold text-red-600 hover:text-red-800 leading-none"
            title="Eliminar este método de pago"
            style={{ lineHeight: "1", paddingTop: "1px" }}
          >
            X
          </button>
          <span className="text-sm">{p.paid.id}</span>
        </div>
      </td>

      <td className="py-2 text-left w-full">
        <SelectorPay
          options={options}
          label="Elige una opción"
          onChange={(e) => handleSelectorChange(e)}
        />
      </td>
      <td className="py-2 text-right">
        <Amount
          amount={p.paid.mnt}
          setPaid={p.setPaid}
          id={p.paid.id}
          paids={p.paids}
        />
      </td>
      <td className="py-2 text-right">{/* Aquí puedes mostrar totales */}</td>
    </tr>
  );
}

export default ItemPay;
