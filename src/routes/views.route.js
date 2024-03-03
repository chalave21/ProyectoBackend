import { Router } from "express";
import ProductManager from "../ProductsManager.js";
const productManager = new ProductManager("products.json");
const router = Router();

router.get("/", async (req, res) => {
  const Newproduct = new ProductManager("products.json");
  const getProduct = await Newproduct.getProducts();

  res.render("home", { getProduct });
});

router.get("/realTimeProducts", async (req, res) => {
  try {
    const Newproduct = new ProductManager("products.json");
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
