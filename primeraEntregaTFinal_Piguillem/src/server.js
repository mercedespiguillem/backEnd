const express = require("express");
const { Router } = express;

const app = express();

const ProductosApi = require("./contenedores/ProductosApi");
const CarritosApi = require("./contenedores/CarritosApi");
const productosApi = new ProductosApi("products.json");
const carritosApi = new CarritosApi("cart.json");

// MIDDLEWARES administrador

const esAdmin = true;

function errorNoAdmin(ruta, metodo) {
  const error = {
    error: -1,
  };
  if ((ruta, metodo)) {
    error.descripcion = `ruta ${ruta} metodo ${metodo} no autorizado.`;
  } else {
    error.descripcion = "No autorizado";
  }
  return error;
}

function soloAdmins(req, res, next) {
  if (!esAdmin) {
    res.json(errorNoAdmin());
  } else {
    next();
  }
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

// Crea un carrito y le asigna un id

cartsRouter.post("/", async (req, res) => {
  res.json(await carritosApi.save(req.body));
});

//DELETE Elimina un carrito por su id
// NO FUNCIONA DESPUES DE MODIFICAR EL METODO PARA EL SIGUIENTE DELETE

cartsRouter.delete("/:id", async (req, res) => {
  const cartId = req.params.id;
  res.json(await carritosApi.deleteById(cartId));
  res.json(console.log(`Se ha eliminado el carrito con el id: ${cartId}`));
});


//GET listar todos los productos guardados en el carrito

cartsRouter.get("/:id/productos", async (req, res) => {
  const cartId = req.params.id;
  let cartProducts = await carritosApi.getById(cartId);
  res.json(cartProducts);
});

// POST para incorporar productos a un carrito por su id de producto.
// NO AGREGA ID AL NUEVO PRODUCTO

cartsRouter.post("/:id/productos", async (req, res) => {
  const cartId = req.params.id;
  const body = req.body;
  const test = await carritosApi.addProductToCart(cartId, body);
  res.json(test);
});

// DELETE Elimina un producto por su id de un carrito segun el id del mismo


cartsRouter.delete("/:id/productos/:id_prod", async (req, res) => {
  const cartId = req.params.id;
  const cartProdId = req.params.id_prod;

  res.json(await carritosApi.deleteById(cartId, cartProdId));
  res.json(console.log(`Se ha eliminado el producto con el id: ${cartProdId}`));
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
