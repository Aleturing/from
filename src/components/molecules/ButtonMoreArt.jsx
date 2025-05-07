function ButtonMoreArt(p) {
  const sumStockCart = () => {
    updateToCart(findToCart());
  };
  const findToCart = () => {
    return p.carrito.findIndex((e) => e.tittle === p.tittle);
  };

  const updateToCart = (i) => {console.log(p.stock)
    const carrito = p.carrito;
    const stockActual = p.stock - carrito[i].stock;
    if (stockActual > 0) {
      carrito[i].stock += 1;
      p.setCarrito(carrito);
    }
  };
  return (
    <button
    onClick={() => sumStockCart()}
      className="rounded-lg text-center py-1 text-white bg-blue-gray-600 hover:bg-blue-gray-700 focus:outline-none"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-3 inline-block"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M12 6v6m0 0v6m0-6h6m-6 0H6"
        />
      </svg>
    </button>
  );
}
export default ButtonMoreArt;
