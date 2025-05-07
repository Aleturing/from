import StockCart from "./StockCart";
import DetailsCarArt from "./DetailsCarArt";
function CardItem(p) {
  const findToProducts = (tittle) => {
    return p.products.findIndex((e) => e.descripcion === tittle);

  
  };  
  const stockToProducts = (tittle) =>
    findToProducts(tittle) !== -1 ? returStockProducts(findToProducts(tittle)) : 0;

  const returStockProducts = (i) => {
    const products = p.products;
    return products[i].stock;
  };
  
  return (
    <div className="select-none mb-3 bg-blue-gray-50 rounded-lg w-full text-blue-gray-700 py-2 px-2 flex justify-center">
      <img alt="" src={p.img} className="rounded-lg h-10 w-10 bg-white shadow mr-2" />
      <DetailsCarArt tittle={p.tittle} price={p.price} />
      <StockCart stock={p.stock} stockProduct={stockToProducts(p.tittle)} setCarrito={p.setCarrito} tittle={p.tittle} carrito={p.carrito} />
    </div>
  );
}
export default CardItem;
