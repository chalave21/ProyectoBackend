import express, { json } from "express";
import ProductsManager from "./ProductsManager.js";

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const PUERTO = 8080;

app.listen(PUERTO, (req, res) => {
  console.log(`Escuchando puerto: ${PUERTO}`);
});

const producto1 = new ProductsManager("./products.json");

app.get("/products", async (req, res) => {
  try {
    let limit = parseInt(req.query.limit);
    if (limit) {
      let products = await producto1.getProducts();
      let productsLimit = products.slice(0, limit);
      res.json(productsLimit);
    } else {
      res.json(await producto1.getProducts());
    }
  } catch (error) {
    res.status(500).json({ error: "Error interno del servidor" });
  }
});

app.get("/products/:pId", async (req, res) => {
  try {
    let { pId } = req.params;
    pId = parseInt(pId);
    res.json(await producto1.getProductById(pId));
  } catch (error) {
    res.status(500).json({ error: "Error interno del servidor" });
  }
});
