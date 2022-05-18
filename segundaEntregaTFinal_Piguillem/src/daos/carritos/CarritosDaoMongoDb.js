import ContenedorMongoDb from "../../contenedores/ContenedorMongoDb.js"

import mongoose from "mongoose";

const coleccionCarrito = 'carrito';

const carritoSchema = new mongoose.Schema({
    name: {type: String, required: true, max: 100},
    email: {type: String, requred: true, max: 50},
    products: {type: Array, required: true},
    date: { type: Date, required: true },
    amount: { type: Number, required: true},
    total: { type: Number, required: true}
});

const carrito = mongoose.model(coleccionCarrito, carritoSchema);



class CarritosDaoMongoDb extends ContenedorMongoDb {
    constructor(schema, model) {
        this.schema = carritoSchema;
        this.model = carrito;
}
}

export default CarritosDaoMongoDb
