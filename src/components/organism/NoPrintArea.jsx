// import LeftSideBar from "./LeftSideBar";
import ModalCobro from "./ModalCobro";
import PageContent from "./PageContent";
import PrintDecision from "./PrintDecision";
const NoPrintArea = (p) => {
  return (<>
    

      <PageContent
        products={p.products}
        carrito={p.carrito}
        setCarrito={p.setCarrito}
        paid={p.paid}
        setPaid={p.changePaid}
        setIsSubmit={p.setIsSubmit}
        onLogin={p.onLogin}
      />

      <ModalCobro
        condition={p.isSubmit}
        paid={p.paid}
        setPaid={p.setPaid}
        setIsPrint={p.setIsPrint}
        setIsSubmit={p.setIsSubmit}
        carrito={p.carrito}
        setFacturaId={p.setFacturaId}
        onLogin={p.onLogin}

      />

      <PrintDecision
        condition={p.isPrint}
        paid={p.paid}
        setPaid={p.setPaid}
        setIsPrint={p.setIsPrint}
        carrito={p.carrito}
        facturaId={p.facturaId}
      />
    </>
  );
};
export default NoPrintArea;
