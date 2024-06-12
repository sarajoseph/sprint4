var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
export default class WeatherController {
    constructor() {
        this.getWeatherData = (api, key) => __awaiter(this, void 0, void 0, function* () {
            const response = yield fetch(api + '?q=Barcelona&appid=' + key).then(response => response.json());
            return response;
        });
        this.processWeatherData = () => __awaiter(this, void 0, void 0, function* () {
            try {
                const weatherData = yield this.getWeatherData(this.weatherAPI, this.API_KEY);
                if (weatherData && weatherData.cod === 200) {
                    const city = weatherData.name;
                    const temp = Math.round(weatherData.main.temp - this.diffKelvin);
                    const image = 'https://openweathermap.org/img/wn/' + (weatherData === null || weatherData === void 0 ? void 0 : weatherData.weather[0].icon) + '@2x.png';
                    let strHTML = '<img src="' + image + '"/>';
                    strHTML += '<div class="temp-container">';
                    strHTML += '<p class="city">' + city + '</p>';
                    strHTML += '<p class="temp">' + temp + 'ºC</p>';
                    strHTML += '</div>';
                    this.weatherBox.innerHTML = strHTML;
                }
            }
            catch (error) {
                console.log('Error ' + error);
            }
        });
        this.weatherAPI = 'https://api.openweathermap.org/data/2.5/weather';
        this.API_KEY = 'ffe6804c8a87c4ef8e83eb850ea4fd5d';
        this.diffKelvin = 273.15;
        this.weatherBox = document.getElementById('weatherBox');
    }
    init() {
        this.processWeatherData();
    }
}
