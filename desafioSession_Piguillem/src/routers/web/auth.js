import { Router } from "express";

import path from "path";

const authWebRouter = new Router();
const getSessionName = (req) => req.session.nombre ?? "";

// RUTA QUE MUESTRA EL FORM DE LOGIN
authWebRouter.get("/", (req, res) => {
  res.sendFile("login.html", { root: '../../../views' });
});

// RUTA QUE TOMA LOS DATOS DEL BODY PARA HACER EL LOGIN
authWebRouter.get("/login", (req, res) => {
  req.session.tiempo = { maxAge: 60000 };

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

// RUTA QUE DESLOGUEA AL USUARIO AL HACER CLIC EN EL BOTON LOGOUT Y DA UN MENSAJE DE DESPEDIDA
authWebRouter.get("/logout", (req, res) => {
  const mensaje = `Hasta luego ${getSessionName(req)}`;

  req.session.destroy((err) => {
    if (err) {
      res.json({ error: "olvidar", body: err });
    } else {
      res.send(mensaje);
    }
  });
});
// RUTA QUE AL LOGUEARSE UN NUEVO USUARIO MUESTRA EL MENSAJE DE BIENVENIDA
authWebRouter.post("/login", (req, res) => {});

export default authWebRouter;
