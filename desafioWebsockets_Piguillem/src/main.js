const express = require("express");
const handlebars = require("express-handlebars");

const { Server: HttpServer } = require("http");
const { Server: Socket } = require("socket.io");

const ProductosApi = require("../contenedores/productosApi");
const Messages = require("../contenedores/archivosApi");

// declaro server y apis
const app = express();
const httpServer = new HttpServer(app);
const io = new Socket(httpServer);

const productosApi = new ProductosApi();
const messages = new Messages("mensajes.json");
// const messages = [];

io.on("connection", async (socket) => {
  console.log("Nuevo cliente conectado!");

  // carga inicial de productos

  socket.emit("productosApi", productosApi.getAll());

  // actualizacion de productos

  socket.on("new-producto", (producto) => {
    productosApi.save(producto);
    io.sockets.emit("productosApi", productosApi.getAll());
  });

  // carga inicial de mensajes
  socket.emit("messages", messages.getAll());

  // actualizacion de mensajes
  socket.on("new-message", (message) => {
    messages.save(message);
    io.sockets.emit("messages",  messages.getAll());
  });


});

// Middlewares

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// espacio publico del server
app.use(express.static("public"));

// // configuro el modulo handlebars

// app.engine(
//   // nombre de la extension referencia a la plantilla, se usa luego en set
//   "hbs",
//   // funcion de config de handlebars
//   handlebars({
//     // extension a utilizar
//     extname: ".hbs",
//     // plantilla ppal
//     defaultLayout: "index.hbs",
//     // ruta a la plantilla ppal
//     // layoutsDir: __dirname + "/public/plantillas/",
//   })
// );

// // establecemos el motor de plantilla que se utiliza
// app.set("view engine", "hbs");

// // establecemos el dir donde se encuentran los archivos de planilla

// app.set("plantillas", "./plantillas");

// app.post("/productos", (req, res) => {
//   const prod = req.body;
//   productosApi.save(prod);
//   res.redirect("/");
// });

// app.get("/productos", (req, res) => {
//   let products = productosApi.getAll();
//   res.render("main", {
//     productos: products,
//     productosEnArray: products.length > 0,
//   });
// });

// inicio el servidor

const PORT = 8080;
const connectedServer = httpServer.listen(PORT, () => {
  console.log(
    `Servidor http escuchando en el puerto ${connectedServer.address().port}`
  );
});
connectedServer.on("error", (error) =>
  console.log(`Error en servidor ${error}`)
);
