var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
export default class JokesController {
    constructor() {
        // Get joke from API
        this.getJokeData = () => __awaiter(this, void 0, void 0, function* () {
            let API_URL = this.icanhazdadjokeAPI;
            if (this.nextJokeClicks % 2) {
                API_URL = this.chucknorrisAPI;
            }
            const fetchResponse = yield fetch(API_URL, this.optionsAPI).then(response => response.json());
            const response = {
                id: fetchResponse.id,
                joke: fetchResponse.joke || fetchResponse.value
            };
            return response;
        });
        // Show next joke 
        this.processJokeData = () => __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield this.getJokeData();
                if (typeof data.joke === 'string') {
                    this.setBodyClass();
                    const jokeStr = data.joke;
                    console.log(jokeStr);
                    document.getElementById('joke').innerHTML = '" ' + jokeStr + ' "';
                }
                else {
                    console.log(this.errorMessage);
                }
            }
            catch (error) {
                console.log('Error ' + error);
            }
        });
        // Change shape background image
        this.setBodyClass = () => {
            const body = document.getElementsByTagName('body')[0];
            const currentClass = body.className;
            const lastChar = parseInt(currentClass.substring(currentClass.length - 1));
            let bodyClass = currentClass.substring(0, currentClass.length - 1);
            if (lastChar === 5) {
                bodyClass += '1';
            }
            else {
                bodyClass += lastChar + 1;
            }
            body.className = bodyClass;
        };
        // Set the puntuation of the joke, if the joke was in the array set the score and date
        this.setReportJokes = (score) => {
            const joke = document.getElementById('joke').innerHTML;
            const date = new Date().toISOString();
            const found = this.reportJokes.find((e) => {
                if (e.joke === joke) {
                    e.score = score;
                    e.date = date;
                    return true;
                }
                return false;
            });
            if (!found) {
                this.reportJokes.push({ joke: joke, score: score, date: date });
            }
            console.log(this.reportJokes);
        };
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
    init() {
        this.processJokeData();
        document.getElementById('btnJoke').addEventListener('click', (e) => {
            e.preventDefault();
            this.nextJokeClicks++;
            this.processJokeData();
        });
        document.getElementById('btnJokeScore1').addEventListener('click', () => this.setReportJokes(1));
        document.getElementById('btnJokeScore2').addEventListener('click', () => this.setReportJokes(2));
        document.getElementById('btnJokeScore3').addEventListener('click', () => this.setReportJokes(3));
    }
}
