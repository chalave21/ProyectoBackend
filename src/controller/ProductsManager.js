import { error } from "console";
import fs from "fs";

export default class ProductManager {
  static idProduct = 1;
  constructor(path) {
    this.path = path;
    this.products = [];
  }

  async #ultimoId() {
    try {
      const products = await this.getProducts();
      let id;
      if (products.length > 0) {
        id = products[products.length - 1].id + 1;
      } else {
        id = 1;
      }
      return id;
    } catch (error) {
      console.log(error);
    }
  }

  async addProduct(obj) {
    try {
      const products = await this.getProducts();

      if (products.some((p) => p.code === obj.code)) {
        return console.log("No se puede repetir el mismo codigo");
      }
      if (
        !obj.title ||
        !obj.description ||
        !obj.price ||
        !obj.code ||
        !obj.stock ||
        !obj.status ||
        !obj.category
      ) {
        return console.log("Todos los campos son obligatorios.");
      }

      let newProduct = {
        id: await this.#ultimoId(),
        title: obj.title,
        description: obj.description,
        price: obj.price,
        thumbnail: obj.thumbnail,
        code: obj.code,
        category: obj.category,
        stock: obj.stock,
        status: obj.status,
      };
      products.push(newProduct);
      await fs.promises.writeFile(this.path, JSON.stringify(products, null, 2));
    } catch (error) {
      return console.log(error);
    }
  }

  async getProducts() {
    try {
      if (fs.existsSync(this.path)) {
        const products = await fs.promises.readFile(this.path, "utf-8");
        return JSON.parse(products);
      } else {
        return [];
      }
    } catch (error) {
      console.log(error);
    }
  }

  async getProductById(productId) {
    try {
      const products = await this.getProducts();
      const product = products.find((p) => p.id === productId);
      return product ? product : "Not found";
    } catch (error) {
      return console.log(error);
    }
  }

  async updateProduct(id, obj) {
    try {
      let arrayObjetos = await this.getProducts();

      let objetoActualizacion = { id: id, ...obj };

      let index = arrayObjetos.findIndex((objeto) => objeto.id === id);

      if (index !== -1) {
        arrayObjetos[index] = {
          ...arrayObjetos[index],
          ...objetoActualizacion,
        };
        await fs.promises.writeFile(
          this.path,
          JSON.stringify(arrayObjetos, null, 2)
        );
      } else {
        console.log("No se encontro el producto con el id espicificado.");
      }
    } catch (error) {
      console.log(error);
    }
  }

  async deleteProduct(id) {
    try {
      const productById = await this.getProductById(id);
      if (productById.id === id) {
        let products = await this.getProducts();
        let arrayActualizado = products.filter((objeto) => objeto.id !== id);
        await fs.promises.writeFile(
          this.path,
          JSON.stringify(arrayActualizado, null, 2)
        );
      } else {
        console.log("No se encontro el id especificado");
      }
    } catch (error) {
      console.log(error);
    }
  }
}

const producto1 = new ProductManager("./products.json");
//  producto1
//   .getProducts()
//    .then((res) => console.log(res))
//    .catch((error) => console.log(error));

// producto1.addProduct(
//   "producto prueba",
//   200,
//   "Este es un producto prueba",
//   "Sin imagen",
//   "abc1234",
//   25
// );

// producto1
//   .getProducts()
//   .then((res) => console.log(res))
//   .catch((error) => console.log(error));

// producto1
//   .getProductById(1)
//   .then((res) => console.log(res))
//   .catch((error) => console.log(error));

// producto1.updateProduct(1, {
//   title: "Actualizacion 1",
//   description: 200,
//   price: "Este es un producto prueba",
//   thumbnail: "Sin imagen",
//   code: "abc1234",
//   stock: 25,
// });
//producto1.deleteProduct(1);
