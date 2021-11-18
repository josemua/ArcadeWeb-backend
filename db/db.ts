import { connect } from "mongoose";

const conectarBD = async () => {
  return await connect(
    process.env.DATABASE_URL
  )
    .then(() => {
      console.log("Conectado a BD ArcadeWeb");
    })
    .catch((e) => {
      console.error("Error conectando a la BD", e);
    });
};

export default conectarBD;
