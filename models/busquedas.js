const axios = require('axios');

class Busquedas {
    historial = ['Tegucigalpa', 'Madrid'];

    constructor() {
        // TODO: Leer DB si existe
    }

    async ciudad(lugar  = '') {
        try {
            // Peticion Htpp;
            const resp = await axios.get('https://reqres.in/api/users?page=2');

            console.log(resp.data);
            return []; // Retornar los lugares

        } catch (error) {
            return []; // Retornar los lugares
        }
    }
}

module.exports = Busquedas;