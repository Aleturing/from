import StockCart from "./StockCart";
import DetailsCarArt from "./DetailsCarArt";
function CardItem(p) {
  return (
    <div className="select-none mb-3 bg-blue-gray-50 rounded-lg w-full text-blue-gray-700 py-2 px-2 flex justify-center">
      <img alt="" src={p.img} className="rounded-lg h-10 w-10 bg-white shadow mr-2" />
      <DetailsCarArt tittle={p.tittle} price={p.price} />
      <StockCart stock={p.stock} setCarrito={p.setCarrito} tittle={p.tittle} carrito={p.carrito} />
    </div>
  );
}
export default CardItem;
