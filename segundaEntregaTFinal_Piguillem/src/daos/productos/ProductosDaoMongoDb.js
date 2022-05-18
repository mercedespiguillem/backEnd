import ContenedorMongoDb from "../../contenedores/ContenedorMongoDb.js"
import mongoose from "mongoose";

const coleccionProductos = 'productos';

const productoSchema = new mongoose.Schema({
    name: {type: String, required: true, max: 100},
    price: {type: Number, required: true},
    stock: {type: Number, required: true},
    description: {type: String, required: true, max: 200},
    password: {type: Number, required: true}
});

const productos = mongoose.model(coleccionProductos, productoSchema);


class ProductosDaoMongoDb extends ContenedorMongoDb {
    constructor( schema, model) {
        this.schema = productoSchema
        this.model = productos
    }

}








export default ProductosDaoMongoDb
