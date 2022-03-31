const Contenedor = require("./contenedor.js");

const express = require("express");
const app = express();
const productos = new Contenedor("./products.txt");

const server = app.listen(8080, () => {
  console.log("servidor http en el puerto 8080!!");
});

app.get("/", (req, res) => {
  res.send(
    '<h1 style="color: red">Bienvenidos al desafio de servidor express las rutas disponibles son: /productos y /productoRandom ;)</h1>'
  );
});

// Ruta que devuelve el array de productos

app.get("/productos", (req, res) => {
  productos.getAll().then((resp) => res.send(resp));
});

// Ruta que devuelve un producto random del array

app.get("/productoRandom", (req, res) => {
  productos.getAll().then((array) => {
    const id = parseInt(Math.random() * array.length);
    res.send(array[id]);
  });
});

server.on("error", (error) => console.log(`Error en el servidor ${error}`));
