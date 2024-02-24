import fs from "fs";

export default class CartsManager {
  constructor(productsPath, cartsPath) {
    this.productsPath = productsPath;
    this.cartsPath = cartsPath;
  }

  async #generateId() {
    try {
      const carts = await this.getCarts();
      let id;
      if (carts.length > 0) {
        id = Math.max(...carts.map((cart) => cart.id)) + 1;
      } else {
        id = 1;
      }
      return id;
    } catch (error) {
      console.log(error);
    }
  }

  async createCart() {
    try {
      const carts = await this.getCarts();
      const newCart = {
        id: await this.#generateId(),
        products: [],
      };
      carts.push(newCart);
      await fs.promises.writeFile(
        this.cartsPath,
        JSON.stringify(carts, null, 2)
      );
      return newCart;
    } catch (error) {
      console.log(error);
    }
  }

  async getCartById(cartId) {
    try {
      const carts = await this.getCarts();
      const cart = carts.find((c) => c.id === cartId);
      return cart ? cart : "Not found";
    } catch (error) {
      console.log(error);
    }
  }

  async addProductToCart(cartId, productId, quantity) {
    try {
      const carts = await this.getCarts();
      const products = await this.getProducts();
      const cartIndex = carts.findIndex((c) => c.id === cartId);
      const productIndex = products.findIndex((p) => p.id === productId);

      if (cartIndex !== -1 && productIndex !== -1) {
        const existingProduct = carts[cartIndex].products.find(
          (p) => p.product === productId
        );

        if (existingProduct) {
          existingProduct.quantity += quantity;
        } else {
          carts[cartIndex].products.push({
            product: productId,
            quantity: quantity,
          });
        }

        await fs.promises.writeFile(
          this.cartsPath,
          JSON.stringify(carts, null, 2)
        );
        return carts[cartIndex];
      } else {
        console.log("Cart or product not found");
      }
    } catch (error) {
      console.log(error);
    }
  }

  async getCarts() {
    try {
      if (fs.existsSync(this.cartsPath)) {
        const carts = await fs.promises.readFile(this.cartsPath, "utf-8");
        return JSON.parse(carts);
      } else {
        return [];
      }
    } catch (error) {
      console.log(error);
    }
  }

  async getProducts() {
    try {
      if (fs.existsSync(this.productsPath)) {
        const products = await fs.promises.readFile(this.productsPath, "utf-8");
        return JSON.parse(products);
      } else {
        return [];
      }
    } catch (error) {
      console.log(error);
    }
  }
}
