import mongoose from "mongoose";

await mongoose
  .connect(
    "mongodb+srv://matiasch256:coderhouse@cluster0.srohw4p.mongodb.net/ecommerce?retryWrites=true&w=majority&appName=Cluster0"
  )
  .then(() => console.log("Conectado a la BD"))
  .catch((error) => console.log("No se pudo conectar a la BD:", error));
