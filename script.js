'use strict';

var ops = ['', '+', '-', '*', '/'];
const colors = [
  '#db5461',
  '#f5cb5c',
  '#9ee439',
  '#fe938c',
  '#d7c9aa',
  '#68edc6',
  '#2ab7ca',
];

let highscore = 0;
let result, opsPos, operator, integer1, integer2, score, color_index, playing;

//defining a function to display message in messge area
const displayMessage = function (display_message) {
  document.querySelector('.message').textContent = display_message;
};

//defining a function to change body color randomly
const changeBodyColor = function () {
  color_index = Math.floor(Math.random() * 7);
  document.querySelector('body').style.backgroundColor = colors[color_index];
};

//Defining a function to the initial value of game
const againCall = function () {
  //initial body color set to #222,initial message and guess box set to empty
  playing = true;
  document.querySelector('body').style.backgroundColor = '#222';
  displayMessage('Start Calculating...');
  document.querySelector('.result').value = '';

  //initializing maths operation randomly
  opsPos = Math.trunc(Math.random() * 4) + 1;
  operator = ops[opsPos];
  document.querySelector('.operator').textContent = operator;
  integer1 = Math.trunc(Math.random() * 20) + 1;
  document.querySelector('.integer1').textContent = integer1;
  integer2 = Math.trunc(Math.random() * 20) + 1;
  document.querySelector('.integer2').textContent = integer2;
  score = 5;

  //calculating maths operation and
  //setting them to reult variable
  //to check in further program
  switch (opsPos) {
    case 0:
      result = 0;
      break;
    case 1:
      result = integer1 + integer2;
      break;
    case 2:
      result = integer1 - integer2;
      break;
    case 3:
      result = integer1 * integer2;
      break;
    case 4:
      //storing only inteher value for division rule
      result = Math.round((integer1 / integer2) * 10) / 10;
      break;
    default:
      result = 0;
  }
};

//calling a game initially
againCall();

//if check button is clicked
document.querySelector('.check').addEventListener('click', function () {
  if (playing) {
    //defining a variable guess to store input value
    const guess = Number(document.querySelector('.result').value);

    //checking if guess is empty or not
    if (guess === '') {
      displayMessage('⛔ No number!');
      changeBodyColor();
      score--;
    }

    //if user input a number and it is correct
    else if (guess === result) {
      displayMessage('🎉 Correct Number!');
      changeBodyColor();
      highscore += score;
      document.querySelector('.highscore').textContent = highscore;

      //check if user has reached winning value
      if (highscore >= 20) {
        displayMessage('🥇 You won!');
        changeBodyColor();

        //we need to kill game here
        playing = false;
      } else {
        againCall();
      }
    }

    //if user input a number and its not correct
    else if (guess !== result) {
      //check the number of chances left
      if (score > 1) {
        displayMessage(guess > result ? '📈 Too high!' : '📉 Too low!');
        console.log(document.querySelector('.message').textContent);
        score--;
        document.querySelector('.score').textContent = score;
        changeBodyColor();
      }

      //if the number of chances not left
      else {
        displayMessage('👎 you lost the game!');
        console.log(document.querySelector('.message').textContent);
        document.querySelector('.score').textContent = 0;
        changeBodyColor();

        //we need to kill game here
        playing = false;
      }
    }
  }
});

//if again button is clicked
document.querySelector('.again').addEventListener('click', function () {
  if (playing) {
    //calling game initially
    againCall();
    document.querySelector('.score').textContent = score;
  }
});

//if restart button is clicked
document.querySelector('.between').addEventListener('click', function () {
  //calling game initially
  againCall();
  //restoring value of score=5 and highscore=0 and display them
  score = 5;
  highscore = 0;
  document.querySelector('.score').textContent = score;
  document.querySelector('.highscore').textContent = highscore;
});

//Code below this is only for instruction button
//this are constant variables for query selector
const modal = document.querySelector('.instruction');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.close-instruction');
const btnOpenModal = document.querySelector('.show-instruction');

//function for opening instruction page
const openModal = function () {
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

//function for closing instruction page
const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

//if instruction button is clicked open instruction panel
btnOpenModal.addEventListener('click', openModal);

//if close button clicked close instruction panel
btnCloseModal.addEventListener('click', closeModal);

//if outside of the box is clicked than close instruction panel
overlay.addEventListener('click', closeModal);

//if Escape key is clicked than close instruction panel
document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});
