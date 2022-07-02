const express = require("express");
const exphbs = require("express-handlebars");
const bCrypt = require("bcrypt");

require("dotenv").config();

// ------------VARIABLES DE AMBIENTE

const tiempoExpiracion = process.env.TIEMPO_EXPIRACION;
const mongoLocalURL = process.env.URL_BASE_DE_DATOS;

const mongoAtl = process.env.MI_MONGO_ATLAS;

// const port = process.env.PORT;

// MINIMIST

const parseArgs = require("minimist");

const args = parseArgs(process.argv.slice(2));

// si le paso un --port por linea de comandos, toma ese. sino toma el port de options

const options = { default: { port: "8080" } };
const port = args.port || options.default.port;
console.log(parseArgs(["-a", 1], options));

console.log({
  tiempoExpiracion,
  mongoLocalURL,
  mongoAtl,
});





// -----------------------------------------------------------

const session = require("express-session");
const passport = require("passport");
const LocalStrategy = require("passport-local");

const routes = require("./routes");
const config = require("./config");
const controllersdb = require("./controllersdb");
const User = require("./models");

passport.use(
  "login",
  new LocalStrategy((username, password, done) => {
    User.findOne({ username }, (err, user) => {
      if (err) return done(err);
      if (!user) {
        console.log("User not found " + username);
        return done(null, false);
      }
      if (!isValidPassword(user, password)) {
        return done(null, false);
      }

      return done(null, user);
    });
  })
);

passport.use(
  "signup",
  new LocalStrategy(
    {
      passReqToCallback: true,
    },
    (req, username, password, done) => {
      User.findOne({ username: username }, (err, user) => {
        if (err) {
          return done(err);
        }
        if (user) {
          return done(null, false);
        }

        const newUser = {
          username: username,
          password: createHash(password),
          email: req.body.email,
          firstName: req.body.firstName,
          lastName: req.body.lastName,
        };

        User.create(newUser, (err, userWithId) => {
          if (err) {
            return done(err);
          }
          return done(null, userWithId);
        });
      });
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user._id);
});

passport.deserializeUser((id, done) => {
  User.findById(id, done);
});

function isValidPassword(user, password) {
  return bCrypt.compareSync(password, user.password);
}

function createHash(password) {
  return bCrypt.hashSync(password, bCrypt.genSaltSync(10), null);
}

const app = express();

app.engine(".hbs", exphbs({ extname: ".hbs", defaultLayout: "main.hbs" }));
app.set("view engine", ".hbs");

app.use(express.static(__dirname + "/views"));
app.use(express.urlencoded({ extended: true }));

app.use(
  session({
    secret: "secret",
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: false,
      secure: false,
      maxAge: 6000,
    },
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.get("/", routes.getRoot);

app.get("/info", routes.getInfo);

//LOGIN
app.get("/login", routes.getLogin);
app.post(
  "/login",
  passport.authenticate("login", { failureRedirect: "/faillogin" }),
  routes.postLogin
);
app.get("/faillogin", routes.getFailLogin);

//REGISTER
app.get("/signup", routes.getSignup);
app.post(
  "/signup",
  passport.authenticate("signup", { failureRedirect: "/failsignup" }),
  routes.postSignup
);
app.get("/failsignup", routes.getFailsignup);

function checkAuthentication(req, res, next) {
  if (req.isAuthenticated()) {
    next();
  } else {
    res.redirect("/login");
  }
}

app.get("/ruta-protegida", checkAuthentication, (req, res) => {
  const { user } = req;
  res.send("<h1>Ruta OK!!!</h1>");
});

app.get("/logout", routes.getLogout);

controllersdb.conectarDB(mongoAtl, (err) => {
  if (err) return console.log("Base de datos no conectada");
  console.log("Base de datos conectada");

  app.listen(port, (err) => {
    if (err) return console.log("Error escuchando al servidor");
    console.log("Server running");
  });
});
