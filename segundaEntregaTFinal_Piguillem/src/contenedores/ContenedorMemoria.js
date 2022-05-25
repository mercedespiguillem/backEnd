class ContenedorMemoria {
  constructor() {
    this.elements = [];
  }

  getById(id) {
    const elem = this.elements.find((elem) => elem.id == id);
    if (!elem) {
      throw new Error(`Error al listar: elemento no encontrado`);
    } else {
      return elem;
    }
  }

  getAll() {
    return [...this.elements];
  }

  save(elem) {
    let newId;
    if (this.elements.length == 0) {
      newId = 1;
    } else {
      newId = this.elements[this.elements.length - 1].id + 1;
    }

    const newElem = { ...elem, id: newId };
    this.elements.push(newElem);
    return newElem;
  }

  Update(elem) {
    elem.id = Number(elem.id);
    const index = this.elements.findIndex((p) => p.id == elem.id);
    if (index == -1) {
      throw new Error(`Error al actualizar: elemento no encontrado`);
    } else {
      this.elements[index] = elem;
      return elem;
    }
  }

  deleteById(id) {
    const index = this.elements.findIndex((elem) => elem.id == id);
    if (index == -1) {
      throw new Error(`Error al borrar: elemento no encontrado`);
    } else {
      return this.elements.splice(index, 1);
    }
  }

  deleteAll() {
    this.elements = [];
  }
}

export default ContenedorMemoria;
