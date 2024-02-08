class ProductManager {
  static idProduct = 1;
  constructor() {
    this.products = [];
  }

  addProduct(title, description, price, thumbnail, code, stock) {
    if (this.products.some((p) => p.code === code)) {
      return console.log("No se puede repetir el mismo codigo");
    }
    if (!title || !description || !price || !thumbnail || !code || !stock) {
      return console.log("Todos los campos son obligatorios.");
    }
    let newProduct = {
      id: ProductManager.idProduct++,
      title: title,
      description: description,
      price: price,
      thumbnail: thumbnail,
      code: code,
      stock: stock,
    };
    this.products.push(newProduct);
  }

  getProducts() {
    return this.products;
  }

  getProductById(productId) {
    const product = this.products.find((p) => p.id === productId);
    if (product) {
      return product;
    } else {
      return "Not found";
    }
  }
}

const producto1 = new ProductManager();
//console.log(producto1.getProducts());
producto1.addProduct(
  "producto prueba",
  200,
  "Este es un producto prueba",
  "Sin imagen",
  "abc123",
  25
);
//console.log(producto1.getProducts());
producto1.addProduct(
  "producto prueba",
  200,
  "Este es un producto prueba",
  "Sin imagen",
  "abc123",
  25
);
//console.log(producto1.getProductById(1));
console.log(producto1.getProductById(3));
