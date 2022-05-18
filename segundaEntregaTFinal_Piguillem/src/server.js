import express from "express";
const { Router } = express;

import {
  productosDao as productosApi,
  carritosDao as carritosApi,
} from "./daos/index.js";

//--------------------------------------------
// configuro router de productos

const productosRouter = new Router();

productosRouter.get("/", async (req, res) => {
  const productos = await productosApi.getAll();
  res.json(productos);
});

// configuro el router de carritos

const carritosRouter = new Router();

carritosRouter.get("/", async (req, res) => {
  const carrito = await carritosApi.getAll();
  res.json(carrito);
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
