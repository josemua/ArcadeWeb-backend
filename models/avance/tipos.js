import { gql } from "apollo-server-express";

const tiposAvance = gql`
  type Observacion {
    _id: ID!
    descripcion: String!
    fecha: Date!
  }
  input crearObservacion {
    descripcion: String!
    fecha: Date!
  }

  input camposObservacion {
    descripcion: String!
    fecha: Date!
  }

  input camposAvance {
    descripcion: String!
  }

  type Avance {
    _id: ID!
    fecha: Date!
    descripcion: String!
    observaciones: [Observacion]
    proyecto: Proyecto!
    creadoPor: Usuario!
  }

  type Query {
    Avances: [Avance]
    Avance(_id: String!): Avance
    filtrarAvance(idEstudiante: String!): [Avance]
  }
  type Mutation {

    crearAvance(
      fecha: Date!
      descripcion: String!
      proyecto: String!
      creadoPor: String!
    ): Avance

    editarAvance(_id: String!, campos: camposAvance!): Avance

    eliminarAvance(_id: String): Avance

    crearObservacion(idAvance: String!, campos: camposObservacion!): Avance

    editarObservacion(
      idAvance: String!
      indexObservacion: Int!
      campos: camposObservacion!
    ): Avance

    eliminarObservacion(idAvance: String!, idObservacion: String!): Avance
  }
`;

export { tiposAvance };
