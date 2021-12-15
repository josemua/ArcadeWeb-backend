import { InscriptionModel } from "./inscripcion.js";

const resolverInscripciones = {
  Query: {
    Inscripciones: async (parent, args) => {
      const inscripciones = await InscriptionModel.find()
        .populate("estudiante")
        .populate("proyecto");
      return inscripciones;
    },

    filtrarInscripcion: async (parents, args) => {
      const inscripcionFiltrada = await InscriptionModel.find({
        estado: "PENDIENTE",
      })
        .populate("estudiante")
        .populate("proyecto");
      return inscripcionFiltrada;
    },
  },

  Mutation: {
    crearInscripcion: async (parent, args, context) => {
      if (context.userData.rol === "ESTUDIANTE") {
        const inscripcionCreada = await InscriptionModel.create({
          estado: args.estado,
          proyecto: args.proyecto,
          estudiante: args.estudiante,
        });
        return inscripcionCreada;
      }
    },
    aprobarInscripcion: async (parent, args, context) => {
      if (context.userData.rol === "LIDER") {
        const inscripcionAprobada = await InscriptionModel.findByIdAndUpdate(
          args.id,
          {
            estado: "ACEPTADO",
            fechaIngreso: Date.now(),
          },
          { new: true }
        );

        return inscripcionAprobada;
      }
    },
    rechazarInscripcion: async (parent, args, context) => {
      if (context.userData.rol === "LIDER") {
        const inscripcionRechazada = await InscriptionModel.findByIdAndUpdate(
          args.id,
          {
            estado: "RECHAZADO",
            fechaEgreso: Date.now(),
          },
          { new: true }
        );

        return inscripcionRechazada;
      }
    },
    editarInscripcion: async (parent, args) => {
      const inscripcionEditada = await InscriptionModel.findByIdAndUpdate(
        args._id,
        {
          estado: args.estado,
          fechaIngreso: args.fechaIngreso,
          fechaEgreso: args.fechaEgreso,
          proyecto: args.proyecto,
          estudiante: args.estudiante,
        },
        { new: true }
      );
      return inscripcionEditada;
    },
  },
};

export { resolverInscripciones };
