import { Schema, model } from "mongoose";
import {Enum_EstadoProyecto, Enum_FaseProyecto, Enum_TipoObjetivo} from './enums'
import { UserModel } from "./user";
import { ObjectiveModel } from "./objective";

interface project{
    nombre: string,
    presupuesto: number,
    fechaInicio: Date,
    fechaFin: Date,
    estado: Enum_EstadoProyecto,
    fase: Enum_FaseProyecto,
    lider: Schema.Types.ObjectId;
    objetivos: [{ descripcion: String; tipo: Enum_TipoObjetivo }];
}

const projectSchema = new Schema<project>({
    nombre: {
        type: String,
        required: true,
      },
      presupuesto: {
        type: Number,
        required: true,
      },
      fechaInicio: {
        type: Date,
        required: true,
      },
      fechaFin: {
        type: Date,
        required: true,
      },
      estado: {
        type: String,
        enum: Enum_EstadoProyecto,
        default: Enum_EstadoProyecto.INACTIVO,
      },
      fase: {
        type: String,
        enum: Enum_FaseProyecto,
        default: Enum_FaseProyecto.NULO,
      },
      lider: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: UserModel,
      },
      objetivos: [
        {
          descripcion: {
            type: String,
            required: true,
          },
          tipo: {
            type: String,
            enum: Enum_TipoObjetivo,
            required: true,
          },
        },
      ],
});

const ProjectModel = model('Project', projectSchema);

export { ProjectModel };