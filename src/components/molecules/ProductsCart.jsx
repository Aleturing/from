function ProductsCart(p) {
  const addToCart = () => {
    findToCart() != -1 ? updateToCart(findToCart()) : addProductToCart();
  };
  const findToCart = () => {
    return p.carrito.findIndex((e) => e.tittle === p.tittle);
  };
  const updateToCart = (i) => {
    const carrito = p.carrito;
    carrito[i].stock += 1;
    p.setCarrito(carrito);
  };
  const addProductToCart = () => {
    const carrito = p.carrito;
    carrito.unshift({
      id: p.id,
      tittle: p.tittle,
      stock: 1,
      price: p.price,
      img: p.img,
    });
    p.setCarrito(carrito);
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

      <div className="flex pb-3 px-3 text-sm -mt-3">
        <p className="flex-grow truncate mr-1" x-text="">
          {p.tittle}
        </p>
        <p className="nowrap font-semibold" x-text="priceFormat(product.price)">
          {p.price}
        </p>
      </div>
    </div>
  );
}
export default ProductsCart;
