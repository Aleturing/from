function ProductsCart(p) {
  const addToCart = () => {
    findToCart(p.tittle) !== -1
      ? updateToCart(findToCart(p.tittle))
      : addProductToCart();
  };
  const findToCart = (tittle) => {
    return p.carrito.findIndex((e) => e.tittle === tittle);
  };
  const updateToCart = (i) => {
    const carrito = p.carrito;
    const stockActual = p.stock - carrito[i].stock;
    if (stockActual > 0) {
      carrito[i].stock += 1;
      p.setCarrito(carrito);
    }
  };
  const stockToCart = (tittle) =>
    findToCart(tittle) !== -1 ? returStockCarrito(findToCart(tittle)) : 0;

  const addProductToCart = () => {
    const carrito = p.carrito;
    if (p.stock>0){    carrito.unshift({
      id: p.id,
      tittle: p.tittle,
      stock: 1,
      price: p.price,
      img: p.img,
    });
    p.setCarrito(carrito);}

  };
  const returStockCarrito = (i) => {
    const carrito = p.carrito;
    return carrito[i].stock;
  };

  return (
    <div
      className="select-none cursor-pointer transition-shadow overflow-hidden rounded-2xl bg-white shadow hover:shadow-lg"
      onClick={(g) => addToCart()}
    >
      <img
        src={p.img}
        alt={p.tittle}
        className="w-full h-24 object-containt rounded-lg mb-8 max-w-24"
      />

      <div className="font-semibold pb-3 px-3 text-sm -mt-3">
        <div className="flex justify-between items-center">
          <p className="text-left truncate mr-1 text-100 font-serif text-lg">
            {p.tittle}
          </p>
          <div className="text-right">
            <p className="nowrap">Stock: {p.stock - stockToCart(p.tittle)}</p>
            <p className="nowrap">Precio: {p.price}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
export default ProductsCart;
