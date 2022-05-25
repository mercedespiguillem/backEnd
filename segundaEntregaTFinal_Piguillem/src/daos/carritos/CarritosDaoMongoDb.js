import ContenedorMongoDb from "../../contenedores/ContenedorMongoDb.js";


const carrito = mongoose.model(coleccionCarrito, carritoSchema);

class CarritosDaoMongoDb extends ContenedorMongoDb {
  constructor() {
    super("carritos", {
      name: { type: String, required: true, max: 100 },
      email: { type: String, requred: true, max: 50 },
      products: { type: Array, required: true },
      date: { type: Date, required: true },
      amount: { type: Number, required: true },
      total: { type: Number, required: true },
    });
  }

  async guardar(carrito = { productos: [] }) {
    return super.guardar(carrito);
  }
}

export default CarritosDaoMongoDb;
