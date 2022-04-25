const socket = io.connect();

//------------------MOSTRAR Y ACTUALIZAR PRODUCTOS---------------------------------------

socket.on("productos", async (productos) => {
  const promesaHtml = await makeHtmlTable(productos);
  const html = promesaHtml;
  document.getElementById("productos").innerHTML = html;
});

function makeHtmlTable(productos) {
  return fetch("plantillas/tabla-productos.hbs")
    .then((respuesta) => respuesta.text())
    .then((plantilla) => {
      const template = Handlebars.compile(plantilla);
      const html = template({
        productos: productos,
        hayProductos: productos.length,
      });
      return html;
    });
}

// ACTUALIZAR PRODUCTO

function addProduct(e) {
  const product = {
    title: document.getElementById("nombre").value,
    price: document.getElementById("precio").value,
    thumbnail: document.getElementById("foto").value,
  };
  socket.emit("new-product", product);
  document.getElementById("formAgregarProducto").reset();
  return false;
}

//-------------------------------------------------------------------------------------

// CHAT WEBSOCKETS

function render(messagesArray) {
  let today = new Date();
  const html = messagesArray
    .map((message, index) => {
      return `<div><strong class="email">${message.author}</strong><em class="date">${today}</em>: <em class="message">${message.text}</em></div>`;
    })
    .join(" ");
  document.getElementById("mensajes").innerHTML = html;
}

function addMessage(e) {
  let today = new Date();
  const msn = {
    author: document.getElementById("inputUsername").value,
    text: document.getElementById("inputMessage").value,
    date: today,
  };

  socket.emit("new-message", msn);
  document.getElementById("mensajes").reset();

  return false;
}

socket.on("messages", (messagesArray) => {
  render(messagesArray);
});
