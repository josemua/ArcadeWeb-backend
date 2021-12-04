import { ProjectModel } from "./proyecto.js";

const resolversProyecto = {
  Query: {
    Proyectos: async (parent, args) => {
      const proyectos = await ProjectModel.find().populate({ path: "avances", populate: ({ path: "creadoPor",}), }).populate("lider");
      return proyectos;
    },

    filtrarProyecto: async (parents, args) => {
      const proyectoFiltrado = await ProjectModel.find({ proyecto: args.idProyecto }).populate({ path: "avances", populate: ({ path: "creadoPor", }), }).populate("lider");
      return proyectoFiltrado;
    },
  },

  Mutation: {
    crearProyecto: async (parent, args) => {
      const proyectoCreado = await ProjectModel.create({
        nombre: args.nombre,
        estado: args.estado,
        fase: args.fase,
        fechaInicio: args.fechaInicio,
        fechaFin: args.fechaFin,
        presupuesto: args.presupuesto,
        lider: args.lider,
        objetivos: args.objetivos,
      });
      return proyectoCreado;
    },
    editarProyecto: async (parent, args) => {
      const proyectoEditado = await ProjectModel.findByIdAndUpdate(
        args._id,
        {
          nombre: args.nombre,
          estado: args.estado,
          fase: args.fase,
          fechaInicio: args.fechaInicio,
          fechaFin: args.fechaFin,
          presupuesto: args.presupuesto,
          lider: args.lider,
          objetivos: args.objetivos,
        },
        { new: true }
      );

      return proyectoEditado;
    },
    eliminarProyecto: async (parent, args) => {
      const proyectoEliminada = await ProjectModel.findByIdAndDelete(args._id);
      return proyectoEliminada;
    },
  },
};

export { resolversProyecto };
