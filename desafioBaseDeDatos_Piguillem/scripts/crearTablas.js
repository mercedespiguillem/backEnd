
import ContainerSql from "../src/contenedores/ContainerSql.js";

import config from "../src/config.js";

const productosApi = new ContainerSql(config.mysqlDB, "products");
const mensajesApi = new ContainerSql(config.sqlite3, "messages");

//------------------------------------------
// productos en MariaDb

try {
  productosApi
    .createTable()
    .then(() => {
      const productos = [
        { nombre: "Remera", codigo: "PSODH", precio: 700, stock: 50 },
        { nombre: "Pantalones", codigo: "GREGG", precio: 1200, stock: 50 },
        { nombre: "Gorra", codigo: "BGBNS", precio: 900, stock: 122 },
        { nombre: "Campera", codigo: "QWSAD", precio: 5000, stock: 20 },
      ];
      return productosApi.insert(productos);
    })
    .then(() => {
      return productosApi.getAllProducts();
    })
    .then(() => {
      console.table("products");
      console.log("tabla productos en mariaDb creada con éxito");
    });
} catch (error) {
  console.log(error);
} finally {
  productosApi.close();
}

//------------------------------------------
// mensajes en SQLite3

try {
  mensajesApi
    .createTable()
    .then(() => {
      const mensaje = {
        author: "pepito@gmail.com",
        text: "Hola!!",
        date: "10/10/21",
      };

      return mensajesApi.insert(mensaje);
    })
    .then(() => {
      return mensajesApi.getAllProducts();
    })
    .then(() => {
      console.table("messages");
      console.log("tabla mensajes en sqlite3 creada con éxito");
    });
} catch (error) {
  console.log(error);
} finally {
  mensajesApi.close();
}
