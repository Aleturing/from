import ButtonRestArt from "./ButtonRestArt";
import ButtonMoreArt from "./ButtonMoreArt";
function StockCart(p) {
  return (
    <div className="py-1">
      <div className="w-28 grid grid-cols-3 gap-2 ml-2">
        
        <ButtonRestArt setCarrito={p.setCarrito} tittle={p.tittle} carrito={p.carrito} stock={p.stockProduct} />
        <input
          type="text"
          className="bg-white rounded-lg text-center shadow focus:outline-none focus:shadow-lg text-sm"
          value={p.stock} 
        />
        
        <ButtonMoreArt  setCarrito={p.setCarrito} tittle={p.tittle} carrito={p.carrito }  stock={p.stockProduct} />
      </div>
    </div>
  );
}
export default StockCart;
