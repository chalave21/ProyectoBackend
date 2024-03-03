import express, { json } from "express";
import productsRouter from "./routes/products.route.js";
import cartsRouter from "./routes/carts.routes.js";
import exphbs from "express-handlebars";
import viewsRouter from "./routes/views.route.js";
import ProductsManager from "./ProductsManager.js";
import { Server } from "socket.io";

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("./public"));
app.use("/", productsRouter);
app.use("/", cartsRouter);
app.use("/", viewsRouter);

const PUERTO = 8080;
const httpServer = app.listen(PUERTO, (req, res) => {
  console.log(`Escuchando puerto: ${PUERTO}`);
});
//handlebars
app.engine("handlebars", exphbs.engine());
app.set("view engine", "handlebars");
app.set("views", "./src/views");
//----------

const productsManager = new ProductsManager("./products.json");
//Socket
const io = new Server(httpServer);

io.on("connection", async (socket) => {
  console.log("Un cliente conectado");

  socket.on("deleteProduct", async (id) => {
    console.log("Eliminando producto con ID:", id);
    await productsManager.deleteProduct(id);
    const updatedProducts = await productsManager.getProducts();
    console.log("Productos actualizados:", updatedProducts);
    socket.emit("products", updatedProducts);
  });

  socket.on("addProduct", async (product) => {
    console.log("Agregando nuevo producto:", product);
    await productsManager.addProduct(product);
    const updatedProducts = await productsManager.getProducts();
    console.log("Productos actualizados:", updatedProducts);
    socket.emit("products", updatedProducts);
  });
});

//----------
