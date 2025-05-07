import ItemPay from "../molecules/ItemPay";

const ListPay = (p) =>
  p.paid.map((paid) => (
    <ItemPay paid={paid} setPaid={p.setPaid} paids={p.paid} />
  ));

export default ListPay;
