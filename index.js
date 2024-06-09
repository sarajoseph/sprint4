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
const getData = (api, options) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield fetch(api, options).then(response => response.json());
    return response;
});
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
    // Llamar a la API, mostrar siguiente chiste y también mostrarlo por consola
    e.preventDefault();
    processData();
});
