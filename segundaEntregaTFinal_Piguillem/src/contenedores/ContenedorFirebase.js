import admin from "firebase-admin";
import config from "../config.js";

admin.initializeApp({
  credential: admin.credential.cert(config.firebase)
});

console.log("Base firebase conectada");

class ContenedorFirebase {
  constructor(coleccion) {
    this.db = admin.firestore();
    this.query = db.collection(coleccion);
  }

  async create(obj) {
    try {
      let id = 1;
      let document = query.doc(`${id}`);
      await document.create(`${obj}`);
      id++;

      console.log("Se agregó el objeto: "`${obj}`);
    } catch (error) {
      console.log(error);
    }
  }

  async getAll() {
    try {
      const querySnapshot = await query.get();
      let docs = querySnapshot.docs;

      const response = docs.map((doc) => ({
        id: doc.id,
        nombre: doc.data().nombre,
        dni: doc.data().dni,
      }));
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  }

  async getById(id) {
    try {
      const doc = query.doc(`${id}`);
      const item = await doc.get();
      const response = item.data();
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  }

  async update(id, newprop) {
    try {
      const doc = query.doc(`${id}`);
      let item = await doc.update(`${newprop}`);
      console.log(item);
    } catch (error) {
      console.log(error);
    }
  }

  async deletebyId(id) {
    try {
      const doc = query.doc(`${id}`);
      let item = await doc.delete();
      console.log(item);
    } catch (error) {
      console.log(error);
    }
  }
}

export default ContenedorFirebase;
