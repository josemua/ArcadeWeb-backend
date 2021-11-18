import { addEmitHelper } from "typescript";
import conectarBD from "./db/db";
import { Enum_Rol, Enum_TipoObjetivo } from "./models/enums";
import { ObjectiveModel } from "./models/objective";
import { ProjectModel } from "./models/project";




  //Crear proyecto
/* await ProjectModel.create({
  nombre: "Proyecto 3",
  presupuesto: 50000,
  fechaInicio: Date.now(),
  fechaFin: new Date("2022/11/17"),
  lider: '6194a4be14b48c9ae74908db',
  objetivos: [
    {descripcion: "Este es el objetivo general", tipo: Enum_TipoObjetivo.general},
    {descripcion: "Este es el objetivo especifico 1", tipo: Enum_TipoObjetivo.especifico},
    {descripcion: "Este es el objetivo especifico 2", tipo: Enum_TipoObjetivo.especifico},
  ]
})
.then((p) =>{
  console.log("Proyecto creado", p);
})
.catch((e) =>{
  console.log("Error creando el proyecto", e);
}); */

//Obtener proyecto
/* const proyecto = await ProjectModel.find({id: '61956ff5b4b0f07b6429aeb4 3'});
console.log("El proyecto es: ", proyecto); */




//CRUD Usuarios

//Crear Usuario
/* await UserModel.create({
  correo: "admin@admin.com",
  nombre: "admin",
  rol: Enum_Rol.administrador,
})
  .then((u) => {
    console.log("usuario creado", u);
  })
  .catch((e) => {
    console.log("Error creando usuario", e);
  }); */


  /* await UserModel.create({
  correo: "estudiante@arcadeweb.com",
  nombre: "Jose M",
  rol: Enum_Rol.estudiante,
})
  .then((u) => {
    console.log("usuario creado", u);
  })
  .catch((e) => {
    console.log("Error creando usuario", e);
  }); */

  //Obtener usuario
 /*  await UserModel.findOne({correo: 'admin@arcadeweb.com'})
  .then((u) =>{
    console.log("Usuario encontrado", u);
  })
  .catch((e) =>{
    console.log("Error encontrando usuario", e);
  }); */

  //Obtener todos los usuarios
  /* await UserModel.find()
  .then((u) =>{
    console.log("Usuarios", u);
  })
  .catch((e) =>{
    console.log("Error obteniendo los usuarios", e);
  }); */

  //Actualizar usuario
/* await UserModel.findOneAndUpdate(
  { correo: 'estudiante@arcadeweb.com'},
  {
    nombre: 'Jose Muñoz',
  }
)
.then((u) =>{
  console.log("usuario actualizado", u);
})
.catch((e) =>{
  console.log("Error actualizando usuario", e);
}); */

/* await UserModel.findOneAndDelete({correo: 'test@arcadeweb.com'})
  .then((u) =>{
    console.log("Usuario eliminado", u);
  })
  .catch((e) =>{
    console.log("Error eliminando usuario", e);
  }); */



  // CRUD Proyectos

