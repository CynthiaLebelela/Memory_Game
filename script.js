// Only 2 pairs of matching numbers
const cards = ["K", "P", "C", ,"D", "B", "J", "S", "G", "S", "C", "K", "B", "P", "D", ,"J", "G"];


// Shuffle the cards randomly
cards.sort(() => Math.random() - 0.5);

const grid = document.getElementById('grid');
const congrats = document.getElementById('congrats');

let firstCard = null;
let secondCard = null;
let lockBoard = false;
let matchedPairs = 0;
const totalPairs = 8;

cards.forEach((emoji, index) => {
  const block = document.createElement('div');
  block.classList.add('block');
  block.dataset.index = index;
  block.dataset.value = emoji;

  block.addEventListener('click', () => {
    // Block if board is locked, same block clicked, or already matched
    if (
      lockBoard ||
      block.classList.contains('matched') ||
      block === firstCard
    ) {
      return;
    }

    block.textContent = emoji;
    block.classList.add('revealed');

    if (!firstCard) {
      firstCard = block;
    } else {
      secondCard = block;
      lockBoard = true;

      // Check if the emojis match
      if (firstCard.dataset.value === secondCard.dataset.value) {
        firstCard.classList.add('matched');
        secondCard.classList.add('matched');
        matchedPairs++;

        resetTurn();

        // Check if all pairs are matched
       if (matchedPairs === totalPairs) {
        setTimeout(() => {
        grid.style.display = 'none'; // hide the grid
        congrats.style.display = 'block'; // show congrats + balloons
        }, 800);
      }

      } else {
        setTimeout(() => {
          firstCard.textContent = '';
          secondCard.textContent = '';
          firstCard.classList.remove('revealed');
          secondCard.classList.remove('revealed');
          resetTurn();
        }, 1000);
      }
    }
  });

  grid.appendChild(block);
});

function resetTurn() {
  [firstCard, secondCard] = [null, null];
  lockBoard = false;
}