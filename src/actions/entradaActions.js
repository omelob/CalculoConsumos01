import Swal from 'sweetalert2';

import {  
    AGREGAR_ENTRADA,
    AGREGAR_ENTRADA_EXITO,
    AGREGAR_ENTRADA_ERROR,
    DESCARGA_INICIADA,
    DESCARGA_TERMINADA,
    DESCARGA_FALLIDA,
    OBTENER_ENTRADA_ELIMINAR,
    ENTRADA_ELIMINADA_OK,
    ENTRADA_ELIMINADA_FALLA,
    OBTENER_ENTRADA_EDITAR,
    INICIAR_EDICION_ENTRADA,
    ENTRADA_EDITADA_OK,
    ENTRADA_EDITADA_FALLA
} from "../types";
import clienteAxios from '../config/axios';

// crear nuevas entradas para calculo de consumo
export function crearNEntradaAction(entrada){
    return async (dispatch) => {
        dispatch( agregarEntrada());

        try {
            // insertar en la API
            await clienteAxios.post('/entradas', entrada);

            // si todo sale bien, se actualiza el state
            dispatch( agregarEntradaExito(entrada));

            // Alerta con sweetaler2
            Swal.fire(
                'Correcto',
                'El consumo se agregó correctamente',
                'success'
            )

        } catch (error) {
            console.log(error);

            // si hay un error, se cambia el state
            dispatch( agregarEntradaError(true));

            // alerta error
            Swal.fire({
                icon: 'error',
                title: 'Hubo un error',
                text: 'Hubo un error, intenta de nuevo'
            })
        }
    }
}

const agregarEntrada = () => ({
    type: AGREGAR_ENTRADA,
    payload: true
});

// si el producto se guarda en la db
const agregarEntradaExito = entrada => ({
    type: AGREGAR_ENTRADA_EXITO,
    payload: entrada
});

// si hubo un error 
const agregarEntradaError = estado => ({
    type: AGREGAR_ENTRADA_ERROR,
    payload: estado
});

// funcion que descarga las entradas de la db
export function obtenerEntradasAction(){
    return async (dispatch) => {
        dispatch( descargarEntradas() );

        try {

            const respuesta = await clienteAxios.get('/entradas');
            dispatch( descargaEntradasOK(respuesta.data))
            
        } catch (error) {

            console.log(error);
            dispatch( descargaEntradasFalla())
        }
    }
};

const descargarEntradas = () => ({
    type: DESCARGA_INICIADA,
    payload: true
});

const descargaEntradasOK = entradas => ({
    type: DESCARGA_TERMINADA,
    payload: entradas
});

const descargaEntradasFalla = () => ({
    type: DESCARGA_FALLIDA,
    payload: true
});

// selecciona y elimina la entrada
export function borrarEntradaAction(id){
    return async (dispatch) => {
        dispatch(obtenerEntradaEliminar(id));
        
        try {
            await clienteAxios.delete(`/entradas/${id}`);
            dispatch( eliminarEntradaOK())

            // si se elimina, mostrar alerta codigo traido de entrada.js
            Swal.fire(
                'Eliminada!',
                'La entrada ha sido eliminada.',
                'success'
            )

        } catch (error) {
            console.log(error);
            dispatch(eliminarEntradaFalla())
        }
    }
}

const obtenerEntradaEliminar = id => ({
    type: OBTENER_ENTRADA_ELIMINAR,
    payload: id
});

const eliminarEntradaOK = () => ({
    type: ENTRADA_ELIMINADA_OK
});

const eliminarEntradaFalla = () => ({
    type: ENTRADA_ELIMINADA_FALLA,
    payload: true
});

// colocar entrada en edicion
export function obtenerEntradaEditar(entrada){
    return (dispatch) => {
        dispatch( obtenerEntradaEDAction(entrada) )
    }
};

const obtenerEntradaEDAction = entrada => ({
    type: OBTENER_ENTRADA_EDITAR,
    payload: entrada
});

// edita un registro en la api y en el state
export function editarEntradaAction(entrada){
    return async (dispatch) => {
        dispatch( editarEntrada());

        try {
            await clienteAxios.put(`/entradas/${entrada.id}`, entrada);
            dispatch( editarEntradaOK(entrada));
        } catch (error) {
            console.log(error);
            dispatch( editarEntradaFalla());
        }
    }
};

const editarEntrada = () => ({
    type: INICIAR_EDICION_ENTRADA
});

const editarEntradaOK = entrada => ({
    type: ENTRADA_EDITADA_OK,
    payload: entrada
});

const editarEntradaFalla = () => ({
    type: ENTRADA_EDITADA_FALLA,
    payload: true
})
