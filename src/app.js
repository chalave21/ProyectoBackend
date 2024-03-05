import express, { json } from "express";
import productsRouter from "./routes/products.route.js";
import cartsRouter from "./routes/carts.routes.js";
import exphbs from "express-handlebars";
import viewsRouter from "./routes/views.route.js";
import ProductsManager from "./controller/ProductsManager.js";
import { Server } from "socket.io";

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("./src/public"));

//rutas
app.use("/", productsRouter);
app.use("/", cartsRouter);
app.use("/", viewsRouter);

const PUERTO = 8080;
//referencia del servidor
const httpServer = app.listen(PUERTO, (req, res) => {
  console.log(`Escuchando puerto: ${PUERTO}`);
});
//handlebars
app.engine("handlebars", exphbs.engine());
app.set("view engine", "handlebars");
app.set("views", "./src/views");
//----------

//productos
const productsManager = new ProductsManager("./src/model/products.json");
const product = await productsManager.getProducts();

//Socket
const io = new Server(httpServer);

io.on("connection", (socket) => {
  console.log("Un cliente conectado");
  socket.on("1", (msj) => {
    console.log(msj);
  });
  socket.emit("2", product);

  socket.on("deleteProduct", async (id) => {
    console.log("Eliminando producto con ID:", id);
    await productsManager.deleteProduct(id);
    const updatedProducts = await productsManager.getProducts();
    console.log("Productos actualizados:", updatedProducts);
    socket.emit("products", updatedProducts);
  });

  //escucho evento eliminar desde el cliente
  socket.on("deleteProduct", async (id) => {
    await productsManager.deleteProduct(id);
    const products = await productsManager.getProducts();
    socket.emit("products", products);
  });

  //agregar producto
  socket.on("addProduct", async (product) => {
    try {
      await productsManager.addProduct(product);
      const products = await productsManager.getProducts();
      socket.emit("products", products);
    } catch (error) {
      console.log("Error al cargar producto");
    }
  });
});

//----------
