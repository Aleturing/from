import CardItem from "./CardItem";

const ShowArtListCart = (p) => {
  return (
    <div className="flex-1 w-full px-4 overflow-auto">
      {p.carrito.map((e) => {
        return (
          <CardItem
            key={"card" + e.tittle}
            img={e.img}
            tittle={e.tittle}
            price={e.price}
            stock={e.stock}
            setCarrito={p.setCarrito}
            carrito={p.carrito}
            products={p.products}
          />
        );
      })}
    </div>
  );
};
export default ShowArtListCart;
