import SeachCart from "../molecules/SeachCart";
import ShowArtListCart from "../molecules/ShowArtListCart";

function ProductsArea(p) {
  if (p.condition) {
    return (
      <div className="flex-1 flex flex-col overflow-auto">
        <SeachCart carrito={p.carrito} setCarrito={p.setCarrito} />

        <ShowArtListCart carrito={p.carrito} setCarrito={p.setCarrito} products={p.products} />
      </div>
    );
  }
}

export default ProductsArea;
