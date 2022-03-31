const Contenedor = require("./contenedor.js");

const newProduct1 = {
  title: "Musculosa",
  price: 700,
  thumbnail:
    "https://cdn3.iconfinder.com/data/icons/education-209/64/globe-earth-geograhy-planet-school-256.png",
};

const newProduct2 = {
  title: "Zapas",
  price: 1000,
  thumbnail:
    "https://www.google.com/search?q=zapatillas&tbm=isch&ved=2ahUKEwj9rr_e-OL2AhVJqJUCHXnwBbQQ2-cCegQIABAA&oq=zapa&gs_lcp=CgNpbWcQARgAMgcIABCxAxBDMgQIABBDMgQIABBDMgcIABCxAxBDMgcIABCxAxBDMgcIABCxAxBDMgQIABBDMgQIABBDMgcIABCxAxBDMgcIABCxAxBDOgcIIxDvAxAnOgsIABCABBCxAxCDAToICAAQgAQQsQM6CAgAELEDEIMBOgUIABCABDoKCCMQ7wMQ6gIQJ1DhBliCEGDEGmgBcAB4AIABW4gB_QOSAQE2mAEAoAEBqgELZ3dzLXdpei1pbWewAQrAAQE&sclient=img&ei=A5c-Yr2hOcnQ1sQP-eCXoAs&bih=625&biw=1366&rlz=1C1PDZP_esAR950AR952#imgrc=znrGW4H-knEarM",
};

const contenedorTest = new Contenedor("./products.txt");

// contenedorTest.save(newProduct1);
// contenedorTest.save(newProduct2)
// contenedorTest.getById(5)
// contenedorTest.deleteById(2);
// contenedorTest.deleteAll();
// contenedorTest.getAll();

