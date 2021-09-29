'use strict';

// Selecting elements:
const score0El = document.getElementById('score--0'),
  score1El = document.getElementById('score--1'),
  diceEl = document.querySelector('.dice'),
  btnNew = document.querySelector('.btn--new'),
  btnRoll = document.querySelector('.btn--roll'),
  btnHold = document.querySelector('.btn--hold'),
  player0El = document.querySelector('.player--0'),
  player1El = document.querySelector('.player--1'),
  current0El = document.getElementById('current--0'),
  current1El = document.getElementById('current--1');

let scores, currentScore, activePlayer, playing;

const init = () => {
  score0El.textContent = 0;
  score1El.textContent = 0;
  diceEl.classList.add('hidden');
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;
  current0El.textContent = 0;
  current1El.textContent = 0;
  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');
  player0El.classList.add('player--active');
  player1El.classList.remove('player--active');
};

init();

const setCurScore = score => {
  document.getElementById(`current--${activePlayer}`).textContent = score;
};

const switchPlayer = () => {
  setCurScore(0);
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;

  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};

const randomInt = (min, max) =>
  Math.floor(Math.random() * (max - min + 1) + min);

// Rolling dice functionality
btnRoll.addEventListener('click', () => {
  if (!playing) return;

  const dice = randomInt(1, 6);

  diceEl.classList.remove('hidden');
  diceEl.src = `./assets/dice-${dice}.png`;

  currentScore += dice;
  setCurScore(currentScore);
  if (dice === 1) switchPlayer();
});

btnHold.addEventListener('click', () => {
  if (!playing) return;

  scores[activePlayer] += currentScore;

  document.getElementById(`score--${activePlayer}`).textContent =
    scores[activePlayer];

  if (scores[activePlayer] >= 100) {
    playing = false;
    diceEl.classList.add('hidden');

    document
      .querySelector(`.player--${activePlayer}`)
      .classList.add('player--winner');
    document
      .querySelector(`.player--${activePlayer}`)
      .classList.remove('player--active');
  } else switchPlayer();
});

btnNew.onclick = init;
