import { renderGame } from './render-utils.js';
const currentGameEl = document.getElementById('current-game-container');
const pastGamesEl = document.getElementById('past-games-container');

const nameFormButton = document.getElementById('name-form-button');
const teamOneAddButton = document.getElementById('team-one-add-button');
const teamTwoAddButton = document.getElementById('team-two-add-button');
const teamOneSubtractButton = document.getElementById('team-one-subtract-button');
const teamTwoSubtractButton = document.getElementById('team-two-subtract-button');
const finishGameButton = document.getElementById('finish-game-button');
const teamOneLabel = document.getElementById('team-one-name');
const teamTwoLabel = document.getElementById('team-two-name');
const nameOneInputEl = document.querySelector("input[name='team-one']");
const nameTwoInputEl = document.querySelector("input[name='team-two']");

let name1 = '';
let name2 =  '';
let score1 = 0;
let score2 = 0;
let pastGames = [];

nameFormButton.addEventListener('click', () => {
    const nameOneEl = nameOneInputEl.value;
    const nameTwoEl = nameTwoInputEl.value;

    name1 = nameOneEl;
    name2 = nameTwoEl;
    
    nameOneInputEl.value = '';
    nameTwoInputEl.value = '';

    refreshCurrentGameEl();
});

teamOneAddButton.addEventListener('click', () => {
    score1++;
    refreshCurrentGameEl();
});

teamTwoAddButton.addEventListener('click', () => {
    score2++;
    refreshCurrentGameEl();
});

teamOneSubtractButton.addEventListener('click', () => {
    if (score1 > 0) {
        score1--;
    };
    refreshCurrentGameEl();
});

teamTwoSubtractButton.addEventListener('click', () => {
    if (score2 > 0) {
        score2--;
    };
    refreshCurrentGameEl();
});

finishGameButton.addEventListener('click', () => {
    
    const gameRecord = {'name1': name1, 'name2': name2, 'score1': score1, 'score2': score2};

    pastGames.push(gameRecord);
    
    displayAllGames();

    name1='';
    name2='';
    score1 = 0;
    score2 = 0;
    refreshCurrentGameEl();
});

function refreshCurrentGameEl() {
    currentGameEl.textContent = '';

    teamOneLabel.textContent = name1;
    teamTwoLabel.textContent = name2;

    const gameEl = renderGame(name1, name2, score1, score2);

    gameEl.classList.add('current');

    currentGameEl.append(gameEl);
}

function displayAllGames() {
    pastGamesEl.textContent='';
    
    for (let game of pastGames) {
        const newGameEl = renderGame(game.name1, game.name2, game.score1, game.score2);
        pastGamesEl.append(newGameEl);
    };
}
