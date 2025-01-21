import React from "react";
import ProductsArea from "./ProductsArea";
import TotalSubmit from "../molecules/TotalSubmit";
import EmptyCart from "../molecules/EmptyCart";

const RighSideBar = ({ carrito, setCarrito, paid, setPaid, setIsSubmit }) => {
  return (
    <div className="w-5/12 flex flex-col bg-blue-gray-50 h-full bg-white pr-4 pl-2 py-4">
      <div className="bg-white rounded-3xl flex flex-col h-full shadow">
        <EmptyCart condition={carrito.length === 0} />
        <ProductsArea
          condition={carrito.length > 0}
          carrito={carrito}
          setCarrito={setCarrito}
        />
        <TotalSubmit
          condition={carrito.length > 0}
          carrito={carrito}
          setCarrito={setCarrito}
          paid={paid}
          setPaid={setPaid}
          setIsSubmit={setIsSubmit}
        />
      </div>
    </div>
  );
};

export default RighSideBar;
