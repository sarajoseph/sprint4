const api: string = 'https://icanhazdadjoke.com?mode=json';
const options = {
	headers: {
		'Accept': 'application/json'
	},
};
const errorMessage: string = 'Ha habido un error';
const elJoke: HTMLElement = document.getElementById('joke') as HTMLElement;
const btnJoke: HTMLElement = document.getElementById('btnJoke') as HTMLElement;

interface Data {
	id: string,
	joke: string,
	status: number
}

const getData = async (api: string, options: { headers: { 'Accept': string } }): Promise<Data> => {
	const response: Data = await fetch(api, options).then(response => response.json());
	return response;
}

const processData = async (): Promise<void> => {
	try {
		const data: Data = await getData(api, options);
		if(data.status === 200 && typeof data.joke === 'string') {
			const jokeStr: string = data.joke;
			console.log(jokeStr);
			elJoke.innerHTML = '" '+jokeStr+' "';
		} else {
			console.log(errorMessage);
		}
	} catch (error) {
		console.log('Error '+error);
	}
}

processData();

btnJoke?.addEventListener('click', function(e){
	// Llamar a la API, mostrar siguiente chiste y también mostrarlo por consola
	e.preventDefault();
	processData();
});