const express = require("express");
const { Router } = express;

const app = express();

const ProductosApi = require("./contenedores/ProductosApi");
const productosApi = new ProductosApi("products.json");

// configuro router de productos

const productsRouter = new Router();

productsRouter.get("/", async (req, res) => {
  const products = await productosApi.getAll();
  res.json(products);
  res.send(console.log(products));
});

productsRouter.get("/:id", async (req, res) => {
  const id = req.params.id;
  const prod = await productosApi.getById(id);
  res.json(prod);
  res.send(console.log(`El producto ${req.params.id} ha sido encontrado`));
});

productsRouter.post("/", async (req, res) => {

    const prod = await productosApi.save(req.body);
    res.json(prod);
//   let timeStamp = Date.now();
//   res.json({ id: await productosApi.save(req.body) });
  //   res.json(console.log(req.body));

});

productsRouter.put("/:id", async (req, res) => {
  const param = req.params.id;
  const property = req.body;
  productosApi.updatebyId(param, property);
  res.json(`El producto con id ${param} ha sido actualizado`);
});

productsRouter.delete("/:id", async (req, res) => {
  const param = req.params.id;

  res.json(await productosApi.deleteById(param));
});

//--------------------------------------------
// configuro router de carritos

const cartsRouter = new Router();

//--------------------------------------------
// permisos de administrador MIDDLEWARES

// configuro el servidor

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.use("/api/productos", productsRouter);
app.use("/api/carritos", cartsRouter);

const PORT = 8080;
const server = app.listen(PORT, () => {
  console.log(`Servidor http escuchando en el puerto ${server.address().port}`);
});
server.on("error", (error) => console.log(`Error en servidor ${error}`));
