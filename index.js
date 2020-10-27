const express = require("express");
const methodOverride = require("method-override");
const cookieParser = require("cookie-parser");

// initialize express app
const app = express();

app.use(cookieParser());
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use(express.static("public"));

app.use(methodOverride("_method"));

// set react-views to be the default view engine
const reactEngine = require("express-react-views").createEngine();
app.set("views", __dirname + "/views");
app.set("view engine", "jsx");
app.engine("jsx", reactEngine);

const allModels = require("./db");

const setRoutesFunction = require("./routes");
setRoutesFunction(app, allModels);

const PORT = process.env.PORT || 3000;

const server = app.listen(PORT, () => console.log('~~~ Tuning in to the waves of port ' + PORT + ' ~~~'));

let onClose = () => {
  console.log("closing");

  server.close(() => {
    console.log("Process terminated");

    allModels.pool.end(() => console.log("DB connection pool shut down"));
  });
};

process.on("SIGTERM", onClose);
process.on("SIGINT", onClose);