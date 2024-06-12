type JokeData = {
	id: string,
	joke: string
}

type ReportJokes = {
	joke: string,
	score: number,
	date: string
};

export default class JokesController {
	icanhazdadjokeAPI: string;
	optionsAPI: any;
	chucknorrisAPI: string;
	errorMessage: string;
	elJoke: HTMLElement;
	btnJoke: HTMLElement;
	nextJokeClicks: number;
	reportJokes: ReportJokes[];
	btnJokeScore1: HTMLElement;
	btnJokeScore2: HTMLElement;
	btnJokeScore3: HTMLElement;

	constructor() {
		this.icanhazdadjokeAPI = 'https://icanhazdadjoke.com?mode=json';
		this.optionsAPI = {
			headers: {
				'Accept': 'application/json'
			},
		};
		this.chucknorrisAPI = 'https://api.chucknorris.io/jokes/random';
		this.errorMessage = 'An error has occured';
		this.elJoke = document.getElementById('joke') as HTMLElement;
		this.btnJoke = document.getElementById('btnJoke') as HTMLElement;
		this.nextJokeClicks = 0;
		this.reportJokes = [];
		this.btnJokeScore1 = document.getElementById('btnJokeScore1') as HTMLElement;
		this.btnJokeScore2 = document.getElementById('btnJokeScore2') as HTMLElement;
		this.btnJokeScore3 = document.getElementById('btnJokeScore3') as HTMLElement;
	}
	
	init(): void {
		this.processJokeData();

		this.btnJoke.addEventListener('click', (e) => {
			e.preventDefault();
			this.nextJokeClicks++;
			this.processJokeData();
		});
		
		this.btnJokeScore1.addEventListener('click', () => this.setReportJokes(1));
		this.btnJokeScore2.addEventListener('click', () => this.setReportJokes(2));
		this.btnJokeScore3.addEventListener('click', () => this.setReportJokes(3));
	}

	// Get joke from API
	getJokeData = async (api: string, options: { headers: { 'Accept': string } }): Promise<JokeData> => {
		const fetchResponse = await fetch(api, options).then(response => response.json());
		const response: JokeData = {
			id: fetchResponse.id,
			joke: fetchResponse.joke || fetchResponse.value
		}
		return response;
	}
	
	// Show next joke 
	processJokeData = async (): Promise<void> => {
		try {
			let API_URL: string = this.icanhazdadjokeAPI;
			if (this.nextJokeClicks % 2) {
				API_URL = this.chucknorrisAPI;
			}
			const data: JokeData = await this.getJokeData(API_URL, this.optionsAPI);
			if (typeof data.joke === 'string') {
				this.setBodyClass();
				const jokeStr: string = data.joke;
				console.log(jokeStr);
				this.elJoke.innerHTML = '" '+jokeStr+' "';
			} else {
				console.log(this.errorMessage);
			}
		} catch (error) {
			console.log('Error '+error);
		}
	}
	
	// Change shape background image
	setBodyClass = (): void => {
		const body: HTMLElement = document.getElementsByTagName('body')[0] as HTMLElement;
		const currentClass: string = body.className;
		const lastChar: number = parseInt(currentClass.substring(currentClass.length-1));
		let bodyClass: string = currentClass.substring(0, currentClass.length-1);
		if (lastChar === 5) {
			bodyClass += '1';
		} else {
			bodyClass += lastChar+1;
		}
		body.className = bodyClass;
	}
		
	// Set the puntuation of the joke, if the joke was in the array set the score and date
	setReportJokes = (score: number): void => {
		const joke: string = this.elJoke.innerHTML;
		const date: string = new Date().toISOString();
		const found = this.reportJokes.find((e) => {
			if(e.joke === joke) {
				e.score = score;
				e.date = date;
				return true;
			}
			return false;
		});
		if (!found) {
			this.reportJokes.push({joke: joke, score: score, date: date});
		}
		console.log(this.reportJokes);
	}
}
