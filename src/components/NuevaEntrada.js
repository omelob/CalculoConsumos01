import React, { useState } from 'react';
import { useDispatch, useSelector } from "react-redux";

// Actions de Redux
import { crearNEntradaAction } from "../actions/entradaActions";
import { mostrarAlerta, ocultarAlertaAction } from "../actions/alertaActions";

const NuevaEntrada = ({history}) => {

    // state del componente
    const [nombre, setNombre] = useState('');
    const [potencia, setPotencia] = useState(0);
    const [uso, setUso] = useState(0);
    

    // utilizar useDispatch la cual devuelve una funcion
    const dispatch = useDispatch();

    // acceder al state del store con useSelector
    const cargando = useSelector( state => state.entradas.loading);
    const error = useSelector( state => state.entradas.error);
    const alerta = useSelector(state => state.alerta.alerta);
    
    // mandar llamar el action de entradaAction
    const agregarEntrada = (entrada) => dispatch( crearNEntradaAction(entrada));

    //cuando el usuario hace submit
    const submitNuevaEntrada = e => {

        e.preventDefault();

        // se valida el formulario
        if (nombre.trim() === '' || potencia <=0 || uso <= 0) {

            const alerta = {
                msg: 'Todos los campos son obligatorios',
                classes: 'alert alert-danger text-center text-uppercase p3'
            }
            dispatch(mostrarAlerta(alerta));
            return;
        }
        
        
        // se verifica que no hay errores
        dispatch(ocultarAlertaAction());

        // se crea la nueva entrada de consumos
        
        agregarEntrada({
            nombre,
            potencia,
            uso,
            consumoE: potencia*uso
        });

        // reireccionar
        history.push('/');
    }

    return (  
        <div className="row justify-content-center">
            <div className="col-md-8">
                <div className="card">
                    <div className="card-body">
                        <h2 className="text-center mb-4 font-weight-bold">Ingrese los datos para un nuevo cálculo</h2>
                        {alerta ? <p className={alerta.classes}>{alerta.msg}</p> : null}
                        <form
                            onSubmit={submitNuevaEntrada}
                        >
                            <div className="form-group">
                                <label>Nombre Electrodoméstico</label>
                                <input 
                                    type="text"
                                    className="form-control"
                                    placeholder="Nombre Electrodoméstico"
                                    name="nombre"
                                    value={nombre}
                                    onChange={e => setNombre(e.target.value)}
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
                                    onChange={e => setPotencia(Number(e.target.value))}
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
                                    onChange={e => setUso(Number(e.target.value))}
                                />
                            </div>
                            <button
                                type="submit"
                                className="btn btn-primary font-weight-bold text-uppercase d-block w-100"
                            >Agregar                           
                            </button>
                        </form>
                        {cargando ? <p>Cargando...</p> : null}
                        {error ? <p className="alert alert-danger p2 mt-4 text-center">Hubo un Error</p> : null}
                    </div>
                </div>
            </div>
        </div>
    );
}
 
export default NuevaEntrada;