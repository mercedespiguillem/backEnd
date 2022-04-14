const express = require("express");
const handlebars = require("express-handlebars");

const app = express();


app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))

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
    layoutsDir: __dirname + "/views/layouts/",
  })
);

// establecemos el motor de plantilla que se utiliza
app.set("view engine", "hbs");

// establecemos el dir donde se encuentran los archivos de planilla

app.set("views", "./views");

// espacio publico del server

app.use(express.static("public"));

// const products = [
//   {
//     title: "Remera",
//     price: 570,
//     thumbnail:
//       "https://cdn3.iconfinder.com/data/icons/education-209/64/ruler-triangle-stationary-school-256.png",
//     id: 1,
//   },
//   {
//     title: "Pantalon",
//     price: 1200,
//     thumbnail:
//       "https://cdn3.iconfinder.com/data/icons/education-209/64/calculator-math-tool-school-256.png",
//     id: 2,
//   },
//   {
//     title: "Campera",
//     price: 2500,
//     thumbnail:
//       "https://cdn3.iconfinder.com/data/icons/education-209/64/globe-earth-geograhy-planet-school-256.png",
//     id: 3,
//   },
// ];

app.get("/productos", (req, res) => {
  let products = productosApi.getAll();
  res.render("main", { productos : products,
  productosEnArray: products.length });
});

app.post("/productos", (req, res) => {
  const prod = req.body
  productosApi.save(prod);
  res.redirect("/");
});

const PORT = 8080;

app.listen(PORT, (err) => {
  if (err) throw new Error(`Error en el server ${err}`);
  console.log(`El server express escuchando en el puerto ${PORT}`);
});
