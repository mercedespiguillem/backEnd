const socket = io.connect();

//------------------------------------------------------------------------------------

function addProduct() {
  const formAgregarProducto = document.getElementById("formAgregarProducto");
  formAgregarProducto.addEventListener("submit", (e) => {
    const producto = {
      title: document.getElementById("nombre").value,
      price: document.getElementById("precio").value,
      thumbnail: document.getElementById("foto").value,
    };
    socket.emit("new-producto", producto);
    return false;
  });
}

// socket.on("productos", (producto) => {
//   addProduct(producto);
// });

socket.on('productos', async productos => {
    const promiseHtml =  await makeHtmlTable(productos)
    const html = promiseHtml
    document.getElementById('productos').innerHTML = html;
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

//-------------------------------------------------------------------------------------

// const inputUsername = document.getElementById("inputUsername");
// const inputMensaje = document.getElementById("inputMensaje");
// const btnEnviar = document.getElementById("btnEnviar");

// const formPublicarMensaje = document.getElementById("formPublicarMensaje");
// formPublicarMensaje.addEventListener("submit", (e) => {
//     socket.emit("new-message", inputMensaje);
//     return false;
// });

// socket.on("messages", (messages) => {});

// function makeHtmlList(messages) {
//         let today = new Date();
//         const html = messages
//           .map((message, index) => {
//             return `<div><strong class="email">${message.author}</strong><em class="date">${today}</em>: <em class="message">${message.text}</em></div>`;
//           })
//           .join(" ");
//         document.getElementById("messages").innerHTML = html;
//         //   document.querySelector("strong").className = "email";
//         //   document.querySelector("em").className = "message";
// }

// MENSAJES CHAT

function render(messages) {
  let today = new Date();
  const html = messages
    .map((message, index) => {
      return `<div><strong class="email">${message.author}</strong><em class="date">${today}</em>: <em class="message">${message.text}</em></div>`;
    })
    .join(" ");
  document.getElementById("messages").innerHTML = html;
}

function addMessage(e) {
  const message = {
    author: document.getElementById("username").value,
    text: document.getElementById("text").value,
  };
  socket.emit("new-message", message);
  return false;
}

socket.on("messages", (data) => {
  render(data);
});
