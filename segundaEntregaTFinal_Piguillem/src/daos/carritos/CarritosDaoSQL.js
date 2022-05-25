import ContenedorSQL from "../../contenedores/ContenedorSQL.js";

class CarritosDaoSQL {
  constructor(configCarritos, configProductos) {
    super()
    this.carritos = new ContenedorSQL(configCarritos, "carritos");
    this.productosEnCarritos = new ContenedorSQL(
      configProductos,
      "productosEnCarritos"
    );
  }
}

export default CarritosDaoSQL;
