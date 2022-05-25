import mongoose from 'mongoose'
import config from '../config.js'

await mongoose.connect(config.mongodb.cnxStr, config.mongodb.options)

class ContenedorMongoDb {

        constructor(collection, schema) {
            this.coleccion = mongoose.model(collection, schema)
        }



async create(obj) {
        try {
        console.log('Base de datos conectada');

        console.log('create');
        
        const saveModel = new this.coleccion(obj);
        let objSaved = await saveModel.save();
        this.console.log(saved);

        }
        catch (error) {
            console.log(error);
    }  
} 

async read() {
    
    try {
        console.log('Base de datos conectada');
        console.log('Read')
        let productosLeidos = await this.coleccion.find({});
        this.console.log(usuarios);
    } 
    catch (error) {
        this.console.log(error);
    }

}

async update(condition, newProperty) {
    
    try {
        console.log('Base de datos conectada');
        console.log('Update');
        let updatedProd = await this.coleccion.updateOne({ condition }, { $set: `${newProperty}` });
        console.log(updatedProd);
    } 
    catch (error) {
        console.log(error);
    }
}

async delete(condition) {
    try {

        console.log('Base de datos conectada');
        console.log('Delete');
        let deletedProd = await this.coleccion.deleteOne({ condition });
        console.log(deletedProd); 
    }
    catch (error) {
        console.log(error);
    }
}

}

export default ContenedorMongoDb