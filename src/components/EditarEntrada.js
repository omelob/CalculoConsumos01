import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

import { editarEntradaAction } from "../actions/entradaActions";

const EditarEntrada = () => {

    const history = useHistory();
    const dispatch = useDispatch();

    // state para recibir los datos modificados    
    const [entrada, setEntrada] = useState({
        nombre: '',
        potencia: 0,
        uso: 0,
        consumoE: 0
    })
    
    // entrada a editar
    const entradaeditar = useSelector(state => state.entradas.entradaeditar);
    //if(!entrada) return null;
    const { nombre, potencia, uso } = entrada;
    //console.log(entrada);
    //console.log(entradaeditar);

    // llenar el state automaticamente
    useEffect(() => {
        
        setEntrada(entradaeditar);
        
    }, [entradaeditar])

    // leer los datos del formulario
    const onChangeFormulario = e => {
        
        setEntrada({
            ...entrada,
            [e.target.name] : e.target.value
            
        });
        
        
    }

    const submitEditarEntrada = e => {
        e.preventDefault();
        
        const {potencia, uso} = entrada;
        
        entrada.consumoE = potencia*uso;
        
        dispatch(editarEntradaAction(entrada));

        history.push('/');
    }

    return (  
        <div className="row justify-content-center">
            <div className="col-md-8">
                <div className="card">
                    <div className="card-body">
                        <h2 className="text-center mb-4 font-weight-bold">Editar Datos</h2>
                        <form
                            onSubmit={submitEditarEntrada}
                        >
                            <div className="form-group">
                                <label>Nombre Electrodoméstico</label>
                                <input 
                                    type="text"
                                    className="form-control"
                                    placeholder="Nombre Electrodoméstico"
                                    name="nombre"
                                    value={nombre}
                                    onChange={onChangeFormulario}
                                />
                            </div>
                            <div className="form-group">
                                <label>Potencia en Watts</label>
                                <input 
                                    type="number"
                                    className="form-control"
                                    placeholder="Potencia en Watts"
                                    name="potencia"
                                    value={potencia}
                                    onChange={onChangeFormulario}
                                />
                            </div>
                            <div className="form-group">
                                <label>Uso diario en horas</label>
                                <input 
                                    type="number"
                                    className="form-control"
                                    placeholder="Uso diario en horas"
                                    name="uso"
                                    value={uso}
                                    onChange={onChangeFormulario}
                                />
                            </div>
                            <button
                                type="submit"
                                className="btn btn-primary font-weight-bold text-uppercase d-block w-100"
                            >Guardar Cambios                           
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}
 
export default EditarEntrada;