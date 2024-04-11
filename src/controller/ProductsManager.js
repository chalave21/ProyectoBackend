import ProductsModel from "../model/products.model.js";
class ProductsManager {
  async addProduct({
    title,
    description,
    price,
    img,
    code,
    stock,
    category,
    thumbnails,
  }) {
    try {
      if (!title || !description || !price || !code || !stock || !category) {
        console.log("Todos los campos son obligatorios");
        return;
      }

      const existeProducto = await ProductsModel.findOne({ code: code });

      if (existeProducto) {
        console.log("El codigo debe ser unico");
        return;
      }

      const newProduct = new ProductsModel({
        title,
        description,
        price,
        img,
        code,
        stock,
        category,
        status: true,
        thumbnails: thumbnails || [],
      });

      await newProduct.save();
    } catch (error) {
      console.log("Error al agregar producto", error);
      throw error;
    }
  }
  // async getProducts() {
  //   try {
  //     const productos = await ProductsModel.find();
  //     return productos;
  //   } catch (error) {
  //     console.log("Error al recuperar productos", error);
  //     throw error;
  //   }
  // }

  // Modificar la función getProducts() en tu productManager
  async getProducts({ limit = 10, page = 1, sort, query } = {}) {
    try {
      const skip = (page - 1) * limit;

      let queryOptions = {};

      if (query) {
        queryOptions = { ...queryOptions, title: query };
      }

      const sortOptions = {};
      if (sort) {
        if (sort === "asc" || sort === "desc") {
          sortOptions.price = sort === "asc" ? 1 : -1;
        }
      }

      const productos = await ProductsModel.find(queryOptions)
        .sort(sortOptions)
        .skip(skip)
        .limit(limit);

      const totalProducts = await ProductsModel.countDocuments(queryOptions);

      const totalPages = Math.ceil(totalProducts / limit);
      const hasPrevPage = page > 1;
      const hasNextPage = page < totalPages;

      return {
        docs: productos,
        totalPages,
        prevPage: hasPrevPage ? page - 1 : null,
        nextPage: hasNextPage ? page + 1 : null,
        page,
        hasPrevPage,
        hasNextPage,
        prevLink: hasPrevPage
          ? `/api/products?limit=${limit}&page=${
              page - 1
            }&sort=${sort}&query=${query}`
          : null,
        nextLink: hasNextPage
          ? `/api/products?limit=${limit}&page=${
              page + 1
            }&sort=${sort}&query=${query}`
          : null,
      };
    } catch (error) {
      console.log("Error al obtener los productos", error);
      throw error;
    }
  }

  async getProductById(id) {
    try {
      const producto = await ProductsModel.findById(id);

      if (!producto) {
        console.log("Producto no encontrado");
        return null;
      } else {
        console.log("Producto encontrado");
        return producto;
      }
    } catch (error) {
      console.log("Error al buscar producto por id", error);
      throw error;
    }
  }

  async updateProduct(id, productoActualizado) {
    try {
      const updateProduct = await ProductsModel.findByIdAndUpdate(
        id,
        productoActualizado
      );

      if (!updateProduct) {
        console.log("Producto no encontrado");
        return null;
      }

      console.log("Producto actualizado: ");
      return updateProduct;
    } catch (error) {
      console.log("Error al actualizar el producto", error);
      throw error;
    }
  }

  async deleteProduct(id) {
    try {
      const deleteProduct = await ProductsModel.findByIdAndDelete(id);

      if (!deleteProduct) {
        console.log("Producto no encontrado");
        return null;
      }

      console.log("Producto eliminado");
    } catch (error) {
      console.log("Error al eliminar producto", error);
      throw error;
    }
  }
}

export default ProductsManager;
