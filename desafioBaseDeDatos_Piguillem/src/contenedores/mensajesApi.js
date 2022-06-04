import { promises } from "fs";

// const file = "/mensajes.json";

class Messages {
  constructor(file) {
    this.file = file;
  }

  async save(product) {
    // El resultado de la funcion getall() es el array de productos
    let productsArray = await this.getAll();

    let id = 1;
    if (productsArray.length > 0) {
      id = productsArray[productsArray.length - 1].id + 1;
    }

    const newProduct = { ...product, id: id };
    productsArray.push(newProduct);

    try {
      await promises.writeFile(
        this.file,
        JSON.stringify(productsArray, null, 2)
      );
      console.log(id);
      return id;
    } catch (error) {
      console.log("No se ha podido agregar el objeto", error);
    }
  }

  async getAll() {
    try {
      // Lee el archivo y lo guarda en una variable
      let content = await promises.readFile(this.file, "utf-8");
      // console.log(JSON.parse(content));
      // Retorna un array de objetos
      return JSON.parse(content);
    } catch (err) {
      console.log(`Error al leer los mensajes: `, err);
      return [];
    }
  }

  async getById(id) {
    let product;
    try {
      const productsArray = await this.getAll();
      if ((product = productsArray.find((el) => el.id == id))) {
        console.log(product);
        return product;
      } else {
        return console.log("null");
      }
    } catch {
      console.log("No se pudo encontrar el producto por id");
    }
  }

  async deleteById(id) {
    const productsArray = await this.getAll();
    const rest = productsArray.filter((el) => parseInt(el.id) != parseInt(id));
    await this.deleteAll();
    try {
      await promises.writeFile(this.file, JSON.stringify(rest, null, 2));
    } catch (error) {
      console.log(`Error al borrar: `, error);
    }
  }

  async deleteById(id) {
    const productsArray = await this.getAll();

    try {
      const rest = productsArray.filter(
        (el) => parseInt(el.id) != parseInt(id)
      );
      console.log(` Se eliminó el producto:`, rest);
      try {
        promises.writeFile(this.file, JSON.stringify(rest, null, 2));
      } catch (err) {
        console.log(err);
      }
      //   await fs.promises.writeFile(this.file, );
    } catch (error) {
      console.log(`Error al borrar: `, error);
    }
  }

  async deleteAll() {
    unlink(this.file, (error) => {
      error
        ? console.log(`error al borrar archivo: ${error}`)
        : console.log(`Archivo borrado con exito`);
    });
  }
}

export default Messages;
