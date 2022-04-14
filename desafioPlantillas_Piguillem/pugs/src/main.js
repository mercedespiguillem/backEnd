const express = require("express");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

const ProductosApi = require("../api/productos");
const productosApi = new ProductosApi();

app.set("views", "../views");
app.set("view engine", "pug");

app.post("/productos", (req, res) => {
  const prod = req.body;
  productosApi.save(prod);
  res.redirect("/");
});

app.get("/productos", (req, res) => {
  let products = productosApi.getAll();
  res.render("main", {
    productos: products,
    productosEnArray: products.length > 0,
  });
});

const PORT = 8080;

app.listen(PORT, (err) => {
  if (err) throw new Error(`Error en el server ${err}`);
  console.log(`El server express escuchando en el puerto ${PORT}`);
});
