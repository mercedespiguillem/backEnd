const express = require("express");

// const ProductosApi = require("./api/productos");
// const productosApi = [];

const productosApi = []

const app = express();

app.use(express.urlencoded({ extended: true }));

app.set("views", "./views");
app.set("view engine", "ejs");


app.get("/", (req, res) => {
    
//   let products = productosApi.getAll();
  res.render("inicio", { productosApi });
});

app.post("/productos", (req, res) => {
  productosApi.push(req.body);
  res.redirect("/");
});

app.listen(8080);
