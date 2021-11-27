const inquirer = require("inquirer");
const { leerInput, inquirerMenu, pausa } = require("./helpers/inquirer");
const Busquedas = require("./models/busquedas");

const mail = async() => {
    const busquedas = new Busquedas();
    let opt;

    do {
        opt = await inquirerMenu();

        switch (opt) {
            case 1:
                // Mostrar mensaje
                const lugar = await leerInput('Cuidad: ');

                await busquedas.ciudad(lugar);
                // Buscar los lugares
                // Seleccioar el lugar

                // Clima
                // Mostrar resultados
                console.log('Información del lugar'.green);
                console.log('Cuidad:');
                console.log('Lat:');
                console.log('Lng:');
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