const moves = ['rock', 'paper', 'scissors']

function getRandomMove() {
  const randomIndex = Math.floor(Math.random() * moves.length);
  return moves[randomIndex];
}

let score = JSON.parse(localStorage.getItem('score')) || {
  wins: 0,
  losses: 0,
  ties: 0
};

document.querySelector('.reset-score-js').addEventListener('click', () => {
  resetScore()
})

function resetScore(){
  const message = document.querySelector('.confirmation-msg-js')
  message.innerHTML = `<p>Are you sure you want to reset the score?</p> <button class="yes-reset-btn yes-btn">Yes</button> <button class="no-reset-btn no-btn">No</button>`

  const yesBtn = document.querySelector('.yes-reset-btn');
  const noBtn = document.querySelector('.no-reset-btn');

  yesBtn.addEventListener('click', () => {
    score.wins = 0;
    score.losses = 0;
    score.ties = 0;
    localStorage.removeItem('score');

    updateScore();
    message.innerHTML = ''
  })

  noBtn.addEventListener('click', () => {
    message.innerHTML = ''
  })

  /* score.wins = 0;
  score.losses = 0;
  score.ties = 0;
  localStorage.removeItem('score');
  updateScore(); */
}

updateScore()

let isAutoPlaying = false;
let intervalId;

//const autoPlay = () => {}

document.querySelector('.auto-play-js').addEventListener('click', () => {
  autoPlay()
})

function autoPlay(){
  if(!isAutoPlaying){
  intervalId = setInterval(() =>{
      const playerMove = getRandomMove();
      playGame(playerMove);
    }, 1000);  
    isAutoPlaying = true;
    document.querySelector('.auto-play-js').innerHTML = "Stop Game"
  }else{
   clearInterval(intervalId);
   isAutoPlaying = false; 
   document.querySelector('.auto-play-js').innerHTML = "Auto Play"
  }
  
}

document.querySelector('.rock-js-btn').addEventListener('click', () => {
  playGame('rock')
})
document.querySelector('.paper-js-btn').addEventListener('click', () => {
  playGame('paper')
})
document.querySelector('.scissors-js-btn').addEventListener('click', () => {
  playGame('scissors')
})

document.body.addEventListener('keydown', (event) => {
   if(event.key === 'r'){
    playGame('rock');
   }else if(event.key === 'p'){
    playGame('paper');
   }else if(event.key === 's'){
    playGame('scissors')
   }else if(event.key === 'a'){
    autoPlay()
   }else if(event.key === 'Backspace'){
    resetScore()
   }
})

function playGame(playerMove){
  const computerMove = getRandomMove()
  
    let result = ''
    if (playerMove === 'scissors') {
      if (computerMove === 'rock') {
        result = 'You lose.';
      } else if (computerMove === 'paper') {
        result = 'You win.';
      } else if (computerMove === 'scissors') {
        result = 'Tie.';
      }
  
    } else if (playerMove === 'paper') {
      if (computerMove === 'rock') {
        result = 'You win.';
      } else if (computerMove === 'paper') {
        result = 'Tie.';
      } else if (computerMove === 'scissors') {
        result = 'You lose.';
      }
      
    } else if (playerMove === 'rock') {
      if (computerMove === 'rock') {
        result = 'Tie.';
      } else if (computerMove === 'paper') {
        result = 'You lose.';
      } else if (computerMove === 'scissors') {
        result = 'You win.';
      }
    }

    if(result === 'You win.'){
      score.wins += 1;
    }else if(result === 'You lose.'){
      score.losses += 1;
    }else{
      score.ties += 1;
    }

    localStorage.setItem('score', JSON.stringify(score))
  
    updateScore()

    document.querySelector('.final').innerText = `${result}`
    document.querySelector('.moves').innerHTML = `You <img src="img/${playerMove}.png">  Computer <img src="img/${computerMove}.png">`


      
 
 /*    alert(`You picked ${playerMove}. Computer picked ${computerMove}. ${result}
Wins: ${score.wins} Losses: ${score.losses} Ties: ${score.ties}`); */

  }


  
  function updateScore(){
    document.querySelector('.score').innerHTML = `Wins: ${score.wins} Losses: ${score.losses} Ties: ${score.ties}`;

   }
  
        
  