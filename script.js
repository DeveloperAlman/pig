'use strict';

//Selecting Elements
const score0 = document.querySelector('#score--0');
const score1 = document.getElementById('score--1');
const player0 = document.querySelector('.player--0');
const player1 = document.querySelector('.player--1');
const name0 = document.querySelector('#name--0');
const name1 = document.querySelector('#name--1');
const current0 = document.querySelector('#current--0');
const current1 = document.querySelector('#current--1');
const diceElement = document.querySelector('.dice');
const btnNewGame = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.close-modal');
const btnsOpenModal = document.querySelectorAll('.show-modal');
const gameWinner = document.querySelector('.modal__winner');

const openModal = function () {
    modal.classList.remove('hidden');
    overlay.classList.remove('hidden');
};

const closeModal = function () {
    modal.classList.add('hidden');
    overlay.classList.add('hidden');
};

for (let i = 0; i < btnsOpenModal.length; i++)
    btnsOpenModal[i].addEventListener('click', openModal);

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
    // console.log(e.key);

    if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
        closeModal();
    }
});
const nickname1 = prompt("Nickname: Player 1");
const nickname2 = prompt("Nickname: Player 2");
name0.textContent = nickname1;
name1.textContent = nickname2;

//Starting point
let scores = [0, 0];
score0.textContent = 0;
score1.textContent = 0;
let currentScore = 0;
let activePlayer = 0;
diceElement.classList.add('hidden');
btnNewGame.style.display = 'none';

const Switch = function () {
    document.getElementById(`current--${activePlayer}`).textContent = 0;
    activePlayer = activePlayer === 0 ? 1 : 0;
    currentScore = 0;
    player0.classList.toggle('player--active');
    player1.classList.toggle('player--active');
}

//Rolling Dice Functionality
btnRoll.addEventListener('click', function () {
    //1. Random Dice
    const dice = Math.trunc(Math.random() * 6) + 1;
    //2. Display Dice
    diceElement.src = `dice-${dice}.png`;
    diceElement.classList.remove('hidden');

    //3.Check for role, if true, then switch the player
    if (dice !== 1) {
        //Add dice to current score
        currentScore += dice;
        document.getElementById(`current--${activePlayer}`).textContent = currentScore;
    } else {
        //Next Player
        Switch();
    }
});

btnHold.addEventListener('click', function () {
    //1. Add current score of a player
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent = scores[activePlayer];
    //2.Check score if it is 100
    if (scores[activePlayer] >= 100) {
        //Finish the game
        document.querySelector(`.player--${activePlayer}`).classList.add('player--winner');
        document.querySelector(`.player--${activePlayer}`).classList.remove('player--active');
        btnRoll.style.display = "none";
        btnHold.style.display = "none";
        btnNewGame.style.display = "block";
        modal.classList.remove('hidden');
        overlay.classList.remove('hidden');
        gameWinner.textContent = `Game Over!`;
    } else {
        //3. Switch to next player
        Switch();
    }
});
const init = function init() {
    scores = [0, 0];
    score0.textContent = 0;
    score1.textContent = 0;
    current0.textContent = 0;
    current1.textContent = 0;
    currentScore = 0;
    activePlayer = 0;
    player0.classList.remove('player--winner');
    player1.classList.remove('player--winner');
    player0.classList.add('player--active');
    player1.classList.remove('player--active');
    btnRoll.style.display = "block";
    btnHold.style.display = "block";
    btnNewGame.style.display = "none";
    diceElement.classList.add('hidden');
};
init();
btnNewGame.addEventListener('click', init);