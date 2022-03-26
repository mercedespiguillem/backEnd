const Contenedor = require("./contenedor.js");

const newProduct1 = {
  title: "Musculosa",
  price: 700,
  thumbnail:
    "https://www.google.com/search?q=remera&rlz=1C1PDZP_esAR950AR952&sxsrf=APq-WBvGJ0yfEGv02qvGoxdiEgrAwpMPIQ:1648269028651&source=lnms&tbm=isch&sa=X&ved=2ahUKEwictcnP-OL2AhUAGbkGHZRqDn4Q_AUoAXoECAEQAw&biw=1366&bih=625&dpr=1#imgrc=ffXK8uDRHLRKYM",
};

const newProduct2 = {
  title: "Zapas",
  price: 1000,
  thumbnail:
    "https://www.google.com/search?q=zapatillas&tbm=isch&ved=2ahUKEwj9rr_e-OL2AhVJqJUCHXnwBbQQ2-cCegQIABAA&oq=zapa&gs_lcp=CgNpbWcQARgAMgcIABCxAxBDMgQIABBDMgQIABBDMgcIABCxAxBDMgcIABCxAxBDMgcIABCxAxBDMgQIABBDMgQIABBDMgcIABCxAxBDMgcIABCxAxBDOgcIIxDvAxAnOgsIABCABBCxAxCDAToICAAQgAQQsQM6CAgAELEDEIMBOgUIABCABDoKCCMQ7wMQ6gIQJ1DhBliCEGDEGmgBcAB4AIABW4gB_QOSAQE2mAEAoAEBqgELZ3dzLXdpei1pbWewAQrAAQE&sclient=img&ei=A5c-Yr2hOcnQ1sQP-eCXoAs&bih=625&biw=1366&rlz=1C1PDZP_esAR950AR952#imgrc=znrGW4H-knEarM",
};

const contenedorTest = new Contenedor("./products.txt");

// contenedorTest.save(newProduct1)
//contenedorTest.save(newProduct2)
// contenedorTest.getById(3)
// contenedorTest.deleteById(5);
contenedorTest.deleteAll();
