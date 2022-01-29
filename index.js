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

				if (id === '0') continue;

				const lugarSel = lugares.find(l => l.id === id);

				//Save in DB
				busquedas.addHistory(lugarSel.nombre);
				
				const clima = await busquedas.climaLugar(lugarSel.lat, lugarSel.lng);
				
				// Mostrar resultados
				console.log('Información del lugar'.green);
				console.log('Cuidad:', lugarSel.nombre);
				console.log('Lat:', lugarSel.lat);
				console.log('Lng:', lugarSel.lng);

				// Clima
				console.log('Temperatura:', clima.temp);
				console.log('Mínima:', clima.min);
				console.log('Máxima:', clima.max);
				console.log('Como está el clima:', clima.desc)
				break;
			case 2:
				busquedas.historialCapitalizado.forEach((lugar, i) => {
					const idx = `${ i + 1 }.`.gray;

					console.log(`${ idx } ${ lugar }`);
				});
				break;
			case 3:
				busquedas.clearHistory();
				break;
			default:
				break;
		}
		await pausa();
	} while (opt !== 0);
}

mail();