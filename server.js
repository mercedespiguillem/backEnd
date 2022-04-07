const express = require("express");
const { Router } = express;
const ProductosApi = require("./api/productos");

// router de productos

const productosApi = new ProductosApi();

const productosRouter = new Router();

productosRouter.use(express.json());
productosRouter.use(express.urlencoded({ extended: true }));

//RUTAS LLAMANDO A LOS METODOS DE LA CLASE

//GET que trae el array de productos

productosRouter.get("/", (req, res) => {
  let products = productosApi.getAll();
  res.json(products);
});

//  POST que agrega un nuevo producto al array y le asigna un id

productosRouter.post("/", (req, res) => {
  const prod = productosApi.save(req.body);
  res.json(prod);
});

//  GET que busca un producto segun su id y si no le encuentra muestra un error

productosRouter.get("/:id", (req, res) => {
  const id = req.params.id;
  const prod = productosApi.getById(id);

  if (id != prod) {
    return res.status(400).send({ error: "producto no encontrado" });
  }

  res.json(prod);
});

//Ruta DELETE que elimina un elemento del array

productosRouter.delete("/:id", (req, res) => {
  const param = req.params.id;
  const productsLeft = productosApi.deleteById(param);
  res.json(productsLeft);
});

// PUT que actualiza la informacion de un producto del array segun id
productosRouter.put("/:id", (req, res) => {
  const param = req.params.id;
  const property = req.body;
  productosApi.updatebyId(param, property);
  res.json(`El producto con id ${param} ha sido actualizado`);
});

// servidor

const app = express();
app.use(express.static("public"));
app.use("/api/productos", productosRouter);

const PORT = 8080;
const server = app.listen(PORT, () => {
  console.log(`Servidor http escuchando en el puerto ${server.address().port}`);
});
server.on("error", (error) => console.log(`Error en servidor ${error}`));
