import express from "express";
import session from "express-session";
import cookieParser from "cookie-parser";
import MongoStore from "connect-mongo";
import handlebars from "express-handlebars";

// import config from "./config.js";
// require("dotenv").config();

// import { Server as HttpServer } from 'http'
// import { Server as Socket } from 'socket.io'

import authWebRouter from "./routers/web/auth.js";
import homeWebRouter from "./routers/web/home.js";
import { config } from "dotenv";
// import productosApiRouter from './routers/api/productos.js'

// import addProductosHandlers from './routers/ws/productos.js'
// import addMensajesHandlers from './routers/ws/mensajes.js'

//--------------------------------------------
// instancio servidor, socket y api

const app = express();
app.use(cookieParser());

//--------------------------------------------
// configuro el servidor

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.set("views", "./views");
app.set("view engine", "ejs");

const advancedOptions = { useNewUrlParser: true, useUnifiedTopology: true };
// const tiempoExpiracion = process.env.TIEMPO_EXPIRACION;
// const mongoAtlasString = process.env.STRING_MONGO_ATLAS;
// const URLdb = process.env.URL_BASE_DE_DATOS;

console.log(mongoAtlasString);
app.use(
  session({
    store: MongoStore.create({
      // mongoUrl: conection string del local mongodb://ip/mibase
      mongoUrl: mongoAtlasString,
      mongoOptions: advancedOptions,
    }),
    secret: "secreto",
    resave: false,
    saveUninitialized: false,
    rolling: true,
    cookie: {
      maxAge: 6000,
    },
  })
);

//--------------------------------------------
// rutas del servidor API REST

app.use(homeWebRouter);

//--------------------------------------------
// rutas del servidor web

app.use(authWebRouter);

//--------------------------------------------
// inicio el servidor
const PORT = 8080;
app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});

app.on("error", (error) => console.log(`Error en servidor ${error}`));
