import { addEmitHelper } from "typescript";
import conectarBD from "./db/db";
import { Enum_Rol } from "./models/enums";
import { ProjectModel } from "./models/project";

const main = async () => {
  await conectarBD();

  //Crear proyecto
/* await ProjectModel.create({
  nombre: "Proyecto 2",
  presupuesto: 5000,
  fechaInicio: Date.now(),
  fechaFin: new Date("2021/12/24"),
  lider: '6194a4be14b48c9ae74908db',
})
.then((p) =>{
  console.log("Proyecto creado", p);
})
.catch((e) =>{
  console.log("Error creando el proyecto");
}); */

//Obtener proyecto
/* const proyecto = await ProjectModel.find({nombre: 'Proyecto 2'}).populate('lider');
console.log("El proyecto es: ", proyecto); */



};
main();


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

