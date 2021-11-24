import { InscriptionModel } from "./inscripcion.js";

const resolverInscripciones = {
  Query: {
    Inscripciones: async (parent, args) => {
      const inscripciones = await InscriptionModel.find().populate('estudiante').populate('proyecto');
      return inscripciones;
    },
  },
  Mutation: {
    crearInscripcion: async (parent, args) => {
      const inscripcionCreada = await InscriptionModel.create({
        estado: args.estado,
        proyecto: args.proyecto,
        estudiante: args.estudiante,
      });
      return inscripcionCreada;
    },
    aprobarInscripcion: async (parent, args) => {
        const inscripcionAprobada = await InscriptionModel.findByIdAndUpdate(args.id, {
          estado: 'ACEPTADO',
          fechaIngreso: Date.now(),
        }, {new: true});
        
        return inscripcionAprobada;
    },
    eliminarInscripcion: async (parent, args) => {
      const inscripcionEliminada = await InscriptionModel.findByIdAndDelete(args._id);
      return inscripcionEliminada;
   },
   editarInscripcion: async (parent, args) => {
    const inscripcionEditada = await InscriptionModel.findByIdAndUpdate(args._id,{
      estado: args.estado,
      fechaIngreso: args.fechaIngreso,
      fechaEgreso: args.fechaEgreso,
      proyecto: args.proyecto,
      estudiante: args.estudiante,
    }, {new: true});
    return inscripcionEditada;
 },
  },
};

export { resolverInscripciones};