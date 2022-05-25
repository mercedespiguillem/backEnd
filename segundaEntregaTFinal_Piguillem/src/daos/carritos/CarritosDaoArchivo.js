import ContenedorArchivo from "../../contenedores/ContenedorArchivo.js"

class CarritosDaoArchivo extends ContenedorArchivo {
    constructor() {
        super('../../../DB/carritos.json')
    }
}

export default CarritosDaoArchivo
