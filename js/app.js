// * Create a list that holds all of your cards
// */
function buildDeck () {
const cardList = ["fa fa-diamond", "fa fa-paper-plane-o", "fa fa-anchor", "fa fa-bolt", "fa fa-cube", "fa fa-anchor", "fa fa-leaf", "fa fa-bicycle", "fa fa-diamond", "fa fa-bomb", "fa fa-leaf", "fa fa-bomb", "fa fa-bolt", "fa fa-bicycle", "fa fa-paper-plane-o", "fa fa-cube"];
shuffle(cardList);
//document.getElementById('arraytest').innerHTML=cardList;

for (let i = 0; i < cardList.length; i++) {
  //document.getElementById('arraytest').innerHTML+=i;
  $(".deck").append('<li class="card"><i></i></li>');
  $("body").find('i:last').addClass(cardList[i]);
}
}
buildDeck ();
/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
  let currentIndex = array.length,
    temporaryValue, randomIndex;

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}


/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */


let openCardCount = 0;
let moves = 0;
let stars = 3;
let totalMatches = 0;

//Open cards when clicked
$("li.card").click(function() {
  //let timeoutID;
  if (moves === 0) {
    timer();
  }
  if(this.className!=="card open show"){
    if (openCardCount < 2) {
    $(this).removeClass("card");
    $(this).addClass("card open show");
    openCardCount = openCardCount + 1;
    let timeoutID = window.setTimeout(cardCount, 1500);
    }
  }
});

//Restart game on click
$(".fa-repeat").click(function() {
  restartGame();
});

//Count open cards and total moves
function cardCount() {
  if (openCardCount === 2) {
    moveCounter();
    checkMatch();
    $('li').removeClass('card open show').addClass('card');
    openCardCount = 0;
  }
}

//Check if cards match and counts total matches
function checkMatch() {
  let deck = document.querySelector('.deck');
  let openCard = deck.querySelectorAll('.show > i');
  let x = openCard[0].className;
  let y = openCard[1].className;

  if (x === y) {
    $(".open").removeClass("open");
    $(".show").addClass("match");
    totalMatches++
    gameCompleted();
  }
}

//Counts total moves and changes stars rating based on the total moves
function moveCounter() {
  moves += 1;
  moveField = document.getElementsByClassName("moves");
  moveField[0].innerHTML = moves;

  if (moves === 16) {
    let starList = document.querySelectorAll('.fa-star');
    let star1 = starList[2];
    star1.style.color = "black";
    stars--
  } else if (moves === 24) {
    let starList = document.querySelectorAll('.fa-star');
    let star2 = starList[1];
    star2.style.color = "black";
    stars--
  }
}

//Show modal box when game completed
function gameCompleted() {
  if (totalMatches === 8) {
    stopTimer();
    modal.style.display = "block";
    document.getElementById('modalText').innerHTML = "Game finished, congratulations!\n " + "  ";
    $("#modalText").append('<i class="fa fa-sign-language"></i>');
    document.getElementById('modalText1').innerHTML = "Your rating is: " +
      stars + " star(s)\n";
    document.getElementById('modalText2').innerHTML = "Total time: " + dHour + hour + ":" +
      dMin + min + ":" + dSec + sec + "";
    document.getElementById('modalText3').innerHTML = 'If you want to play again click "Restart"' + "!";
  }
}

//Reload game
function restartGame() {
  location.reload();
}

//Timer
let sec = 0;
let dSec = 0;
let min = 0;
let dMin = 0;
let hour = 0;
let dHour = 0;
let timerOn = 0;
let timerid = "";

function timer() {
  if (timerOn === 0) {
    timerid = setInterval(addSec, 1000);
  }
  timerOn++;

}

function stopTimer() {
  clearInterval(timerid);
}

function addSec() {
  let time = "Time: " + dHour + hour + ":" + dMin + min + ":" + dSec + sec;

  if (sec < 9) {
    sec++
    document.getElementById("timer").innerHTML = time;
  } else if (sec === 9) {

    if (dSec < 5) {
      sec = 0;
      dSec++
      document.getElementById("timer").innerHTML = time;
    } else if (dSec === 5) {
      if (min < 9) {
        sec = 0;
        dSec = 0;
        min++;
        document.getElementById("timer").innerHTML = time;
      } else if (min === 9) {
        sec = 0;
        dSec = 0;
        min = 0;
        dMin++
      }
    }
  }
}


// Get the modal
let modal = document.getElementById('myModal');

// Get the button that opens the modal
let btn = document.getElementById("myBtn");

// Get the <span> element that closes the modal
let close = document.getElementsByClassName("close")[0];

//Get the restart button
let restartBtn = document.getElementById("restartButton");

// When the user clicks on <span> (x), close the modal
close.onclick = function() {
  modal.style.display = "none";
}

// When clicked the restart button restart game
restartBtn.onclick = function() {
  restartGame();
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}
