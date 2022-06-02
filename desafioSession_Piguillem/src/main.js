import express from "express";
import session from "express-session";
import cookieParser from "cookie-parser";
import MongoStore from "connect-mongo";
import handlebars from "express-handlebars";

// import config from "./config.js";

// import { Server as HttpServer } from 'http'
// import { Server as Socket } from 'socket.io'

import authWebRouter from "./routers/web/auth.js";
// import homeWebRouter from './routers/web/home.js'
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

// app.set("view engine", "ejs");

const advancedOptions = { useNewUrlParser: true, useUnifiedTopology: true };

app.use(
  session({
    store: MongoStore.create({
      mongoUrl:
        "mongodb+srv://mechipi:NCEm7CFzMBjP4qQ@cluster0.cjkzi.mongodb.net/sesiones?retryWrites=true&w=majority",
      mongoOptions: advancedOptions,
    }),
    secret: "secreto",
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 600000,
    },
  })
);

//--------------------------------------------
// rutas del servidor API REST

const getSessionName = (req) => req.session.nombre ?? "";

app.get("/", (req, res) => {
  const tiempo = { maxAge: 60000 };

  if (!req.session.contador) {
    req.session.nombre = req.query.nombre;
    req.session.contador = 1;
    res.send(`BIENVENIDO ${getSessionName(req)}`);
  } else {
    req.session.tiempo;
    // res.redirect("../views/pages/logout.ejs");

    req.session.contador++;
    res.send(
      `${getSessionName(req)} visitaste la página ${
        req.session.contador
      } veces.`
    );
  }
});

app.get("/olvidar", (req, res) => {
  const mensaje = `Hasta luego ${getSessionName(req)}`;

  req.session.destroy((err) => {
    if (err) {
      res.json({ error: "olvidar", body: err });
    } else {
      res.send(mensaje);
    }
  });
});

//--------------------------------------------
// rutas del servidor web

// app.get("/", (req, res) => {
//   res.sendFile("../views/login.html", { root: __dirname });
// });


//--------------------------------------------
// inicio el servidor
const PORT = 8080;
app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});

app.on("error", (error) => console.log(`Error en servidor ${error}`));
