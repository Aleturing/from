import ProductsArea from "./ProductsArea";
import TotalSubmit from "../molecules/TotalSubmit";
import EmptyCart from "../molecules/EmptyCart";
import ClientInfoForm from "../molecules/ClientInfoForm";

const RightSideBar = ({
  carrito,
  setCarrito,
  paid,
  setPaid,
  setIsSubmit,
  products,
  clientInfo,
  setClientInfo
}) => {
  return (
    <div className="w-5/12 flex flex-col bg-white h-full pr-4 pl-2 py-4">
      <div className="bg-white rounded-3xl flex flex-col h-full shadow">
        <EmptyCart condition={carrito.length === 0} />

        {/* Formulario de cliente siempre visible */}
        <ClientInfoForm
          clientInfo={clientInfo}
          setClientInfo={setClientInfo}
        />

        {/* Área de productos visible solo si hay algo en el carrito */}
        <ProductsArea
          condition={carrito.length > 0}
          carrito={carrito}
          setCarrito={setCarrito}
          products={products}
        />

        {/* Sección de total y enviar pedido */}
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

export default RightSideBar;
