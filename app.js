// import functions and grab DOM elements
import { renderTeam } from './render-utils.js';
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




// create an array to hold on to the state of past games

let name1 = '';
let name2 =  '';
let score1 = 0;
let score2 = 0;
let pastGames = [];



nameFormButton.addEventListener('click', () => {
    // get the name data from the form
    const nameOneEl = nameOneInputEl.value;
    const nameTwoEl = nameTwoInputEl.value;

    // set the state to this data from the form
    name1 = nameOneEl;
    name2 = nameTwoEl;
    // reset the form values
    nameOneInputEl.value = '';
    nameTwoInputEl.value = '';

    // refresh the current game element with new data by calling the appropriate function
    refreshCurrentGameEl();
});


teamOneAddButton.addEventListener('click', () => {
    // increment the current state for team one's score
    score1++;
    // refresh the current game element with new data by calling the appropriate function
    refreshCurrentGameEl();


});

teamTwoAddButton.addEventListener('click', () => {
    // increment the current state for team two's score
    score2++;
    // refresh the current game element with new data by calling the appropriate function
    refreshCurrentGameEl();
});

teamOneSubtractButton.addEventListener('click', () => {
    // decrement the current state for team one's score
    if (score1 > 0) {
        score1--;
    };
    // refresh the current game element with new data by calling the appropriate function
    refreshCurrentGameEl();

});

teamTwoSubtractButton.addEventListener('click', () => {
    // decrement the current state for team two's score
    if (score2 > 0) {
        score2--;
    };
    // refresh the current game element with new data by calling the appropriate function
    refreshCurrentGameEl();
});

finishGameButton.addEventListener('click', () => {
    
    // add the current game to an array of games in state
    const gameRecord = {'name1': name1, 'name2': name2, 'score1': score1, 'score2': score2};

    // it will be helpful to keep track of these games as objects with 4 properties, one for each piece of state we're tracking
    // for example, make an object like this: { name1: 'ducks', name2: 'bears' ,score1: 1, score2: 2 } 
    // then push it to your array in state
    pastGames.push(gameRecord);
    console.log(pastGames);
    // (be sure to make a new object. do not declare the object in global scope and mutate it for reuse. This would cause difficult bugs)
    
    displayAllGames();

    // reset the state to zero and empty strings
    name1='';
    name2='';
    score1 = 0;
    score2 = 0;
    // refresh the current game element with new data by calling the appropriate function
    refreshCurrentGameEl();


});

function refreshCurrentGameEl() {
    currentGameEl.textContent = '';

    teamOneLabel.textContent = name1;
    teamTwoLabel.textContent = name2;

    // const gameEl = . . . 
    // make a new gameEl here by calling renderGame with the approriate arguments. 
    // Check the renderGame function declaration in render-utils.js to figure out the correct arguments to pass to this function 
    // In render-utils.js as yourself: How many arguments does the function take? What order does it take them in?
    const gameEl = renderGame(name1, name2, score1, score2);

    gameEl.classList.add('current');

    currentGameEl.append(gameEl);
}


function displayAllGames() {
    // clear out the past games list in the DOM
    pastGamesEl.textContent='';
    // loop through the past games in state
    
    for (let game of pastGames) {
        const pastGameEl = document.createElement('div');
        const pastTeamOneEl = document.createElement('p');
        const pastTeamTwoEl = document.createElement('p');
        const pastTeamOneScoreEl = document.createElement('p');
        const pastTeamTwoScoreEl = document.createElement('p');

        pastTeamOneEl.textContent = game.name1;
        pastTeamTwoEl.textContent = game.name2;
        pastTeamOneScoreEl.textContent = game.score1;
        pastTeamTwoScoreEl.textContent = game.score2;

        pastGameEl.classList.add('past-game');

        pastGameEl.append(pastTeamOneEl, pastTeamOneScoreEl, pastTeamTwoEl, pastTeamTwoScoreEl);
        pastGamesEl.append(pastGameEl);
    };
    // use the renderGame function to render and append a past game for each past game in state
    // again, review the renderGame function in render-utils.js. How many arguments does it take? What order does it take them in?
}
