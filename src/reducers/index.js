import { combineReducers } from "redux";

import entradasReducer from './entradasReducer';
import alertaReducer from './alertaReducer';

export default combineReducers({
    entradas: entradasReducer,
    alerta: alertaReducer
});