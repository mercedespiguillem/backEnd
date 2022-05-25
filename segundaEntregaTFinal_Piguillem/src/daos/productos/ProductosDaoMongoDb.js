import ContenedorMongoDb from "../../contenedores/ContenedorMongoDb.js";
import mongoose from "mongoose";

class ProductosDaoMongoDb extends ContenedorMongoDb {
  constructor(schema, model) {
    super('productos', {
      name: { type: String, required: true, max: 100 },
      price: { type: Number, required: true },
      stock: { type: Number, required: true },
      description: { type: String, required: true, max: 200 },
      password: { type: Number, required: true },
    });
 }
}

export default ProductosDaoMongoDb;
