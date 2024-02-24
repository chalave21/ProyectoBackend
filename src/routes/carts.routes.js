import express from "express";
import CartsManager from "../CartsManager.js";

const router = express.Router();
const cartsManager = new CartsManager("./products.json", "./carts.json");

router.post("/api/carts", async (req, res) => {
  try {
    const newCart = await cartsManager.createCart();
    res.json(newCart);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/api/carts/:cid", async (req, res) => {
  try {
    const cartId = parseInt(req.params.cid);
    const cart = await cartsManager.getCartById(cartId);
    res.json(cart);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.post("/api/carts/:cid/product/:pid", async (req, res) => {
  try {
    const cartId = parseInt(req.params.cid);
    const productId = parseInt(req.params.pid);
    const quantity = parseInt(req.body.quantity);

    if (!quantity || isNaN(quantity)) {
      return res.status(400).json({ error: "Invalid quantity" });
    }

    const updatedCart = await cartsManager.addProductToCart(
      cartId,
      productId,
      quantity
    );
    res.json(updatedCart);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

export default router;
