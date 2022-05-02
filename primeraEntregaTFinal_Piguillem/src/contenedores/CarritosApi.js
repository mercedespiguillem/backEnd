const fs = require("fs");
const timeStamp = Date.now();

class CarritosApi {
  constructor(file) {
    this.file = file;
  }

  async getAll() {
    try {
      let content = await fs.promises.readFile(`${this.file}`, "utf-8");
      return JSON.parse(content);
    } catch (err) {
      console.log(`Error al leer los productos: `, err);
      return [];
    }
  }

  async save(cart) {
    let carritoArray = await this.getAll();
    let id = 1;
    let productos = [];
    if (carritoArray.length > 0) {
      id = carritoArray[carritoArray.length - 1].id + 1;
    }

    carritoArray.push({
      id: id,
      timeStamp: timeStamp,
      productos: cart,
      // .productos || productos,
    });

    try {
      await fs.promises.writeFile(
        this.file,
        JSON.stringify(carritoArray, null, 2)
      );
      console.log(id);
      return id;
    } catch (error) {
      console.log("No se ha podido agregar el producto", error);
    }
  }

  async deleteById(id, prodId) {
    let carritoArray = await this.getAll();
    let index = carritoArray.findIndex(
      (el) => parseInt(el.id) === parseInt(id)
    );
    let nuevoCarrito = carritoArray[index].productos.filter(
      (el) => parseInt(el.id) != parseInt(prodId)
    );
    console.log(carritoArray[index]);
    carritoArray[index] = nuevoCarrito;

    try {
      await fs.promises.writeFile(
        this.file,
        JSON.stringify(carritoArray, null, 2)
      );
    } catch (error) {
      console.log(`Error al borrar: `, error);
    }
  }

  async getById(id) {
    let cart;
    try {
      const carritosArray = await this.getAll();
      if ((cart = carritosArray.find((el) => el.id == id))) {
        console.log(cart);
        return cart.productos;
      } else {
        return console.log("null");
      }
    } catch {
      console.log("No se pudo encontrar el carrito por id");
    }
  }

  async addProductToCart(cartId, body) {
    let carritosArray = await this.getAll();
    console.log(carritosArray);
    // filtra el producto por id
    const filter = carritosArray.findIndex((el) => el.id == cartId);

    if (filter == -1) {
      throw new Error(
        `Error al actualizar: El producto con el id ${cartId} no existe`
      );
    }

    // body.productos[0].id = timeStamp;
    body.productos.map((producto, index) => {
      producto.id = timeStamp + (Math.floor(Math.random() * 10) + 1);
    });
    body.productos.map((producto) =>
      carritosArray[filter].productos.push(producto)
    );

    try {
      await fs.promises.writeFile(
        this.file,
        JSON.stringify(carritosArray, null, 2)
      );
    } catch (error) {
      throw new Error(`Error al borrar: ${error}`);
    }
  }
}

module.exports = CarritosApi;
