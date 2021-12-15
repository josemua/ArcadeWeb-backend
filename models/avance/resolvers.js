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
        creadoPor: args.idEstudiante,
      })
        .populate("proyecto")
        .populate("creadoPor");
      return avanceFiltrado;
    },
  },

  Mutation: {

    crearAvance: async (parent, args, context) => {
      if (context.userData.rol === "ESTUDIANTE") {
      const proyectoTerminado = await ProjectModel.findOne({ _id: args.proyecto})
      if (proyectoTerminado.fase === "EN_DESARROLLO"){
      const avanceCreado = ModeloAvance.create({
        fecha: args.fecha,
        descripcion: args.descripcion,
        proyecto: args.proyecto,
        creadoPor: args.creadoPor,
      });
      return avanceCreado
    }else if (proyectoTerminado.fase === "INICIADO"){
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
      return avanceCreado;
      
    }else{
        return proyectoTerminado
      }
    }
    },

    editarAvance: async (parent, args, context) => {
      if (context.userData.rol === "ESTUDIANTE") {
      const avanceEditado = await ModeloAvance.findByIdAndUpdate(
        args._id,
        {
          ...args.campos,
        },
        { new: true }
      );

      return avanceEditado;
      }
    },

    eliminarAvance: async (parent, args, context) => {
      if (Object.keys(args).includes("_id")) {
        const avanceEliminado = await ModeloAvance.findOneAndDelete({
          _id: args._id,
        });
        return avanceEliminado;
      }
    },

    crearObservacion: async (parent, args, context) => {
      if (context.userData.rol === "LIDER") {
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
      }
    },

    editarObservacion: async (parent, args, context) => {
      if (context.userData.rol === "LIDER") {
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
      }
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
