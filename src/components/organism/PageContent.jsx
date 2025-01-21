import StoreMenu from "./StoreMenu";
import RighSideBar from "./RigthSideBar";

const PageContent = (p) => {

  return (
    <div className="flex-grow flex">
      <StoreMenu carrito={p.carrito} setCarrito={p.setCarrito} onLogin={p.onLogin}/>
      <RighSideBar carrito={p.carrito} setCarrito={p.setCarrito} paid={p.paid} setPaid={p.setPaid} setIsSubmit={p.setIsSubmit} />
    </div>
  );
};
export default PageContent;
