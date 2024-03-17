const mongoose = require("mongoose");

mongoose
  .connect(
    "mongodb+srv://matiasch256:coderhouse@cluster0.srohw4p.mongodb.net/ecommerce?retryWrites=true&w=majority&appName=Cluster0"
  )
  .then(() => console.log("Conexión exitosa"))
  .catch((error) => console.log("Error en la conexión", error));
