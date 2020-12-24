import React from 'react';

const Totalizador = ({entradas}) => {

    //console.log(entradas);
    let totalConsumo = 0;
    entradas.forEach(function(elemento, indice){
        totalConsumo += elemento['consumoE'];
    });
    //console.log(totalConsumo);
    const consumoSem = (totalConsumo*7/1000).toFixed(2);
    const consumoMes = (totalConsumo*30/1000).toFixed(2);
    const consumoAnio = (consumoMes*12).toFixed(2);
    return (  
        <>
            <h2>Resumen de Datos</h2>
            
            <table className="table teble-striped">
                <thead className="bg-primary table-dark">
                    <tr>
                        <th scope="col">Consumo Total Diario en Wh</th>
                        <th scope="col">Consumo Semanal promedio kWh</th>
                        <th scope="col">Consumo Mensual promedio kWh</th>
                        <th scope="col">Consumo Anual promedio kWh</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>{totalConsumo} Watts hora</td>
                        <td>{consumoSem} kWatts hora</td>
                        <td>{consumoMes} kWatts hora</td>
                        <td>{consumoAnio} kWatts hora</td>            
                    </tr>
                </tbody>
                <tfoot className="bg-primary table-light">
                    <tr>
                        <td>Suma de consumos diarios</td>
                        <td>(Consumo Diario X 7)/1000</td>
                        <td>(Consumo Diario X 30)/1000</td>
                        <td>Consumo Mensual X 12</td>
                    </tr>
                </tfoot>  
            </table>            
        </>
    );
}
 
export default Totalizador;