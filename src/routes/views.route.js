import { Router } from "express";
import ProductManager from "../controller/ProductsManager.js";
const router = Router();

router.get("/", async (req, res) => {
  const Newproduct = new ProductManager("./src/model/products.json");
  const getProduct = await Newproduct.getProducts();
  res.render("home", { getProduct });
});

router.get("/prueba", async (req, res) => {
  const Newproduct = new ProductManager("./src/model/products.json");
  const productos = await Newproduct.getProducts();
  res.render("prueba", { productos });
});

router.get("/realTimeProducts", async (req, res) => {
  try {
    const Newproduct = new ProductManager("/src/model/products.json");
    const getProduct = await Newproduct.getProducts();
    res.render("realTimeProducts", {
      title: "Productos en tiempo real",
      getProduct,
    });
  } catch (error) {
    res.status(500).json({ error: error });
  }
});
export default router;
