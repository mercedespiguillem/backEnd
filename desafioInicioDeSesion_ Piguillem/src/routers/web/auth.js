import { Router } from "express";

// ------------ EJS PLANTILLA

import path from "path";

// INSTANCIO ROUTER

const authWebRouter = new Router();

// const getSessionName = (req) => req.session.nombre ?? "";

// controladores
// solicuionar tema de las rutas con el front pero funciona la coneccion con mongo atlas.

authWebRouter.get("/", (req, res) => {
  res.sendFile(path.join(process.cwd(), "/views/login.html"));
  // res.redirect("/");
});

authWebRouter.get("/login", (req, res) => {
  const nombre = req.session?.nombre;
  if (nombre) {
    res.redirect("/");
  } else {
    res.sendFile(path.join(process.cwd(), "/views/login.html"));
  }
});

authWebRouter.get("/logout", (req, res) => {
  const nombre = req.session?.nombre;
  if (nombre) {
    req.session.destroy((err) => {
      if (!err) {
        res.render(path.join(process.cwd(), "/views/pages/logout.ejs"), {
          nombre,
        });
      } else {
        res.redirect("/");
      }
    });
  } else {
    res.redirect("/");
  }
});

authWebRouter.post("/login", (req, res) => {
  req.session.nombre = req.body.nombre;
  res.redirect("/home");
});

// authWebRouter.get("/", (req, res) => {
//   res.sendFile(path.join(process.cwd(), "/views/login.html"));
// });

// // RUTA QUE TOMA LOS DATOS DEL BODY PARA HACER EL LOGIN

// authWebRouter.get("/login", (req, res) => {
//   const name = req.session?.nombre;

//   if (name) {
//     res.redirect("/");
//   } else {
//     res.sendFile(path.join(process.cwd(), "/views/login.html"));
//   }

//   // if (!req.session.contador) {
//   //   req.session.nombre = req.body;
//   //   req.session.contador = 1;
//   //   res.send(`BIENVENIDO ${getSessionName(req)}`);
//   // } else {
//   //   req.session.tiempo;
//   //   // res.redirect("../views/pages/logout.ejs");

//   //   req.session.contador++;
//   //   res.send(
//   //     `${getSessionName(req)} visitaste la página ${
//   //       req.session.contador
//   //     } veces.`
//   //   );
//   // }
// });

// // RUTA QUE DESLOGUEA AL USUARIO AL HACER CLIC EN EL BOTON LOGOUT Y DA UN MENSAJE DE DESPEDIDA
// authWebRouter.get("/logout", (req, res) => {
//   res.sendFile(path.join(process.cwd(), "/views/pages/logout.ejs"));
//   req.session.destroy((err) => {
//     if (err) {
//       res.json({ error: "olvidar", body: err });
//     } else {
//       res.send(mensaje);
//     }
//   });
// });

// // RUTA QUE AL LOGUEARSE UN NUEVO USUARIO MUESTRA EL MENSAJE DE BIENVENIDA
// authWebRouter.post("/login", (req, res) => {});

export default authWebRouter;
