import React from 'react';
import { useHistory } from "react-router-dom";
import Swal from 'sweetalert2';

// Redux
import { useDispatch } from 'react-redux';
import { borrarEntradaAction, obtenerEntradaEditar } from '../actions/entradaActions';

const Entrada = ({entrada}) => {
    const { nombre, potencia, uso, consumoE, id } = entrada;

    const dispatch = useDispatch();
    const history = useHistory(); // habilita history para redireccion

    // cofirmar eliminacion
    const confirmarEliminacion = id => {

        // preguntar al usuario (https://sweetalert2.github.io/)
        Swal.fire({
            title: 'Está seguro?',
            text: "No es posible revertir esta acción",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, Eliminar!',
            cancelButtonText: 'Cancelar'
        }).then((result) => {
            if (result.isConfirmed) {

                // pasar la entrada al action
                dispatch(borrarEntradaAction(id));
                
            }
        })        
    }

    // funcion que redirige de forma programada
    const redireccionarEdicion = entrada => {
        dispatch( obtenerEntradaEditar(entrada));
        history.push(`/entradas/editar/${entrada.id}`)
    }

    return (  
        <tr>
            <td>{nombre}</td>
            <td>{potencia} Watts</td>
            <td>{uso} Horas</td>
            <td>{consumoE} Watts hora</td>
            <td className="acciones">
                <button 
                    type="button"
                    onClick={ () => redireccionarEdicion(entrada)}
                    className="btn btn-primary mr-2"
                >Editar
                </button>
                <button
                    type="button"
                    className="btn btn-danger"
                    onClick={() => confirmarEliminacion(id)}
                >Eliminar</button>
            </td>
        </tr>
    );
}
 
export default Entrada;