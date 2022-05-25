export default {
  //   configuracion del cliente con file system  //
  fileSystem: {
    path: "./DB",
  },

  // configuracion del cliente mongodb
  mongodb: {
    cnxStr: "mongodb://localhost:27017/ecommerce",
    options: {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      serverSelectionTimeoutMS: 5000,
    },
  },

  // configuracion del cliente firebase-admin
  firebase: {
    type: "service_account",
    project_id: "coderhouse-5bd1b",
    private_key_id: "db54ff7aa3ef6c818cb6e62ab130b5893fcea98a",
    private_key:
      "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQC06RkNWuptLu3L\nMPhS1l0J11HYqKiWe4B2ikA68lJ8+KxqQrkHi2SUBlZhm8HbXHesrhG72YMbrf9B\nPZ1sfbogBjvl2UHP5FEeWm6iwhOmCIYxzXswosaQRhI6XnOcup5Pp6jchP6B1cc2\nDMBadnVlues281g7BRBOdiK9xszG3sWG5Y97PlfwdlqE9c3M8+ctD5nr+4TC3376\nz71hcrt9TpukTRkcp2iOpjFxQnAEa9a7a6TeXAi5w65Aq1/FNPAYb5oC5C4yD1ms\n0IGfNkXANOyw1viqvgzCPuOd0c1mCqhgkyoHWF98DbMLSjZefQTyaBdc91UENIb2\npUiVY8h/AgMBAAECggEAWIWGoKZP90TzTm2T1NTXia02e1FrzNZ5sYdMjotsGYKE\nuyoS58IpYNUJB5Hzdab1WCWEv+pa4Pxu3jmMAj4zCOCEBqAcN+F8X+HYKQPWIXQi\nVdQ55z5+8rGW0cDNyW73b/qWAfGBp343kBcFOD6mizRCCA1iqt57cCkWLs5L/TLJ\nk9lLhQJ+QeaUeNIPagU3cNJP8txnIxKsXG0l4rREjWPArs8Cz60SvlJ6XQQRxhut\nUlHcjgmH/D91bGsiJz7B+rPaNPSvCzNUBQSsnufoAiYqQxzQwTFEDEiQb81QBIpt\no5Z0KobaHj8bktMkaCcq2yUF+mCWu7/hUsN5Fg/kgQKBgQDhtCfjcwYqA0hO/noT\n2cWFTAaENCgmPpaoB2iiUDCuSAtYA2kxPGZnvZgzfyHtreD+smhofp/MWQThMATS\nwU/fXTh6WpnCc7YvVPme8SW/fJ65jC0JymWu+h7yd+soIdUy4G6qzJP2cMLNJhoI\ngOfuNW7GsV754nBGoJX5JXMEbwKBgQDNMbdSkl+vcKt0nmmF7ovFrsKi6aMSZQpa\nW9c7o65/xHGtTa1y0r9fDZ7ET/TFkdxW2o7R+hQg/3PXy5OwunGOmJ5B2aqqE3Xg\n7ajTg/lJWl5xZpRAkx38BmtkUwn+8vQ0R24qmf8pCxdYUxvgXzLHFLlxHj4z4nTL\nqrzMgNMk8QKBgDu4jLltTRs+xRpJ0YmBHPeZVzwSBPGhrAGH/FK+fzMOUxoVxPbH\nMZ2PmD9AC301fgxGrsO/hY7vmw/uwcf2aKkEpJYTdQ3zyigaBvbcfg197w3Pnncx\nu9ghzKCBxJJY6W3N3tqIyTnzOkhIJalMWpI4RziB5Eygcu7tPOGw3A83AoGBAMNw\nJ/DAs9xxDw1LWKyVMZG+y2nJ6GU70amQsib+1tSg8bkkNCEac+YAHglTMor/S4N6\nNe/vJj7rsJWINApu+nvcB1gnDvNhB7SOCHA10jk4lp2iG3CJ71Q9dQogQXQQSeKF\nanuvI6YfB0Q8HGAPrFiL97izGoHmnmHiJGMQDIuxAoGAUNagRF5ymlm6mqIyOBGC\nqwKaUNa7FKxU/hztdd/sYT/p+GFKX9X9k4eVFMJsm9+uz/98q91JDdkmw5RGHgOa\nSat0hiq9i3EfSQfeewBZ0t1F8/L147gViH8o8NRNVDokrryqKFjsSIL1HCrEzMpS\ninK7qUjTGKhzxAg+RvUZUvU=\n-----END PRIVATE KEY-----\n",
    client_email:
      "firebase-adminsdk-l1qlb@coderhouse-5bd1b.iam.gserviceaccount.com",
    client_id: "105489628394338298852",
    auth_uri: "https://accounts.google.com/o/oauth2/auth",
    token_uri: "https://oauth2.googleapis.com/token",
    auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
    client_x509_cert_url:
      "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-l1qlb%40coderhouse-5bd1b.iam.gserviceaccount.com",
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
