export default class WeatherController {
	weatherAPI: string;
	API_KEY: string;
	diffKelvin: number;
	weatherBox: HTMLElement;
	constructor() {
		this.weatherAPI = 'https://api.openweathermap.org/data/2.5/weather';
		this.API_KEY = 'ffe6804c8a87c4ef8e83eb850ea4fd5d';
		this.diffKelvin = 273.15;
		this.weatherBox = document.getElementById('weatherBox') as HTMLElement;
	}
	
	init(): void {
		this.processWeatherData();
	}

	getWeatherData = async (api: string, key: string): Promise<any> => {
		const response = await fetch(api+'?q=Barcelona&appid='+key).then(response => response.json());
		return response;
	}

	processWeatherData = async (): Promise<void> => {
		try {
			const weatherData = await this.getWeatherData(this.weatherAPI, this.API_KEY);
			if (weatherData && weatherData.cod === 200) {
				const city: string = weatherData.name;
				const temp: number = Math.round(weatherData.main.temp - this.diffKelvin);
				const image: string = 'https://openweathermap.org/img/wn/'+weatherData?.weather[0].icon+'@2x.png';
				let strHTML: string = '<img src="'+image+'"/>';
				strHTML += '<div class="temp-container">';
				strHTML += '<p class="city">'+city+'</p>';
				strHTML += '<p class="temp">'+temp+'ºC</p>';
				strHTML += '</div>';
				this.weatherBox.innerHTML = strHTML;
			}
		} catch (error) {
			console.log('Error '+error);
		}
	}
}