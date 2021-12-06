const axios = require('axios');

class Busquedas {
	historial = ['Tegucigalpa', 'Madrid'];

	constructor() {
		// TODO: Leer DB si existe
	}

	get paramsMapbox() {
		return {
			'access_token': process.env.MAPBOX_KEY,
			'limit': 5,
			'language': 'es'
		}
	}

	get paramsWeather() {
		return {
			'appid': process.env.OPENWEATHER_KEY,
			'lat': 10,
			'lon': 5,
			'lang': 'es',
			'units': 'metric'
		}
	}

	async ciudad(lugar  = '') {
		try {
			// Peticion Htpp;

			const instance = axios.create({
				baseURL: `https://api.mapbox.com/geocoding/v5/mapbox.places/${lugar}.json`,
				params: this.paramsMapbox
			})
			
			const respuesta  = await instance.get();
			
			return respuesta.data.features.map(lugar => ({
				id: lugar.id,
				nombre: lugar.place_name,
				lng: lugar.center[0],
				lat: lugar.center[1]
			}));

		} catch (error) {
			return []; // Retornar los lugares
		}
	}

	async climaLugar(lat, lon) {
		console.log(lat, lon);
		try {
			let params = this.paramsWeather;
			params = params.map(param => ({
				appid: param.appid,
				lat,
				lon,
				lang: param.lang,
				units: param.units
			}))

			console.log(params);
			const instance = axios.create({
				baseURL: 'https://api.openweathermap.org/data/2.5/weather',
				params
			})

			respuesta = await instance.get();

			console.log(respuesta.data);
			// resp.data

			return {
				desc: 'Algo de nubes',
				min: 'min',
				max: 'max',
				temp: 'temp'
			}
		} catch (error) {
			console.log(error);
		}
	}
}

module.exports = Busquedas;