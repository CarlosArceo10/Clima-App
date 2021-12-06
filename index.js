require('dotenv').config();

const inquirer = require("inquirer");

const { leerInput, inquirerMenu, pausa, listarLugares } = require("./helpers/inquirer");
const Busquedas = require("./models/busquedas");

const mail = async() => {
    const busquedas = new Busquedas();
    let opt;

    do {
        opt = await inquirerMenu();

        switch (opt) {
            case 1:
                // Mostrar mensaje
                const terminoBusqueda = await leerInput('Cuidad: ');
                // Buscar los lugares
                const lugares = await busquedas.ciudad(terminoBusqueda);
                
                // Seleccioar el lugar
                const id = await listarLugares(lugares);
                const lugarSel = lugares.find(l => l.id === id);
                
                const clima = await busquedas.climaLugar(lugarSel.lat, lugarSel.lng);
                console.log(clima);
                // Mostrar resultados
                console.log('Información del lugar'.green);
                console.log('Cuidad:', lugarSel.nombre);
                console.log('Lat:', lugarSel.lat);
                console.log('Lng:', lugarSel.lng);

                // Clima
                console.log('Temperatura:');
                console.log('Mínima:');
                console.log('Máxima:');
                break;
            case 2:
                console.log('Seleccionó la opción número' , opt);
            default:
                break;
        }
        await pausa();
    } while (opt !== 0);
}

mail();