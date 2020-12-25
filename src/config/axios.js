import axios from 'axios';

const clienteAxios = axios.create({
    baseURL: 'https://cryptic-scrubland-84623.herokuapp.com'
});

export default clienteAxios;