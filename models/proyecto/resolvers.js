import { InscriptionModel } from "../inscripcion/inscripcion.js";
import { UserModel } from "../usuario/usuario.js";
import { ProjectModel } from "./proyecto.js";

const resolversProyecto = {
  Proyecto: {
    lider: async (parent, args, context) => {
      const usr = await UserModel.findOne({
        _id: parent.lider.toString(),
      });
      return usr;
    },
  },
  Query: {
    Proyectos: async (parent, args) => {
      const proyectos = await ProjectModel.find().populate([
        {
          path: "avances",
          populate: { path: "creadoPor" },
        },
        {
          path: "inscripciones",
        },
      ]);
      return proyectos;
    },

    Proyecto: async (parent, args) => {
      const proyecto = await ProjectModel.findOne({ _id: args._id }).populate([
        {
          path: "avances",
          populate: { path: "creadoPor" },
        },
        {
          path: "inscripciones",
          populate: { path: "estudiante" },
        },
      ]);
      return proyecto;
    },

    filtrarProyecto: async (parents, args) => {
      const proyectos = await ProjectModel.find({ lider: args.lider }).populate(
        [
          {
            path: "avances",
            populate: { path: "creadoPor" },
          },
          {
            path: "inscripciones",
            populate: { path: "estudiante" },
          },
        ]
      );
      return proyectos;
    },
  },

  Mutation: {
    crearProyecto: async (parent, args, context) => {
      if (context.userData.rol === "LIDER") {
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
      }
    },
    editarProyecto: async (parent, args, context) => {
      if (context.userData.rol === "LIDER") {
        const verificar = await ProjectModel.findOne({ _id: args._id });
        if (verificar.estado === "ACTIVO") {
          const proyectoEditado = await ProjectModel.findByIdAndUpdate(
            args._id,
            { ...args.campos },
            { new: true }
          );

          return proyectoEditado;
        } else {
          return verificar;
        }
      }
    },

    crearObjetivo: async (parent, args, context) => {
      if (context.userData.rol === "LIDER") {
      const proyectoConObjetivo = await ProjectModel.findByIdAndUpdate(
        args.idProyecto,
        {
          $addToSet: {
            objetivos: { ...args.campos },
          },
        },
        { new: true }
      );

      return proyectoConObjetivo;
      }
    },
    editarObjetivo: async (parent, args, context) => {
      if (context.userData.rol === "LIDER") {
      const proyectoEditado = await ProjectModel.findByIdAndUpdate(
        args.idProyecto,
        {
          $set: {
            [`objetivos.${args.indexObjetivo}.descripcion`]:
              args.campos.descripcion,
            [`objetivos.${args.indexObjetivo}.tipo`]: args.campos.tipo,
          },
        },
        { new: true }
      );
      return proyectoEditado;
      }
    },

    eliminarObjetivo: async (parent, args, context) => {
      if (context.userData.rol === "LIDER") {
      const proyectoObjetivo = await ProjectModel.findByIdAndUpdate(
        { _id: args.idProyecto },
        {
          $pull: {
            objetivos: {
              _id: args.idObjetivo,
            },
          },
        },
        { new: true }
      );
      return proyectoObjetivo;
      }
    },

    aprobarProyecto: async (parent, args, context) => {
      if (context.userData.rol === "ADMINISTRADOR") {
        const proyectoAprobado = await ProjectModel.findByIdAndUpdate(
          args._id,
          {
            estado: "ACTIVO",
            fase: "INICIADO",
            fechaInicio: new Date(),
          },
          { new: true }
        );
        return proyectoAprobado;
      }
    },

    terminarProyecto: async (parent, args, context) => {
      if (context.userData.rol === "ADMINISTRADOR") {
        const proyectoTerminado = await ProjectModel.findByIdAndUpdate(
          args._id,
          {
            fase: "TERMINADO",
            estado: "INACTIVO",
            fechaFin: new Date(),
          },
          { new: true }
        );
        const cerrarInscripciones = await InscriptionModel.updateMany(
          { proyecto: args._id, estado: "ACEPTADO" },
          {
            fechaEgreso: new Date(),
          }
        );
        return proyectoTerminado;
      }
    },

    inactivarProyecto: async (parent, args, context) => {
      if (context.userData.rol === "ADMINISTRADOR") {
        const proyectoInactivo = await ProjectModel.findByIdAndUpdate(
          args._id,
          {
            estado: "INACTIVO",
            fechaFin: new Date(),
          },
          { new: true }
        );
        const cerrarInscripciones = await InscriptionModel.updateMany(
          { proyecto: args._id, estado: "ACEPTADO" },
          {
            fechaEgreso: new Date(),
          }
        );
        return proyectoInactivo;
      }
    },

    reactivarProyecto: async (parent, args, context) => {
      if (context.userData.rol === "ADMINISTRADOR") {
        const verificar = await ProjectModel.findOne({ _id: args._id });
        if (verificar.fase !== "TERMINADO") {
          const proyectoAprobado = await ProjectModel.findByIdAndUpdate(
            args._id,
            {
              estado: "ACTIVO",
              fechaFin: null,
            },
            { new: true }
          );
          return proyectoAprobado;
        } else {
          return verificar;
        }
      }
    },
  },
};

export { resolversProyecto };
