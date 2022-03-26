const fs = require("fs");

const file = "./products.txt";

class Contenedor {
  constructor(file) {
    this.file = file;
  }

  async save(producto) {
    // El resultado de la funcion getall() es el array de productos
    let productsArray = await this.getAll();
    // console.log(arrayDeProductos);

    // inicializo la propiedad id en 1

    let id = 1;
    if (productsArray.length > 0) {
      productsArray.map((prod) => (prod.id = id + 1));
    }

    const nuevoProducto = { ...producto, id: id };
    productsArray.push(nuevoProducto);

    try {
      await fs.writeFile(`${this.file}`, JSON.stringify(producto, null, 2));
    } catch (error) {
      console.log("No se ha podido agregar el objeto", error);
    }
  }

  async getAll() {
    try {
      // Lee el archivo y lo guarda en una variable
      let content = await fs.promises.readFile(`${this.file}`, "utf-8");

      // Muestra el contenido del archivo por consola
      console.log(content);
    } catch (err) {
      console.log(`Error al leer los productos: `, err);
    }
  }

  async getById(id) {
    let product;
    try {
      const productsArray = await this.getAll();
      product = productsArray.find((el) => el.id == id);
      return product;
    } catch {
      console.log("No se pudo encontrar el producto por id");
    }
  }

  async deleteById(id) {
    const productsArray = await this.getAll();
    const rest = productsArray.filter((el) => parseInt(el.id) != parseInt(id));
    await this.deleteAll();
    try {
      await fs.writeFile(this.file, JSON.stringify(rest, null, 2));
    } catch (error) {
      throw new Error(`Error al borrar: `, error);
    }
  }

  async deleteAll() {
    fs.unlink(`${this.file}`, (error) => {
      error
        ? console.log(`error al borrar archivo: ${error}`)
        : console.log(`Archivo borrado con exito`);
    });
  }
}

module.exports = Contenedor;
