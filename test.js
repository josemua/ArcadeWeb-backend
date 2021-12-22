import { tipos } from "./graphql/types.js";
import { resolvers } from "./graphql/resolvers.js";
import { gql } from "apollo-server-express";
import { ApolloServer } from "apollo-server-express";
import conectarBD from "./db/db.js";
import dotenv from "dotenv";
import assert from "assert";

dotenv.config();
await conectarBD();

const server = new ApolloServer({
  typeDefs: tipos,
  resolvers: resolvers,
});

let varId = "";

it("creates user", async () => {
  const result = await server.executeOperation({
    query: gql`
      mutation CrearUsuario(
        $nombre: String!
        $apellido: String!
        $identificacion: String!
        $correo: String!
        $password: String!
        $rol: Enum_Rol!
      ) {
        crearUsuario(
          nombre: $nombre
          apellido: $apellido
          identificacion: $identificacion
          correo: $correo
          password: $password
          rol: $rol
        ) {
          correo
        }
      }
    `,
    variables: {
      nombre: "test",
      apellido: "test",
      identificacion: "test",
      correo: "testing@testing.com",
      rol: "ADMINISTRADOR",
      password: "test",
    },
  });

  assert.equal(result.data.crearUsuario.correo, "testing@testing.com");
  varId = result.data.crearUsuario._id;
});

it("deletes user", async () => {
  const result = await server.executeOperation({
    query: gql`
      mutation EliminarUsuario($correo: String) {
        eliminarUsuario(correo: $correo) {
          correo
        }
      }
    `,
    variables: {
      correo: "testing@testing.com",
    },
  });
  assert.equal(result.data.eliminarUsuario.correo, "testing@testing.com");
});
