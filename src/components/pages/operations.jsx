import NoPrintArea from "../organism/NoPrintArea";
import PrintArea from "../organism/PrintArea";
import { Component } from "react";
import LeftSideBar from "../organism/LeftSideBar";

class Operations extends Component {
  state = {
    carrito: [],
    paid: [{ id: 1, mnt: "", mtd: "Pago en Effectivo" }],
    isSubmit: false,
    isPrint: false,
    facturaId: 0,
    client: {
      nombre: "",
      cedula: "",
      telefono: "",
    },
  };
  changeCarrito(carrito) {
    this.setState({ carrito });
  }
  changePaid(paid) {
    this.setState({ paid });
  }
  changeSubmit(isSubmit) {
    this.setState({ isSubmit });
  }
  changePrint(isPrint) {
    this.setState({ isPrint });
  }
  changeFacturaId(facturaId) {
    this.setState({ facturaId });
  }
  changeClient(client) {
    this.setState({client});
  }
  render() {
    return (
      <div className="hide-print flex flex-row h-screen antialiased text-blue-gray-800">
        <LeftSideBar setOnLogin={this.props.setOnLogin} />
        <NoPrintArea
          carrito={this.state.carrito}
          setCarrito={this.changeCarrito.bind(this)}
          paid={this.state.paid}
          setPaid={this.changePaid.bind(this)}
          isSubmit={this.state.isSubmit}
          setIsSubmit={this.changeSubmit.bind(this)}
          isPrint={this.state.isPrint}
          setIsPrint={this.changePrint.bind(this)}
          setFacturaId={this.changeFacturaId.bind(this)}
          facturaId={this.state.facturaId}
          onLogin={this.props.onLogin}
          client={this.state.client}
          setClient={this.changeClient.bind(this)}
        />
        <PrintArea />
      </div>
    );
  }
}

export default Operations;
