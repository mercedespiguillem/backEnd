// CLUSTER
const express = require("express");
const cluster = require("cluster");

const numCpu = require("os").cpus().length;

const app = express();

// if (cluster.isMaster) {
//   console.log(numCpu);
//   console.log(`PID MASTER ${process.pid}`);

//   for (let i = 0; i < numCpu; i++) {
//     cluster.fork();
//   }

//   cluster.on("exit", (worker) => {
//     console.log(`Worker ${worker.process.pid} died`);
//     // cluster.fork();
//   });
// } else {
//   const PORT = parseInt(process.argv[2]) || 8080;

//   app.get("/info", (req, res) => {
//     res.send(
//       `Servidor en puerto ${PORT} - <b>PID ${
//         process.pid
//       }</b> - ${new Date().toLocaleString()} - Procesadores ${numCpu}`
//     );
//   });

// 

const PORT = parseInt(process.argv[2]) || 8080;

app.get('/datos', (req, res) => {
    res.send(`Servidor en puerto ${PORT} - PID ${process.pid} - ${new Date().toLocaleString()}`);
})

  app.listen(PORT, (err) => {
    if (!err)
      console.log(`Servidor escuchando en puerto ${PORT} - PID ${process.pid}`);
  });
