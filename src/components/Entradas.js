import React, { useEffect } from 'react';
import { jsPDF } from "jspdf";
import 'jspdf-autotable';

import Entrada from './Entrada';
import Totalizador from './Totalizador';

// redux
import { useDispatch, useSelector } from "react-redux";
import { obtenerEntradasAction } from "../actions/entradaActions";



const Entradas = () => {    

    const dispatch = useDispatch();

    useEffect(() => {
        // consultar la API
        const cargarEntradas = () => dispatch( obtenerEntradasAction() );

        cargarEntradas();
       // eslint-disable-next-line 
    }, []);

    // obtener el state
    const entradas = useSelector( state => state.entradas.entradas );
    const error = useSelector(state => state.entradas.error );
    const cargando = useSelector(state => state.entradas.loading);

    
    
    // Crear PDF 
    const printPDF = () => {
        
        // Create a new jsPDF instance
        const doc = new jsPDF("p", "pt", "a4"); // default values
        // set font
        doc.setFont("helvetica", "bold");

        // font size
        doc.setFontSize(20);

        // title, centered around x
        // doc.text(text, x, y, flags, angle, align);
        doc.text(
        "Mi Tabla de Consumos Eléctricos",
        105 * 2.83,
        20 * 2.83,
        null,
        null,
        "center"
        );

        // Table 1
        const consumosCol = ["Nombre Electrodoméstico", "Potencia en Watts", "Tiempo de uso diario en horas", "Consumo en Watts-hora"];

        const consumosRows = entradas.map(entrada => {
            const row = [entrada.nombre, entrada.potencia, entrada.uso, entrada.consumoE];
            return row;
        });

        // const startY = 10 * 2.83;
        const startY = 30 * 2.83;
        doc.autoTable(consumosCol, consumosRows, {
            // startY: 180 * 2.83,
            startY,
            theme: "striped",
            styles: {
            fontSize: 11
            },
            headStyles: {
                fillColor: [56, 41, 51],
                fontSize: 11,
            },
        });

        // Tabla 2
        let totalConsumo = 0;
        entradas.forEach(function(elemento, indice){
        totalConsumo += elemento['consumoE'];
        });
        //console.log(totalConsumo);
        const consumoSem = (totalConsumo*7/1000).toFixed(2);
        const consumoMes = (totalConsumo*30/1000).toFixed(2);
        const consumoAnio = (consumoMes*12).toFixed(2);

        
        //const start2Y = 80 * 2.83;

        doc.autoTable({

            head: [["Consumo Diario", "Consumo Semanal", "Consumo Mensual", "Consumo Anual"]],

            body: [[totalConsumo +" Wh", consumoSem +" kWh", consumoMes +" kWh", consumoAnio +" kWh"]],
            foot: [["Suma de consumos diarios", "(Consumo Diario X 7)/1000", "(Consumo Diario X 30)/1000", "Consumo Mensual X 12"]],

            headStyles: {
                fillColor: [59, 82, 73],
                fontSize: 11,
            },
            footStyles: {
                fillColor: [164, 180, 148],
                fontSize: 9,
                textColor: 68,
            },
            
            theme: "grid",
            styles: {
            fontSize: 11
            }
        });
        

        
        doc.setFontSize(7);
        doc.text(
            `ELECTRONATURAL ©${new Date().getFullYear()} All rights reserved`,
            142 * 2.83,

            doc.autoTable.previous.finalY + 22
        );

        doc.save(`Mi_consumo_${new Date().toISOString()}.pdf`);        
    
    };

    return (  
        < ><div id="content">
            <h2>Cálculo de Consumos Eléctricos Diarios</h2>
            { error ? <p className="font-weight-bold alert alert-danger text-center mt-4">Hubo un error</p> : null}
            { cargando ? <p className="text-center">Cargando...</p> : null}
            <table className="table teble-striped" id="losconsumos">
                <thead className="bg-primary table-dark">
                    <tr>
                        <th scope="col">Nombre Electrodoméstico</th>
                        <th scope="col">Potencia en Watts</th>
                        <th scope="col">Tiempo de uso diario en horas</th>
                        <th scope="col">Consumo en Watts-hora</th>
                    </tr>
                </thead>
                <tbody>
                    { entradas.length === 0 ? 'No hay Entradas' : (
                        entradas.map( entrada =>(
                            <Entrada 
                                key={entrada.id}
                                entrada={entrada}
                            />
                        ))
                    )}
                </tbody>   
            </table>
            <div>
                <Totalizador 
                    entradas={entradas}
                />
            </div>
            <h6 className="enaturalDR">ELECTRONATURAL ©{new Date().getFullYear()} All rights reserved</h6>
            </div>
            <button
                    type="button"
                    id="notpdf"
                    className="btn btn-success"
                    onClick={printPDF}
                >Descargar esta Información en PDF</button>
        </>
    );
}
 
export default Entradas;