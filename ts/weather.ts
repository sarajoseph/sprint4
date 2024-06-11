const weatherAPI: string = 'https://api.openweathermap.org/data/2.5/weather';
const API_KEY = 'ffe6804c8a87c4ef8e83eb850ea4fd5d';
const diffKelvin = 273.15;
const weatherBox: HTMLElement = document.getElementById('weatherBox') as HTMLElement;

const getWeatherData = async (api: string, key: string) => {
	const response = await fetch(api+'?q=Barcelona&appid='+key).then(response => response.json());
	return response;
}

const processWeatherData = async () => {
	try {
		const weatherData = await getWeatherData(weatherAPI, API_KEY);
		if (weatherData && weatherData.cod === 200) {
			const city: string = weatherData.name;
			const temp: number = Math.round(weatherData.main.temp - diffKelvin);
			const image: string = 'https://openweathermap.org/img/wn/'+weatherData?.weather[0].icon+'@2x.png';
			let strHTML = '<img src="'+image+'"/>';
			strHTML += '<div class="temp-container">';
			strHTML += '<p class="city">'+city+'</p>';
			strHTML += '<p class="temp">'+temp+'ºC</p>';
			strHTML += '</div>';
			weatherBox.innerHTML = strHTML;
		}
	} catch (error) {
		console.log('Error '+error);
	}
}

processWeatherData();