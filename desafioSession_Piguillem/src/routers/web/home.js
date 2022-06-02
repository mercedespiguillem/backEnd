import { Router } from 'express'
import { webAuth } from '../../auth/index.js'

import path from 'path'

const productosWebRouter = new Router()

// RUTA QUE MUESTRA EL INICIO DONDE ESTA EL LISTADO DE LOS PROD
productosWebRouter.get('/home', webAuth, (req, res) => {
    
})

productosWebRouter.get('/productos-vista-test', (req, res) => {
    
})

export default productosWebRouter