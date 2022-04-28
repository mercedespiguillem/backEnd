const express = require("express");
const { Router } = express;

const app = express();

const ProductosApi = require("./contenedores/ProductosApi");
const productosApi = new ProductosApi("products.json");
const carritosApi = new ProductosApi("cart.json");


// permisos de administrador MIDDLEWARES

const esAdmin = true

function crearErrorNoEsAdmin(ruta, metodo) {
    
}

function soloAdmins(req, res, next) {
}






// configuro router de PRODUCTOS

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
  const nuevoProducto = await productosApi.save(req.body);

  let timeStamp = Date.now();

  res.json({ timeStamp, ...nuevoProducto });
  const products = productosApi.getAll();

  res.json(console.log("Nuevo producto agregado"));
  res.json(console.log(products));
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
// configuro router de CARRITOS

const cartsRouter = new Router();

cartsRouter.post("/", async (req, res) => {
  let newCart = {};
  let date = Date.now();
  let cart = {
    id: await carritosApi.save(newCart),
    timeStamp: date,
    productos: req.body,
  };
  res.json(await carritosApi.save(cart));
});

// NO LOGRE QUE ME ELIMINE UN CARRITO, ELIMINA TODO EL ARCHIVO
cartsRouter.delete("/:id", async (req, res) => {
  const cartId = req.params.id;
  res.json(await carritosApi.deleteById(cartId));
  res.json(console.log(`Se ha eliminado el carrito con el id: ${cartId}`));
});

cartsRouter.get("/:id/productos", async (req, res) => {
  const cartId = req.params.id;
  let cartProducts = await carritosApi.getById(cartId);
  res.json(cartProducts);
});

// NO FUNCIONA

productsRouter.post("/:id/productos", async (req, res) => {
  const prodId = req.params.id;
  const prodAgregado = await productosApi.getById(prodId);
  let newCart = {};
  let date = Date.now();
  let cart = {
    id: carritosApi.save(newCart),
    timeStamp: date,
    productos: prodAgregado,
  };
  const cartUpdated = await carritosApi.getById(cart.id);
  res.json(cartUpdated);
  res.send(console.log("Producto agregado con éxito"));
});

cartsRouter.delete("/:id/productos/:id_prod", async (req, res) => {
  const cartId = req.params.id;
  const cartProdId = req.params.id_prod;
  const productoX = await carritosApi.getById(cartProdId);
  res.json(await carritosApi.deleteById(productoX));
  res.json(
    console.log(
      `Se ha eliminado el producto ${productoX} con el id: ${cartProdId}`
    )
  );
});

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
