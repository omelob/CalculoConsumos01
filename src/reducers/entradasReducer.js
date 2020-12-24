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
    ENTRADA_EDITADA_OK,
    ENTRADA_EDITADA_FALLA
} from "../types";

// cada reducer tiene su propio state
const initialState = {
    entradas: [],
    error: null,
    loading: false,
    entradaeliminar: null,
    entradaeditar: null
}

/* eslint import/no-anonymous-default-export: [2, {"allowAnonymousFunction": true}] */
export default function(state = initialState, action){
    switch(action.type){
        case AGREGAR_ENTRADA:
        case DESCARGA_INICIADA:
            return{
                ...state,
                loading: action.payload
            }
        case AGREGAR_ENTRADA_EXITO:
            return{
                ...state,
                loading: false,
                entradas: [...state.entradas, action.payload]
            }
        case AGREGAR_ENTRADA_ERROR:
        case DESCARGA_FALLIDA:
        case ENTRADA_ELIMINADA_FALLA:
        case ENTRADA_EDITADA_FALLA:
            return{
                ...state,
                loading: false,
                error: action.payload
            }
        case DESCARGA_TERMINADA:
            return{
                ...state,
                loading: false,
                error: null,
                entradas: action.payload
            }
        case OBTENER_ENTRADA_ELIMINAR:
            return{
                ...state,
                entradaeliminar: action.payload
            }
        case ENTRADA_ELIMINADA_OK:
            return{
                ...state,
                entradas: state.entradas.filter( entrada => entrada.id !== state.entradaeliminar),
                entradaeliminar: null
            }
        case OBTENER_ENTRADA_EDITAR:
            return{
                ...state,
                entradaeditar: action.payload
            }
        case ENTRADA_EDITADA_OK:
            return{
                ...state,
                entradaeditar: null,
                entradas: state.entradas.map( entrada => 
                    entrada.id === action.payload.id ? entrada = action.payload : entrada
                )
            }
        default:
            return state;
    }
}