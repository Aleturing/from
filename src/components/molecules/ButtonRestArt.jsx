function ButtonRestArt(p) {
  const restStockCart = () => {
    updateToCart(findToCart());
  };
  const findToCart = () => {
    return p.carrito.findIndex((e) => e.tittle === p.tittle);
  };
  const updateToCart = (i) => {
    const carrito = p.carrito;
    carrito[i].stock -= 1;
    if (carrito[i].stock <= 0) {
      carrito.splice(i, 1);
    }
    p.setCarrito(carrito);
  };
  return (
    <button
      onClick={() => restStockCart()}
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
          d="M20 12H4"
        />
      </svg>
    </button>
  );
}
export default ButtonRestArt;
