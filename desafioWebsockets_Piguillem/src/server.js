const express = require("express");
const handlebars = require("express-handlebars");

const { Server: HttpServer } = require("http");
const { Server: Socket } = require("socket.io");

const ProductosApi = require("../contenedores/productosApi");
const MessagesApi = require("../contenedores/mensajesApi");
const productosApi = new ProductosApi();
const mensajesApi = new MessagesApi("mensajes.txt");

// declaro server y apis
const app = express();
const httpServer = new HttpServer(app);
const io = new Socket(httpServer);

// Middlewares

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// espacio publico del server
app.use(express.static("public"));

// socket

io.on("connection", async (socket) => {
  console.log("Nuevo cliente conectado!");

  // carga inicial de productos

  const productos = await productosApi.getAll();
  socket.emit("productos", productos);

  // actualizacion de productos

  socket.on("new-product", async (product) => {
    await productosApi.save(product);
    const productos = await productosApi.getAll();
    io.sockets.emit("productos", productos);
  });

  // // carga inicial de mensajes
  const messagesArray = await mensajesApi.getAll();
  socket.emit("messages", messagesArray);

  // // actualizacion de mensajes

  socket.on("new-message", async (msn) => {
    await mensajesApi.save(msn);
    const messagesArray = await mensajesApi.getAll();
    io.sockets.emit("messages", messagesArray);
  });
});

// // configuro el modulo handlebars

app.get("/", (req, res) => {
  res.sendFile("index.html", { root: __dirname });
});

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
    // layoutsDir: __dirname + "/public/plantillas/",
  })
);

// establecemos el motor de plantilla que se utiliza
app.set("view engine", "hbs");

// establecemos el dir donde se encuentran los archivos de planilla

app.set("plantillas", "./plantillas");

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
