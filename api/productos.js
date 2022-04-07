class ProductosApi {
  constructor() {
    this.productos = [
      {
        title: "Remera",
        price: 570,
        thumbnail:
          "https://cdn3.iconfinder.com/data/icons/education-209/64/ruler-triangle-stationary-school-256.png",
        id: 1,
      },
      {
        title: "Pantalon",
        price: 1200,
        thumbnail:
          "https://cdn3.iconfinder.com/data/icons/education-209/64/calculator-math-tool-school-256.png",
        id: 2,
      },
      {
        title: "Campera",
        price: 2500,
        thumbnail:
          "https://cdn3.iconfinder.com/data/icons/education-209/64/globe-earth-geograhy-planet-school-256.png",
        id: 3,
      },
      {
        title: "Mochila",
        price: 5600,
        thumbnail:
          "https://cdn3.iconfinder.com/data/icons/education-209/64/globe-earth-geograhy-planet-school-256.png",
        id: 4,
      },
    ];
    this.id = 0;
  }

  getAll() {
    try {
      const arrayDeProductos = this.productos;
      return arrayDeProductos;
    } catch (err) {
      console.log(`Error al leer los productos: `, err);
      return [];
    }
  }

  save(product) {
    let productsArray = this.getAll();

    let id = 1;
    if (productsArray.length > 0) {
      id = productsArray[productsArray.length - 1].id + 1;
    }

    const newProd = { ...product, id: id };
    this.productos.push(newProd);
    return newProd;
  }

  getById(id) {
    const productsArray = this.getAll();
    // console.log(id);
    let product = productsArray.find((el) => el.id == id);
    console.log(product);

    return product;
  }

  deleteById(id) {
    const productsArray = this.getAll();
    console.log(id);

    const toDelete = productsArray.findIndex((el) => el.id == id);

    if (toDelete == -1) {
      throw new Error(`El producto con id ${id} no existe`);
    }

    // Esta forma no elimina el producto del array, filtra el producto con el id seleccionado y muestra los productos que quedan
    // const rest = productsArray.filter((el) => parseInt(el.id) != parseInt(id));
    // return rest;

    const deleteProd = this.productos.splice(toDelete, 1);
    const deleted = { "Producto eliminado": deleteProd };
    return deleted;
  }

  updatebyId(id, newProperty) {
    const productsArray = this.getAll();

    // filtra el producto por id
    const filter = productsArray.findIndex((el) => el.id == id);

    if (filter == -1) {
      throw new Error(
        `Error al actualizar: El producto con el id ${id} no existe`
      );
    }

    return (this.productos[filter] = {
      ...this.productos[filter],
      ...newProperty,
    });
  }
}

module.exports = ProductosApi;
