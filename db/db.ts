import { connect } from "mongoose";

const conectarBD = async () => {
  return await connect(
    "mongodb+srv://admin:admin2021@cluster0.rv6oo.mongodb.net/arcadeweb?retryWrites=true&w=majority"
  )
    .then(() => {
      console.log("Conectado a BD ArcadeWeb");
    })
    .catch((e) => {
      console.error("Error conectando a la BD", e);
    });
};

export default conectarBD;
