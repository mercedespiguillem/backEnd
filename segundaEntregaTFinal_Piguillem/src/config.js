export default {
  //   configuracion del cliente con file system  //
  fileSystem: {},

  // configuracion del cliente mongodb
  mongodb: {
    
  },

  // configuracion del cliente firebase-admin
  firebase: {

  },


  // configuracion del cliente sqlite3, luego los llamo haciendo config.sqlite3
  sqlite3: {
    client: "sqlite3",
    connection: {
      filename: `./DB/ecommerce.sqlite`,
    },
    useNullAsDefault: true,
  },

  // configuracion del cliente mysqlMariaDB
  mariaDb: {
    client: "mysql",
    connection: {
      host: "127.0.0.1",
      user: "root",
      password: "",
      database: "coderhouse",
      port: "3306",
    },
    pool: { min: 0, max: 700 },
  },
};
