import { useState } from "react";
import BodyStore from "../molecules/BodyStore";
import StoreSeach from "../molecules/StoreSeach";
import ActiveUser from "../molecules/ActiveUser";

function StoreMenu(p) {
  const [letters, setLetters] = useState("");



  return (
    <div className="flex flex-col bg-blue-gray-50 h-full w-full py-4">
      <StoreSeach letters={letters} setLetters={setLetters} />
      <BodyStore
        setCarrito={p.setCarrito}
        carrito={p.carrito}
        letters={letters}
        products={p.products}
      />
      <ActiveUser onLogin={p.onLogin}/>
    </div>
  );
}
export default StoreMenu;
