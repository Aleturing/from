import TrashButton from "./TrashButton";
import CartIcon from "./CartIcon";
function SeachCart(p) {
  return (
    <div className="h-16 text-center flex justify-center">
      <div className="pl-8 text-left text-lg py-4 relative">
        <CartIcon />
        <div
          x-show="getItemsCount() > 0"
          className="text-center absolute bg-cyan-500 text-white w-5 h-5 text-xs p-0 leading-5 rounded-full -right-2 top-3"
          x-text="getItemsCount()"
        >{p.carrito.length}</div>
      </div>
        <TrashButton setCarrito={p.setCarrito} />
        

    </div>
  );
}
export default SeachCart;
