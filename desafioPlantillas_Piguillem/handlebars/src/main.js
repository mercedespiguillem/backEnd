const express = require("express");
const handlebars = require("express-handlebars");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// espacio publico del server
app.use(express.static("public"));

const ProductosApi = require("../api/productos");
const productosApi = new ProductosApi();

// configuro el modulo handlebars

app.engine(
  // nombre de la extension referencia a la plantilla, se usa luego en set
  "hbs",
  // funcion de config de handlebars
  handlebars({
    // extension a utilizar
    extname: ".hbs",
    // plantilla ppal
    defaultLayout: "index.hbs",
    // ruta a la plantilla ppal
    // layoutsDir: __dirname + "/views/layouts/",
  })
);

// establecemos el motor de plantilla que se utiliza
app.set("view engine", "hbs");

// establecemos el dir donde se encuentran los archivos de planilla

app.set("views", "./views");

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
