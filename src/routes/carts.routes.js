import express from "express";
import CartsManager from "../controller/CartsManager.js";

const router = express.Router();
const cartsManager = new CartsManager(
  "./src/model/products.json",
  "./src/model/carts.json"
);

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

//// SEGUNDA ENTREGA
router.delete("/api/carts/:cid/product/:pid", async (req, res) => {
  try {
    const cartId = req.params.cid;
    const productId = req.params.pid;

    //Verificamos:
    console.log(cartId);
    console.log(productId);

    const updatedCart = await cartsManager.eliminarProductoDelCarrito(
      cartId,
      productId
    );

    res.json({
      status: "success",
      message: "Producto eliminado del carrito correctamente",
      updatedCart,
    });
  } catch (error) {
    console.error("Error al eliminar el producto del carrito", error);
    res.status(500).json({
      status: "error",
      error: "Error interno del servidor",
    });
  }
});

//5) Actualizamos productos del carrito:

router.put("/api/carts/:cid", async (req, res) => {
  const cartId = req.params.cid;
  const updatedProducts = req.body;
  // Debes enviar un arreglo de productos en el cuerpo de la solicitud

  try {
    const updatedCart = await cartsManager.actualizarCarrito(
      cartId,
      updatedProducts
    );
    res.json(updatedCart);
  } catch (error) {
    console.error("Error al actualizar el carrito", error);
    res.status(500).json({
      status: "error",
      error: "Error interno del servidor",
    });
  }
});

//6) Actualizamos las cantidades de productos

router.put("/api/carts/:cid/product/:pid", async (req, res) => {
  try {
    const cartId = req.params.cid;
    const productId = req.params.pid;
    const newQuantity = req.body.quantity;

    const updatedCart = await cartsManager.actualizarCantidadDeProducto(
      cartId,
      productId,
      newQuantity
    );

    res.json({
      status: "success",
      message: "Cantidad del producto actualizada correctamente",
      updatedCart,
    });
  } catch (error) {
    console.error(
      "Error al actualizar la cantidad del producto en el carrito",
      error
    );
    res.status(500).json({
      status: "error",
      error: "Error interno del servidor",
    });
  }
});

//7) Vaciamos el carrito:

router.delete("/api/carts/:cid", async (req, res) => {
  try {
    const cartId = req.params.cid;

    // Llamamos a la función para eliminar todos los productos del carrito
    const updatedCart = await cartsManager.vaciarCarrito(cartId);

    res.json({
      status: "success",
      message:
        "Todos los productos del carrito fueron eliminados correctamente",
      updatedCart,
    });
  } catch (error) {
    console.error("Error al vaciar el carrito", error);
    res.status(500).json({
      status: "error",
      error: "Error interno del servidor",
    });
  }
});

export default router;
