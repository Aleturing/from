import { useState, useEffect } from "react";
import BodyStore from "../molecules/BodyStore";
import StoreSeach from "../molecules/StoreSeach";
import axios from "axios";
import ActiveUser from "../molecules/ActiveUser";

function StoreMenu(p) {
  const [letters, setLetters] = useState("");
  const [products, setProducts] = useState([]);

  const getProducts = async () => {
    try {
    const response = await axios.get("http://localhost:3000/api/productos");
    setProducts(response.data);
  } catch (error) {
      
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <div className="flex flex-col bg-blue-gray-50 h-full w-full py-4">
      <StoreSeach letters={letters} setLetters={setLetters} />
      <BodyStore
        setCarrito={p.setCarrito}
        carrito={p.carrito}
        letters={letters}
        products={products}
      />
      <ActiveUser onLogin={p.onLogin}/>
    </div>
  );
}
export default StoreMenu;
