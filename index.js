"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const api = 'https://icanhazdadjoke.com?mode=json';
const options = {
    headers: {
        'Accept': 'application/json'
    },
};
const errorMessage = 'Ha habido un error';
const elJoke = document.getElementById('joke');
const btnJoke = document.getElementById('btnJoke');
;
// Get joke from API
const getData = (api, options) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield fetch(api, options).then(response => response.json());
    return response;
});
// Show next joke 
const processData = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield getData(api, options);
        if (data.status === 200 && typeof data.joke === 'string') {
            const jokeStr = data.joke;
            console.log(jokeStr);
            elJoke.innerHTML = '" ' + jokeStr + ' "';
        }
        else {
            console.log(errorMessage);
        }
    }
    catch (error) {
        console.log('Error ' + error);
    }
});
processData();
btnJoke === null || btnJoke === void 0 ? void 0 : btnJoke.addEventListener('click', function (e) {
    e.preventDefault();
    processData();
});
let reportJokes = [];
// Set the puntuation of the joke, if the joke was in the array set the score and date
const setReportJokes = (score) => {
    const joke = elJoke.innerHTML;
    const date = new Date().toISOString();
    const found = reportJokes.find((e) => {
        if (e.joke === joke) {
            e.score = score;
            e.date = date;
            return true;
        }
        return false;
    });
    if (!found) {
        reportJokes.push({ joke: joke, score: score, date: date });
    }
    console.log(reportJokes);
};
const btnJokeScore1 = document.getElementById('btnJokeScore1');
const btnJokeScore2 = document.getElementById('btnJokeScore2');
const btnJokeScore3 = document.getElementById('btnJokeScore3');
btnJokeScore1 === null || btnJokeScore1 === void 0 ? void 0 : btnJokeScore1.addEventListener('click', function (e) {
    e.preventDefault();
    setReportJokes(1);
});
btnJokeScore2 === null || btnJokeScore2 === void 0 ? void 0 : btnJokeScore2.addEventListener('click', function (e) {
    e.preventDefault();
    setReportJokes(2);
});
btnJokeScore3 === null || btnJokeScore3 === void 0 ? void 0 : btnJokeScore3.addEventListener('click', function (e) {
    e.preventDefault();
    setReportJokes(3);
});
