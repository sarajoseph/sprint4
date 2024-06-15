var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import WeatherController from '../WeatherController';
const weatherController = new WeatherController();
test('Should return an Object with defined properties', () => __awaiter(void 0, void 0, void 0, function* () {
    const expectedWeatherData = {
        name: 'Barcelona'
    };
    const actualWeatherData = yield weatherController.getWeatherData();
    expect(typeof actualWeatherData).toBe('object');
    expect(actualWeatherData.cod).toBe(200);
    expect(actualWeatherData.name).toBeDefined();
    expect(actualWeatherData.name).toBe(expectedWeatherData.name);
    expect(actualWeatherData.main.temp).toBeDefined();
    expect(actualWeatherData.weather[0].icon).toBeDefined();
}));
