var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var livereload = require("livereload");
var connectLiveReload = require("connect-livereload");
var cors = require("cors");

global.__basedir = __dirname + "/..";
var indexRouter = require("./routes/index");
const liveReloadServer = livereload.createServer();
liveReloadServer.server.once("connection", () => {
  setTimeout(() => {
    liveReloadServer.refresh("/");
  }, 100);
});

var app = express();
const bodyParser = require("body-parser");

app.use(connectLiveReload());
// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(cors());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

let routes = require("./config/api"); //importing route
let db = require("./config/db"); //importing route
const Role = db.role;
db.sequelize.sync().then(() => {
  initial();
});

routes(app);

app.use(function (req, res, next) {
  res.header(
    "Access-Control-Allow-Headers",
    "x-access-token, Origin, Content-Type, Accept"
  );
  next();
});
app.use("/", indexRouter);
// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};
  // render the error page
  res.status(err.status || 500);
  console.log(err, "Error");
  res.render("error");
});

module.exports = app;

function initial() {
  Role.create({
    id: 1,
    name: "admin",
  });

  Role.create({
    id: 2,
    name: "user",
  });
}
