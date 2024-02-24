import express, { json } from "express";
import productsRouter from "./routes/products.route.js";
import cartsRouter from "./routes/carts.routes.js";

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const PUERTO = 8080;

app.listen(PUERTO, (req, res) => {
  console.log(`Escuchando puerto: ${PUERTO}`);
});

app.use("/", productsRouter);
app.use("/", cartsRouter);
