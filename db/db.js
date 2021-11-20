import mongoose from "mongoose";

const conectarBD = async () => {
  return await mongoose
    .connect(process.env.DATABASE_URL)
    .then(() => {
      console.log("Conectado a BD ArcadeWeb");
    })
    .catch((e) => {
      console.error("Error conectando a la BD", e);
    });
};

export default conectarBD;
