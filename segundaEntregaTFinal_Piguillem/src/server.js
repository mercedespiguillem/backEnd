import express from "express";
const { Router } = express;

import {
  productosDao as productosApi,
  carritosDao as carritosApi,
} from "./daos/index.js";

require('dotenv').config();

//--------------------------------------------
// configuro router de productos

const productosRouter = new Router();

productosRouter.get("/", async (req, res) => {
  const productos = await productosApi.getAll();
  res.json(productos);
});

productosRouter.post('/', async(req, res) => {
  const producto = req.body;
  await productosApi.save(producto)
  res.json(producto)
} )

// productsRouter.post("/", async (req, res) => {
//   const nuevoProducto = await productosApi.save(req.body);

//   let timeStamp = Date.now();

//   res.json({ timeStamp, ...nuevoProducto });
//   const products = productosApi.getAll();

//   res.json(console.log("Nuevo producto agregado"));
//   res.json(console.log(products));
// });

productosRouter.put("/:id", async (req, res) => {
  const param = req.params.id;
  const property = req.body;
  productosApi.updatebyId(param, property);
  res.json(`El producto con id ${param} ha sido actualizado`);
});

productosRouter.delete("/:id", async (req, res) => {
  const param = req.params.id;

  res.json(await productosApi.deleteById(param));
});

// configuro el router de carritos

const carritosRouter = new Router();

carritosRouter.get("/", async (req, res) => {
  const carrito = await carritosApi.getAll();
  res.json(carrito);
});


// Crea un carrito y le asigna un id

carritosRouter.post("/", async (req, res) => {
  res.json(await carritosApi.save(req.body));
});

//DELETE Elimina un carrito por su id
// NO FUNCIONA DESPUES DE MODIFICAR EL METODO PARA EL SIGUIENTE DELETE

carritosRouter.delete("/:id", async (req, res) => {
  const cartId = req.params.id;
  res.json(await carritosApi.deleteById(cartId));
  res.json(console.log(`Se ha eliminado el carrito con el id: ${cartId}`));
});


//GET listar todos los productos guardados en el carrito

carritosRouter.get("/:id/productos", async (req, res) => {
  const cartId = req.params.id;
  let cartProducts = await carritosApi.getById(cartId);
  res.json(cartProducts);
});

// POST para incorporar productos a un carrito por su id de producto.
// NO AGREGA ID AL NUEVO PRODUCTO

carritosRouter.post("/:id/productos", async (req, res) => {
  const cartId = req.params.id;
  const body = req.body;
  const test = await carritosApi.addProductToCart(cartId, body);
  res.json(test);
});

// DELETE Elimina un producto por su id de un carrito segun el id del mismo


carritosRouter.delete("/:id/productos/:id_prod", async (req, res) => {
  const cartId = req.params.id;
  const cartProdId = req.params.id_prod;

  res.json(await carritosApi.deleteById(cartId, cartProdId));
  res.json(console.log(`Se ha eliminado el producto con el id: ${cartProdId}`));
});

//--------------------------------------------
// configuro el servidor
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.use("/api/productos", productosRouter);
app.use("/api/carritos", carritosRouter);

export default app;
