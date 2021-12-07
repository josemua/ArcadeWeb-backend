import { UserModel } from "../usuario/usuario.js";
import bcrypt from "bcrypt";
import { generateToken } from "../../utils/token.js";

const resolversAutenticacion = {
  Mutation: {
    registro: async (parent, args) => {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(args.password, salt);
      try {
        const usuarioCreado = await UserModel.create({
          nombre: args.nombre,
          apellido: args.apellido,
          identificacion: args.identificacion,
          correo: args.correo,
          rol: args.rol,
          password: hashedPassword,
        });
        return {
          token: generateToken({
            _id: usuarioCreado._id,
            nombre: usuarioCreado.nombre,
            apellido: usuarioCreado.apellido,
            identificacion: usuarioCreado.identificacion,
            correo: usuarioCreado.correo,
            rol: usuarioCreado.rol,
            estado: usuarioCreado.estado,
          }),
        };
      } catch (error) {
        return { error: "El correo ya está registrado en la base de datos" };
      }
    },

    login: async (parent, args) => {
      const usuarioEncontrado = await UserModel.findOne({
        correo: args.correo,
      });
      try {
        if (await bcrypt.compare(args.password, usuarioEncontrado.password)) {
          return {
            token: generateToken({
              _id: usuarioEncontrado._id,
              nombre: usuarioEncontrado.nombre,
              apellido: usuarioEncontrado.apellido,
              identificacion: usuarioEncontrado.identificacion,
              correo: usuarioEncontrado.correo,
              rol: usuarioEncontrado.rol,
              estado: usuarioEncontrado.estado,
            }),
          };
        } else {
          return { error: "Contraseña equivocada" };
        }
      } catch (error) {
        return { error: "Usuario no encontrado" };
      }
    },

    refreshToken: async (parent, args, context) => {
      if (!context.userData) {
        return {
          error: "token inválido",
        };
      } else {
        return {
          token: generateToken({
            _id: context.userData._id,
            nombre: context.userData.nombre,
            apellido: context.userData.apellido,
            identificacion: context.userData.identificacion,
            correo: context.userData.correo,
            rol: context.userData.rol,
            estado: context.userData.estado,
          }),
        };
      }
    },
  },
};

export { resolversAutenticacion };
