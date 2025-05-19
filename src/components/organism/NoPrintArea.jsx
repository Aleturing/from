// import LeftSideBar from "./LeftSideBar";
import ModalCobro from "./ModalCobro";
import PageContent from "./PageContent";
import PrintDecision from "./PrintDecision";
const NoPrintArea = (p) => {
  return (
    <>
      <PageContent
        products={p.products}
        carrito={p.carrito}
        setCarrito={p.setCarrito}
        paid={p.paid}
        setPaid={p.changePaid}
        setIsSubmit={p.setIsSubmit}
        onLogin={p.onLogin}
        client={p.client}
        setClient={p.setClient}
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
        client={p.client}
        setClient={p.setClient}
      />

      <PrintDecision
        condition={p.isPrint}
        paid={p.paid}
        setPaid={p.setPaid}
        setIsPrint={p.setIsPrint}
        carrito={p.carrito}
        facturaId={p.facturaId}
         client={p.client}
      />
    </>
  );
};
export default NoPrintArea;
