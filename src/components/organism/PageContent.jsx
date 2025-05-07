import StoreMenu from "./StoreMenu";
import RighSideBar from "./RigthSideBar";
import { useState, useEffect } from "react";
import axios from "axios";


const PageContent = (p) => {
  const [products, setProducts] = useState([]);

  const getProducts = async () => {
    try {
    const response = await axios.get("https://back-bakend2.onrender.com/api/productos");
    setProducts(response.data);
  } catch (error) {
      
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <div className="flex-grow flex">
      <StoreMenu carrito={p.carrito} setCarrito={p.setCarrito} onLogin={p.onLogin} products={products}/>
      <RighSideBar products={products} carrito={p.carrito} setCarrito={p.setCarrito} paid={p.paid} setPaid={p.setPaid} setIsSubmit={p.setIsSubmit} />
    </div>
  );
};
export default PageContent;
