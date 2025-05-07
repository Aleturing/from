import ProductsCart from "./ProductsCart";

const ShowArtList = (p) => {
  const filteredProducts = () =>
    p.products.filter((e) =>
      e.descripcion.toLowerCase().includes(p.letters.toLowerCase())
    );

  if (filteredProducts().length > 0) {
    return (
      <div className="grid grid-cols-4 gap-4 pb-3">
        {filteredProducts().map((e) => {
          return (
            <ProductsCart
              key={"products" + e.descripcion}
              carrito={p.carrito}
              id={e.id}
              setCarrito={p.setCarrito}
              tittle={e.descripcion}
              price={e.precio}
              img={e.foto}
              stock={e.stock}
            />
          );
        })}
      </div>
    );
  } else {
    return <></>;
  }
};
export default ShowArtList;
