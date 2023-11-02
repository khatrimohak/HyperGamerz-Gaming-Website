var IMAGE_WIDTH = 64;
var IMAGE_HEIGHT = 64;
var BOARD_SIZE = 450;
var pokemon = [
  "Alakazam",
  "Poliwrath",
  "Charizard",
  "Onix",
  "Rapidash",
  "Blastoise",
  "Lapras",
  "Lugia",
  "Pidgeotto",
  "Raichu",
  "Golem",
  "Machamp",
];
var Number_of_pokemons = 5;
var level = 1;

var theLeftSide = document.getElementById("leftSide");
var theRightSide = document.getElementById("rightSide");

var boardContainer = document.getElementById("board-container");

boardContainer.onclick = function gameOver() {
  const gameOverDisplay = document.createElement("div");
  const gameOverBtn = document.createElement("button");

  gameOverBtn.innerHTML = "Retry";

  gameOverDisplay.appendChild(gameOverBtn);
  gameOverBtn.onclick = () => {
    window.location.reload();
  };
  gameOverDisplay.classList.add("gameover");

  document.querySelector("body").appendChild(gameOverDisplay);
  boardContainer.onclick = null;
  theLeftSide.lastChild.onclick = null;
};

function generatePokemons() {
  document.getElementById("level").innerHTML = "Level " + level;
  for (var i = 1; i <= Number_of_pokemons; i++) {
    var anImg = document.createElement("img");

    var randTop = Math.floor(Math.random() * (BOARD_SIZE - IMAGE_HEIGHT));
    var randLeft = Math.floor(Math.random() * (BOARD_SIZE - IMAGE_WIDTH));

    var randPoke = Math.floor(Math.random() * 12);

    anImg.src = "images/" + pokemon[randPoke] + ".png";
    anImg.style.top = randTop + "px";
    anImg.style.left = randLeft + "px";

    theLeftSide.appendChild(anImg);
  }

  var leftSideImages = theLeftSide.cloneNode(true);
  leftSideImages.removeChild(leftSideImages.lastChild);

  theRightSide.appendChild(leftSideImages);

  theLeftSide.lastChild.onclick = function nextLevel(event) {
    event.stopPropagation();
    removeChildren(theLeftSide);
    removeChildren(theRightSide);
    level++;

    if (level % 2 == 0) Number_of_pokemons += 2;
    else if (level % 5 == 0) Number_of_pokemons += 5;
    else {
      Number_of_pokemons += 3;
    }
    generatePokemons();
  };
}

function removeChildren(parentNode) {
  while (parentNode.firstChild) {
    parentNode.removeChild(parentNode.firstChild);
  }
}
