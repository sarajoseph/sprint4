const jokesAPI: string = 'https://icanhazdadjoke.com?mode=json';
const jokesOptions = {
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

interface ReportJokes {
	joke: string,
	score: number,
	date: string
};

// Get joke from API
const getData = async (api: string, options: { headers: { 'Accept': string } }): Promise<Data> => {
	const response: Data = await fetch(api, options).then(response => response.json());
	return response;
}

// Show next joke 
const processData = async (): Promise<void> => {
	try {
		const data: Data = await getData(jokesAPI, jokesOptions);
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
	e.preventDefault();
	processData();
});

let reportJokes: ReportJokes[] = [];

// Set the puntuation of the joke, if the joke was in the array set the score and date
const setReportJokes = (score: number): void => {
	const joke: string = elJoke.innerHTML;
	const date: string = new Date().toISOString();
	const found = reportJokes.find((e) => {
		if(e.joke === joke) {
			e.score = score;
			e.date = date;
			return true;
		}
		return false;
	});
	if (!found) {
		reportJokes.push({joke: joke, score: score, date: date});
	}
	console.log(reportJokes);
}

const btnJokeScore1: HTMLElement = document.getElementById('btnJokeScore1') as HTMLElement;
const btnJokeScore2: HTMLElement = document.getElementById('btnJokeScore2') as HTMLElement;
const btnJokeScore3: HTMLElement = document.getElementById('btnJokeScore3') as HTMLElement;

btnJokeScore1?.addEventListener('click', function(e){
	e.preventDefault();
	setReportJokes(1);
});
btnJokeScore2?.addEventListener('click', function(e){
	e.preventDefault();
	setReportJokes(2);
});
btnJokeScore3?.addEventListener('click', function(e){
	e.preventDefault();
	setReportJokes(3);
});