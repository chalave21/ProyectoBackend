import express from "express";
import ProductsManager from "../controller/ProductsManager.js";
const router = express.Router();

const productManager = new ProductsManager();

// Ruta GET /api/products
router.get("/api/products", async (req, res) => {
  try {
    const { limit = 10, page = 1, sort, query } = req.query;

    // Llamar a la función getProducts() con los parámetros de consulta
    const productos = await productManager.getProducts({
      limit: parseInt(limit),
      page: parseInt(page),
      sort,
      query,
    });

    // Devolver los productos como respuesta
    res.json({
      status: "success",
      payload: productos.docs,
      totalPages: productos.totalPages,
      prevPage: productos.prevPage,
      nextPage: productos.nextPage,
      page: productos.page,
      hasPrevPage: productos.hasPrevPage,
      hasNextPage: productos.hasNextPage,
      prevLink: productos.prevLink,
      nextLink: productos.nextLink,
    });
  } catch (error) {
    console.error("Error al obtener productos", error);
    res.status(500).json({
      status: "error",
      error: "Error interno del servidor",
    });
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
