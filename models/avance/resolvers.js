import { ProjectModel } from "../proyecto/proyecto.js";
import { ModeloAvance } from "./avance.js";

const resolversAvance = {
  Query: {
    Avances: async (parent, args) => {
      const avances = await ModeloAvance.find()
        .populate("proyecto")
        .populate("creadoPor");
      return avances;
    },
    Avance: async (parent, args) => {
      const avance = await ModeloAvance.find({ _id: args._id })
        .populate("proyecto")
        .populate("creadoPor");
      return avance;
    },

    filtrarAvance: async (parents, args) => {
      const avanceFiltrado = await ModeloAvance.find({
        proyecto: args.idProyecto,
      })
        .populate("proyecto")
        .populate("creadoPor");
      return avanceFiltrado;
    },
  },

  Mutation: {
    crearAvance: async (parents, args) => {
      const avanceCreado = ModeloAvance.create({
        fecha: args.fecha,
        descripcion: args.descripcion,
        proyecto: args.proyecto,
        creadoPor: args.creadoPor,
      });
      return avanceCreado;
    },

    crearPrimerAvance: async (parent, args) => {
      const avanceCreado = ModeloAvance.create({
        fecha: args.fecha,
        descripcion: args.descripcion,
        proyecto: args.proyecto,
        creadoPor: args.creadoPor,
      });
      const proyectoEnDesarrollo = await ProjectModel.findByIdAndUpdate(
        args.proyecto, 
        {
          fase: "EN_DESARROLLO",
        }, 
        { new: true }
      );
      return ("proyecto actualizado", avanceCreado);
    },

    editarAvance: async (parent, args) => {
      const avanceEditado = await ModeloAvance.findByIdAndUpdate(
        args._id,
        {
          ...args.campos,
        },
        { new: true }
      );

      return avanceEditado;
    },

    eliminarAvance: async (parent, args) => {
      if (Object.keys(args).includes("_id")) {
        const avanceEliminado = await ModeloAvance.findOneAndDelete({
          _id: args._id,
        });
        return avanceEliminado;
      }
    },

    crearObservacion: async (parent, args) => {
      const avanceConObservacion = await ModeloAvance.findByIdAndUpdate(
        args.idAvance,
        {
          $addToSet: {
            observaciones: { ...args.campos },
          },
        },
        { new: true }
      );
      return avanceConObservacion;
    },

    editarObservacion: async (parent, args) => {
      const avanceEditado = await ModeloAvance.findByIdAndUpdate(
        args.idAvance,
        {
          $set: {
            [`observaciones.${args.indexObservacion}.descripcion`]:
              args.campos.descripcion,
            [`observaciones.${args.indexObservacion}.fecha`]: args.campos.fecha,
          },
        },
        { new: true }
      );
      return avanceEditado;
    },

    eliminarObservacion: async (parent, args) => {
      const observacionEliminada = await ModeloAvance.findByIdAndUpdate(
        { _id: args.idAvance },
        {
          $pull: {
            observaciones: {
              _id: args.idObservacion,
            },
          },
        },
        { new: true }
      );
      return observacionEliminada;
    },
  },
};

export { resolversAvance };
