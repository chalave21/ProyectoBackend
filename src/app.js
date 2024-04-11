import express, { json } from "express";
import productsRouter from "./routes/products.route.js";
import cartsRouter from "./routes/carts.routes.js";
import exphbs from "express-handlebars";
import viewsRouter from "./routes/views.route.js";
import "../database.js";

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("./src/public"));

//handlebars
app.engine("handlebars", exphbs.engine());
app.set("view engine", "handlebars");
app.set("views", "./src/views");
//----------

//rutas
app.use("/", productsRouter);
app.use("/", cartsRouter);
app.use("/", viewsRouter);

const PUERTO = 8080;

app.listen(PUERTO, () => {
  console.log(`Servidor escuchando en el puerto ${PUERTO}`);
});
