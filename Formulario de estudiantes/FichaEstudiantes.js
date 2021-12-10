import React, {useState} from 'react';
import './FichaEstudiantes.css';
import ShowRow from './ShowRow';





function FichaEstudiantes () {

     const showEstList = [
         {
             id: 1,
             //fechainicio: "12/02/2021",
             fechaegreso: "12/12/2021",
             nombre: "Jorge Perea",
             valor:"Aceptado",
         },
         {
             id: 2,
             //fechainicio: "12/02/2021",
             fechaegreso: "12/12/2021",
             nombre: "Jorge Gomez",
             valor:"Aceptado",
         },
         {
             id: 3,
             //fechainicio: "12/02/2021",
             fechaegreso: "12/12/2021",
             nombre: "Jorge Jimenez",
             valor:"Pendiente",
         },
         {
             id: 4,
             //fechainicio: "12/02/2021",
             fechaegreso: "12/12/2021",
             nombre: "Jorge Gomez",
             valor:"Pendiente",
         },
         {
             id: 5,
             //fechainicio: "12/02/2021",
             fechaegreso: "12/12/2021",
             nombre: "Jorge Gomez",
             valor:"Aceptado",
         },
         {
             id: 6,
             //fechainicio: "12/02/2021",
             fechaegreso: "12/12/2021",
             nombre: "Luis Perez",
             valor:"Pendiente",
         }
     ];

//usestates
const [list, setList] = useState(showEstList);
const [fechaSeleccionada, setFechaSeleccionada] = useState(new Date());

function handleClick(event,index){
    console.log("Hola Mundo");
    alert(list[index].valor);
    if(list[index].valor === "Aceptado"){
        list[index].valor = "Pendiente";
    }else if(list[index].valor === "Pendiente"){
        list[index].valor = "Aceptado";
    }
    setList(list);
    let checkedCache = new Array(0);
    list.forEach((item) => {checkedCache.push(item.valor)});

}
    

    return(
       
        <div>
            <thead>
                <th>ID</th>
                <th>Fecha Inicio</th>
                <th>Fecha Egreso</th>
                <th>Nombre</th>
                <th>Pendiente</th>
            </thead>    
            <tbody>
                {
                    list.map((item, index) => {
                        return(
                            <ShowRow
                                key={index}
                                id={item.id}
                                fechain={fechaSeleccionada}
                                fechaegreso={item.fechaegreso}
                                nombre={item.nombre}
                                valor={item.valor}
                                handleClick={(e) => {handleClick(e,index)}}
                                handleChange={setFechaSeleccionada} 
                            />
                        );
                    })
                }
            </tbody>
            
        </div>
    );
}

export default FichaEstudiantes;