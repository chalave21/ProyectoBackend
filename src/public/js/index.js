document.addEventListener("DOMContentLoaded", function () {
  const socket = io();

  // socket.on("connect", () => {
  console.log("Conectado socket del cliente");
  socket.emit("1", "hola desde el lado del cliente");
  socket.on("2", (data) => {
    const listaProductos = document.getElementById("listaProductos");
    listaProductos.innerHTML = "";
    data.forEach((producto) => {
      listaProductos.innerHTML += `
    <div class='product-card'>
      <h3>Titulo : ${producto.title}</h3>
      <p>Descripción : ${producto.description}</p>
      <p>Precio: $${producto.price}</p>
      <p>Código: ${producto.code}</p>
      <p>Categoría: ${producto.category}</p>
      <p>Stock: ${producto.stock}</p>
      <p>Estado: ${producto.status ? "Disponible" : "Agotado"}</p>
      <img src="${producto.thumbnail}" alt="Thumbnail">
      <button class='deleteButton'>Eliminar</button>
    </div>
  `;
    });

    // Configuramos eliminar
    const deleteButtons = document.querySelectorAll(".deleteButton");
    deleteButtons.forEach((button, index) => {
      button.addEventListener("click", () => {
        deleteProduct(data[index].id);
      });
    });
  });

  const deleteProduct = (id) => {
    socket.emit("deleteProduct", id);
    scrollToTop();
  };

  const productForm = document.querySelector(".product-form");
  productForm.addEventListener("submit", (event) => {
    event.preventDefault();
    addProduct();
  });

  const addProduct = () => {
    const title = document.getElementById("form-title").value;
    const status = document.getElementById("form-select").value === "true";
    const category = document.getElementById("form-category").value;
    const description = document.getElementById("form-description").value;
    const price = parseFloat(document.getElementById("form-price").value);
    const thumbnail = document.getElementById("form-thumbnail").value;
    const code = document.getElementById("form-code").value;
    const stock = parseInt(document.getElementById("form-stock").value);

    if (
      title &&
      status !== undefined &&
      category &&
      description &&
      price &&
      thumbnail &&
      code &&
      stock !== undefined
    ) {
      const product = {
        title,
        status,
        category,
        description,
        price,
        thumbnail,
        code,
        stock,
      };

      socket.emit("addProduct", product);

      scrollToTop();
    } else {
      console.error("Algunos campos del formulario no están definidos.");
    }
  };

  function scrollToTop() {
    console.log("Scrolling to top...");
    const topElement = document.getElementById("top");
    topElement.scrollIntoView({ behavior: "auto" });
  }
});
