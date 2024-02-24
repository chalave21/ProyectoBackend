import express from "express";
import ProductsManager from "../ProductsManager.js";
const router = express.Router();

const producto1 = new ProductsManager("./products.json");

router.get("/api/products", async (req, res) => {
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

router.get("/api/products/:pId", async (req, res) => {
  try {
    let { pId } = req.params;
    pId = parseInt(pId);
    res.json(await producto1.getProductById(pId));
  } catch (error) {
    res.status(500).json({ error: "Error interno del servidor" });
  }
});

router.post("/api/products", async (req, res) => {
  try {
    let product = req.body;
    await producto1.addProduct(product);
    res.send("Producto agregado con excito");
  } catch (error) {
    res.status(500).json({ error: "Error interno del servidor" });
  }
});

router.put("/api/products/:pId", async (req, res) => {
  try {
    let pId = req.params.pId;
    pId = parseInt(pId);
    let product = req.body;

    await producto1.updateProduct(pId, product);
    res.send("Producto actualizado con excito");
  } catch (error) {
    res.status(500).json({ error: "Error interno del servidor" });
  }
});

router.delete("/api/products/:pId", async (req, res) => {
  try {
    let pId = req.params.pId;
    pId = parseInt(pId);
    const product = await producto1.getProductById(pId);
    if (product.id) {
      await producto1.deleteProduct(pId);
      res.status(200).json({ message: "Producto eliminado con excito" });
    } else {
      res.status(400).json({ message: "No se encontro el id espicificado." });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
});
export default router;
