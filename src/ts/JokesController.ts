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
	nextJokeClicks: number;
	reportJokes: ReportJokes[];

	constructor() {
		this.icanhazdadjokeAPI = 'https://icanhazdadjoke.com?mode=json';
		this.optionsAPI = {
			headers: {
				'Accept': 'application/json'
			},
		};
		this.chucknorrisAPI = 'https://api.chucknorris.io/jokes/random';
		this.errorMessage = 'An error has occured';
		this.nextJokeClicks = 0;
		this.reportJokes = [];
	}
	
	init(): void {
		this.processJokeData();

		(document.getElementById('btnJoke') as HTMLElement).addEventListener('click', (e) => {
			e.preventDefault();
			this.nextJokeClicks++;
			this.processJokeData();
		});
		
		(document.getElementById('btnJokeScore1') as HTMLElement).addEventListener('click', () => this.setReportJokes(1));
		(document.getElementById('btnJokeScore2') as HTMLElement).addEventListener('click', () => this.setReportJokes(2));
		(document.getElementById('btnJokeScore3') as HTMLElement).addEventListener('click', () => this.setReportJokes(3));
	}

	// Get joke from API
	getJokeData = async (): Promise<JokeData> => {
		let API_URL: string = this.icanhazdadjokeAPI;
		if (this.nextJokeClicks % 2) {
			API_URL = this.chucknorrisAPI;
		}
		const fetchResponse = await fetch(API_URL, this.optionsAPI).then(response => response.json());
		const response: JokeData = {
			id: fetchResponse.id,
			joke: fetchResponse.joke || fetchResponse.value
		}
		return response;
	}
	
	// Show next joke 
	processJokeData = async (): Promise<void> => {
		try {
			const data: JokeData = await this.getJokeData();
			if (typeof data.joke === 'string') {
				this.setBodyClass();
				const jokeStr: string = data.joke;
				console.log(jokeStr);
				(document.getElementById('joke') as HTMLElement).innerHTML = '" '+jokeStr+' "';
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
		const joke: string = (document.getElementById('joke') as HTMLElement).innerHTML;
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
