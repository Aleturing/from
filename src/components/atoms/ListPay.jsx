import ItemPay from "../molecules/ItemPay";
import NewPayButton from "../atoms/NewPayButton";

function ListPay(p) {
  return (
    <tr>
      {p.paid.map((paid) => (
        <ItemPay paid={paid} setPaid={p.setPaid} paids = {p.paid}/>
      ))}
      <NewPayButton paid={p.paid} setPaid={p.setPaid} />
    </tr>
  );
}
export default ListPay;
