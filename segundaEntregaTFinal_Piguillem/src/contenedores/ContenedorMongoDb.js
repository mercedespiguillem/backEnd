import mongoose from 'mongoose'
import config from '../config.js'

class ContenedorMongoDb {
    constructor(config, schema, model) {
        this.mongoose = config.mongodb;
        this.schema = schema;
        this.model = model;

    }

async create(obj) {
        try {
        const URL = 'mongodb://localhost:27017/ecommerce'
        await mongoose.connect(URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('Base de datos conectada');

        console.log('create');
        
        const saveModel = new this.model(obj);
        let objSaved = await saveModel.save();
        this.console.log(saved);

        }
        catch (error) {
            console.log(error);
    }  
} 

async read() {
    
    
    try {
        const URL = 'mongodb://localhost:27017/ecommerce'
        await mongoose.connect(URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('Base de datos conectada');
        console.log('Read')
        let productosLeidos = await this.model.find({});
        this.console.log(usuarios);
    } 
    catch (error) {
        this.console.log(error);
    }

}

async update(condition, newProperty) {
    
    try {
        const URL = 'mongodb://localhost:27017/ecommerce'
        await mongoose.connect(URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('Base de datos conectada');
        console.log('Update');
        let updatedProd = await this.model.updateOne({ condition }, { $set: `${newProperty}` });
        console.log(updatedProd);
    } 
    catch (error) {
        console.log(error);
    }
}

async delete(condition) {
    try {
        const URL = 'mongodb://localhost:27017/ecommerce'
        await mongoose.connect(URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('Base de datos conectada');
        console.log('Delete');
        let deletedProd = await this.model.deleteOne({ condition });
        console.log(deletedProd); 
    }
    catch (error) {
        console.log(error);
    }
}

}

export default ContenedorMongoDb