// import LeftSideBar from "./LeftSideBar";
import ModalCobro from "./ModalCobro";
import PageContent from "./PageContent";
import PrintDecision from "./PrintDecision";
import { useState, useEffect } from "react";

const NoPrintArea = ({
  paid,
  isSubmit,
  isPrint,
  products,
  carrito,
  setCarrito,
  setPaid,
  setIsPrint,
  setIsSubmit,
  setFacturaId,
  onLogin,
  client,
  setClient,
  facturaId,
}) => {
  const [otrosImpuestosHabilitados, setOtrosImpuestosHabilitados] =
    useState(false);
  const [esPagoEnDivisas, setEsPagoEnDivisas] = useState(false);

  return (
    <>
      <PageContent
        products={products}
        carrito={carrito}
        setCarrito={setCarrito}
        paid={paid}
        setPaid={setPaid}
        setIsSubmit={setIsSubmit}
        onLogin={onLogin}
        client={client}
        setClient={setClient}
      />

      <ModalCobro
        condition={isSubmit}
        paid={paid}
        setPaid={setPaid}
        setIsPrint={setIsPrint}
        setIsSubmit={setIsSubmit}
        carrito={carrito}
        setFacturaId={setFacturaId}
        onLogin={onLogin}
        client={client}
        setClient={setClient}
        otrosImpuestosHabilitados={otrosImpuestosHabilitados}
        setOtrosImpuestosHabilitados={setOtrosImpuestosHabilitados}
        esPagoEnDivisas={esPagoEnDivisas}
        setEsPagoEnDivisas={setEsPagoEnDivisas}
      />

      <PrintDecision
        condition={isPrint}
        paid={paid}
        setPaid={setPaid}
        setIsPrint={setIsPrint}
        carrito={carrito}
        facturaId={facturaId}
        client={client}
        esPagoEnDivisas={esPagoEnDivisas}
        otrosImpuestosHabilitados={otrosImpuestosHabilitados}
        setCarrito={setCarrito}
        setClient={setClient}
      />
    </>
  );
};

export default NoPrintArea;
