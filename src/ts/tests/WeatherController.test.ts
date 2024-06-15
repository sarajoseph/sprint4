import WeatherController from '../WeatherController';

const weatherController = new WeatherController();

test('Should return an Object with defined properties', async () => {
	const expectedWeatherData = {
		name: 'Barcelona'
	}
	const actualWeatherData = await weatherController.getWeatherData();
	expect(typeof actualWeatherData).toBe('object');
	expect(actualWeatherData.cod).toBe(200);
	expect(actualWeatherData.name).toBeDefined();
	expect(actualWeatherData.name).toBe(expectedWeatherData.name);
	expect(actualWeatherData.main.temp).toBeDefined();
	expect(actualWeatherData.weather[0].icon).toBeDefined();
});