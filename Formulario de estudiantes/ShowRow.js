import React from "react";
import './ShowRow.css';
import {DatePicker} from '@material-ui/pickers';

function ShowRow(props){

    return(
        <tr>
            <td className="ListItem_id">
                {props.id}
            </td>
            <td className="ListItem-fechaingreso">
                {/* {props.fechainicio} */}
                <DatePicker value={props.fechain} onChange={props.handleChange}/>  
            </td>
            <td className="ListItem-fechaegreso">
                {props.fechaegreso}
            </td>
            <td className="ListItem-nombre">
                {props.nombre}
            </td>
            <td>
                <input className="button"
                    type="button"
                    value={props.valor}
                    onClick={props.handleClick}
                />
            </td>
        </tr>
    );
}

export default ShowRow;

