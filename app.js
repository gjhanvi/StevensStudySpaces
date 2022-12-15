// Setup server, session and middleware here.

// We first require our express package
const express = require("express");
const session = require('express-session')
const configRoutes = require("./routes");
const static = express.static(__dirname + "/public");
// We create our express isntance:
const app = express();
const exphbs = require("express-handlebars");
app.engine("handlebars", exphbs.engine({ defaultLayout: "main" }));
app.set("view engine", "handlebars");
const bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }))
app.use("/public", static);

// Middlewares:

app.use(session({
  name: 'AuthCookie',
  secret: 'some secret string!',
  resave: false,
  saveUninitialized: true
}))

configRoutes(app);

// We can now navigate to localhost:3000
app.listen(3000, function () {
  console.log(
    "Your server is now listening on port 3000! Navigate to http://localhost:3000 to access it"
  );
});
