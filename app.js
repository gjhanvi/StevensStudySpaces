// Setup server, session and middleware here.

// We first require our express package
const express = require("express");
const session = require('express-session')
const configRoutes = require("./routes");
const fileUpload = require('express-fileupload');
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
app.use(fileUpload());
app.use(express.static(__dirname));

// Middlewares:

app.use(session({
  name: 'AuthCookie',
  secret: 'some secret string!',
  resave: false,
  saveUninitialized: true
}))


const postdata = require("./data/posts.js");

app.post('/upload', function(req, res) {
   let uploadFile = req.files.file;
   let id = req.body.id;
   //console.log(id)
   //need a function that checks that userid is the same post id
   let temp = postdata.linkPhoto(id,'/images/' + id + ".jpg")
   uploadFile.mv(__dirname + '/images/' + id + ".jpg", function(err) {
    if (err)
    res.status(500).redirect("/home")
   });
   res.redirect("/posts/" + id)
 })

 configRoutes(app);

// We can now navigate to localhost:3000
app.listen(3000, function () {
  console.log(
    "Your server is now listening on port 3000! Navigate to http://localhost:3000 to access it"
  );
});
