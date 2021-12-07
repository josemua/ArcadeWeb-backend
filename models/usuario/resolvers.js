import { UserModel } from "./usuario.js";
import bcrypt from "bcrypt";

const resolversUsuario = {
  Query: {
    Usuario: {
      inscripciones: async (parent, args, context) => {
        return InscriptionModel.find({ estudiante: parent._id });
      },
    },
    Usuarios: async (parent, args, context) => { 
      if(context.userData.rol === 'ADMINISTRADOR'){
      const usuarios = await UserModel.find().populate([
        {
          path: "inscripciones",
          populate: {
            path: "proyecto",
          },
        },
        {
          path: "avancesCreados",
        },
        {
          path: "proyectosLiderados",
        },
      ]);
      return usuarios;
    } else if(context.userData.rol === 'LIDER'){
      const usuarios = await UserModel.find({ rol: "ESTUDIANTE"}).populate([
      {
        path: "inscripciones",
        populate: {
          path: "proyecto",
        },
      },
      {
        path: "avancesCreados",
      },
      {
        path: "proyectosLiderados",
      },
    ]);
    return usuarios;
    } else{
      return null;
    };
  },
    
    Usuario: async (parent, args) => {
      const usuario = await UserModel.findOne({ _id: args._id });
      return usuario;
    },
  },

  Mutation: {
    crearUsuario: async (parent, args) => {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(args.password, salt);
      const usuarioCreado = await UserModel.create({
        nombre: args.nombre,
        apellido: args.apellido,
        identificacion: args.identificacion,
        correo: args.correo,
        rol: args.rol,
        estado: args.estado,
        password: hashedPassword,
      });
      return usuarioCreado;
    },

    editarUsuario: async (parent, args) => {
      const usuarioEditado = await UserModel.findByIdAndUpdate(
        args._id,
        {
          nombre: args.nombre,
          apellido: args.apellido,
          identificacion: args.identificacion,
          correo: args.correo,
          rol: args.rol,
          estado: args.estado,
        },
        { new: true }
      );

      return usuarioEditado;
    },

    eliminarUsuario: async (parent, args) => {
      if (Object.keys(args).includes("_id")) {
        const usuarioEliminado = await UserModel.findOneAndDelete({
          _id: args._id,
        });
        return usuarioEliminado;
      } else if (Object.keys(args).includes("correo")) {
        const usuarioEliminado = await UserModel.findOneAndDelete({
          correo: args.correo,
        });
        return usuarioEliminado;
      }
    },

    aprobarUsuario: async (parent, args) => {
      const usuarioAprobado = await UserModel.findByIdAndUpdate(
        args._id,
        {
          estado: "AUTORIZADO",
        },
        { new: true }
      );
      return usuarioAprobado;
    },

    cambiarPassword: async (parent, args) => {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(args.password, salt);
      const UserWithNewPassword = await UserModel.findByIdAndUpdate(
        args._id,
        {
          password: hashedPassword,
        },
        { new: true }
      );
      return UserWithNewPassword;
    },
  },
};

export { resolversUsuario };
