import express from "express";
import handlebars from "express-handlebars";
import faker from "faker";
import normalizr from "normalizr";

faker.locale = "es";

import { Server as HttpServer } from "http";
import { Server as Socket } from "socket.io";

// import ContainerSql from "./src/contenedores/ContainerSql.js";
import ProductosApi from "./src/contenedores/productosApi.js";
import Messages from "./src/contenedores/mensajesApi.js";
// import config from "./src/config.js";

// declaro server y apis

const app = express();
const httpServer = new HttpServer(app);
const io = new Socket(httpServer);

const productosApi = new ProductosApi();
const mensajesApi = new Messages("./mensajes.txt");

// Middlewares

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

// FAKER

// FUNCION QUE CREA PRODUCTOS RANDOM USANDO FAKER

function createArray(id) {
  return {
    id,
    name: faker.commerce.product(),
    price: faker.commerce.price(),
    stock: faker.datatype.number({ min: 10, max: 100 }),
    description: faker.commerce.productDescription(),
  };
}

// RUTA QUE MUESTRA 5 PRODUCTOS FAKER

app.get("/api/productos-test", (req, res) => {
  const amount = 5;
  const products = Array.from(Array(amount), (v, i) => createArray(i + 1));
  console.table(products);
  res.json(products);
});

// NORMALIZR

const normalize = normalizr.normalize;
const denormalize = normalizr.denormalize;
const schema = normalizr.schema;
import util from "util";

const schemaAuthor = new schema.Entity("author", {
  idAtribute: "email",
});

const schemaText = new schema.Entity("message", { text: "text" });

const schemaMessage = new schema.Entity("post", {
  author: schemaAuthor,

  idAttribute: "email",
  message: schemaText,
});

function print(obj) {
  console.log(util.inspect(obj, false, 7, true));
}


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
  const normalizedData = normalize(messagesArray, schemaMessage);
  print(normalizedData);

  // // actualizacion de mensajes

  socket.on("new-message", async (msn) => {
    await mensajesApi.save(msn);
    const messagesArray = await mensajesApi.getAll();
    io.sockets.emit("messages", messagesArray);
    const normalizedData2 = normalize(messagesArray, schemaMessage);
    print(normalizedData2);
  });
});

// // // configuro el modulo handlebars

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
  })
);

// establecemos el motor de plantilla que se utiliza
app.set("view engine", "hbs");

// establecemos el dir donde se encuentran los archivos de planilla

app.set("plantillas", "./plantillas");

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
