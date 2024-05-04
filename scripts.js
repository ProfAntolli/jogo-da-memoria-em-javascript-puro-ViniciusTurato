const cards = document.querySelectorAll ('.carta');

let hasFlippedCard = false;
let lockboard = false;
let firstCard, secondCard;

function flipCard() {
  if (lockboard) return;
  if (this === firstCard) return;

  this.classList.toggle('flip');

  if (!hasFlippedCard) {
      //primeiro click
    hasFlippedCard = true;
    firstCard = this;
    return; //remove a necessidade do else
  }
    //segundo click
    secondCard = this;
  
    checkForMatch();
}

function checkForMatch() {
  // são iguais?
  let isMatch =(firstCard.dataset.framework === 
    secondCard.dataset.framework)
  //mais rapido que um bloco de if else
    isMatch ? disableCards(): unflipCards();

}

function disableCards(){
  firstCard.removeEventListener('click', flipCard);
  secondCard.removeEventListener('click', flipCard);

  resetBoard();
}

function unflipCards (){
  lockboard = true;
  
  setTimeout(() => {
    firstCard.classList.remove('flip');
    secondCard.classList.remove('flip');
    resetBoard();
    }, 1500);
}

function resetBoard() {
  [hasFlippedCard, lockboard] = [false, false];
  [firstCard, secondCard] = [null, null];
}

(function shuffle() {
   cards.forEach(card => {
    let randomPos = Math.floor(Math.random() * 12);
    card.style.order = randomPos;
   })
})(); //ao colocar a função em parenteses, ela é carregada com prioridade
  

cards.forEach(card => card.addEventListener('click', flipCard));