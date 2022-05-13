const p1 = {
  button: document.querySelector('#pl1Button'),
  display: document.querySelector('#pl1Display'),
  score: 0,
}

const p2 = {
  button: document.querySelector('#pl2Button'),
  display: document.querySelector('#pl2Display'),
  score: 0,
}

const resetButton = document.querySelector('#reset');
const scoreSelect = document.querySelector('#scoreSelect');
let winningScore = parseInt(scoreSelect.value);
isGameOver = false;
const tie = document.createElement('p');
const tiediv = document.querySelector('#tie')
tie.textContent = "Tie break to";

function updateScore(player, opponent) {
  if (!isGameOver) {
    player.score++;
    if (player.score === opponent.score && winningScore - player.score === 1) {
      winningScore++;
      tie.textContent = `Tie break to ${winningScore}`;
      tiediv.appendChild(tie);
    }
    if (player.score === winningScore) {
      isGameOver = true;
      player.display.classList.add('has-text-success');
      opponent.display.classList.add('has-text-danger');
      player.button.disabled = true;
      opponent.button.disabled = true;
      if (tiediv.firstElementChild !== null) {
        tie.textContent = 'Tie break to';
        tiediv.removeChild(tie);
      }
    }
    player.display.textContent = player.score;
  }
}


pl1Button.addEventListener('click', function () {
  updateScore(p1, p2);
})

pl2Button.addEventListener('click', function () {
  updateScore(p2, p1)
})


resetButton.addEventListener('click', reset);

scoreSelect.addEventListener('change', function () {
  winningScore = parseInt(this.value);
  reset();
})

function reset() {
  isGameOver = false;
  winningScore = parseInt(scoreSelect.value);
  if (tiediv.firstElementChild !== null) {
    tie.textContent = 'Tie break to';
    tiediv.removeChild(tie);
  }
  for (p of [p1, p2]) {
    p.score = 0;
    p.display.textContent = p.score;
    p.display.classList.remove('has-text-success', 'has-text-danger');
    p.button.disabled = false;
  }
}