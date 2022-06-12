import express from "express";
import session from "express-session";
import cookieParser from "cookie-parser";
import MongoStore from "connect-mongo";
import handlebars from "express-handlebars";

// import config from "./config.js";

// import { Server as HttpServer } from 'http'
// import { Server as Socket } from 'socket.io'

import authWebRouter from "./routers/web/auth.js";
import homeWebRouter from "./routers/web/home.js";
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

app.use(
  session({
    store: MongoStore.create({
      // mongoUrl: conection string del local mongodb://ip/mibase
      mongoUrl:
        "mongodb+srv://mechipi:12345@cluster0.cjkzi.mongodb.net/?retryWrites=true&w=majority",
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
