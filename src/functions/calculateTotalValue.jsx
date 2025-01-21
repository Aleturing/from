const calculateTotalValue = (carrito) => {
  return carrito.reduce((total, product) => {
    const price = parseFloat(product.price) || 0;
    const stock = parseInt(product.stock) || 0;

    return total + price * stock;
  }, 0);
};
export default calculateTotalValue;
