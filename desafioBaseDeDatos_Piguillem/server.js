import express from "express";

import faker from "faker";

faker.locale = "es";

import { Server as HttpServer } from "http";
import { Server as Socket } from "socket.io";

import ContainerSql from "./src/contenedores/ContainerSql.js";

import config from "./src/config.js";

// declaro server y apis
const app = express();
const httpServer = new HttpServer(app);
const io = new Socket(httpServer);

const productosApi = new ContainerSql(config.mysqlDB, "products");
const mensajesApi = new ContainerSql(config.sqlite3, "messages");

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

// socket

io.on("connection", async (socket) => {
  console.log("Nuevo cliente conectado!");

  // carga inicial de productos

  //   const productos = await productosApi.getAll();
  //   socket.emit("productos", productos);

  //   // actualizacion de productos

  //   socket.on("new-product", async (product) => {
  //     await productosApi.save(product);
  //     const productos = await productosApi.getAll();
  //     io.sockets.emit("productos", productos);
  //   });

  //   // // carga inicial de mensajes
  //   const messagesArray = await mensajesApi.getAll();
  //   socket.emit("messages", messagesArray);

  //   // // actualizacion de mensajes

  //   socket.on("new-message", async (msn) => {
  //     await mensajesApi.save(msn);
  //     const messagesArray = await mensajesApi.getAll();
  //     io.sockets.emit("messages", messagesArray);
  //   });
  // });

  // // // configuro el modulo handlebars

  // app.get("/", (req, res) => {
  //   res.sendFile("index.html", { root: __dirname });
  // });

  // app.engine(
  //   // nombre de la extension referencia a la plantilla, se usa luego en set
  //   "hbs",
  //   // funcion de config de handlebars
  //   handlebars({
  //     // extension a utilizar
  //     extname: ".hbs",
  //     // plantilla ppal
  //     defaultLayout: "index.hbs",
  //   })
  // );

  // establecemos el motor de plantilla que se utiliza
  // app.set("view engine", "hbs");

  // establecemos el dir donde se encuentran los archivos de planilla

  // app.set("plantillas", "./plantillas");
});
