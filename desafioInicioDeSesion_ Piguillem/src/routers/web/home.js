import { Router } from "express";
import { webAuth } from "../../auth/index.js";

import path from "path";

const productosWebRouter = new Router();

// aca van las rutas que muetran la lista de productos y el test con faker

// RUTA QUE MUESTRA EL INICIO DONDE ESTA EL LISTADO DE LOS PROD
productosWebRouter.get("/home", webAuth, (req, res) => {
  res.sendFile(__dirname + '/views/index.html');
});

productosWebRouter.get("/productos-vista-test", (req, res) => {});

export default productosWebRouter;
