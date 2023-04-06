const cells = document.querySelectorAll(".grid-container > div");
const cellArray = new Array(9).fill("empty");
const newGameButton = document.querySelector(".newgame");
const winnerElement = document.querySelector(".winner");
const easyButton = document.querySelector("#easy");
const mediumButton = document.querySelector("#medium");
const hardButton = document.querySelector("#hard");
let player = "x";
let level = "easy";
let easyUsedIndicator = false;

easyButton.addEventListener(
  "click",
  function () {
    level = "easy";
    this.style.backgroundColor = "#eac39f";
    hardButton.style.backgroundColor = "#ff944a";
    mediumButton.style.backgroundColor = "#ff944a";
  },
  false
);

mediumButton.addEventListener(
  "click",
  function () {
    level = "medium";
    this.style.backgroundColor = "#eac39f";
    hardButton.style.backgroundColor = "#ff944a";
    easyButton.style.backgroundColor = "#ff944a";
  },
  false
);

hardButton.addEventListener(
  "click",
  function () {
    level = "hard";
    this.style.backgroundColor = "#eac39f";
    easyButton.style.backgroundColor = "#ff944a";
    mediumButton.style.backgroundColor = "#ff944a";
  },
  false
);

newGameButton.addEventListener(
  "click",
  () => {
    cellArray.fill("empty");
    player = "x";
    winnerElement.innerHTML = "Tic-Tac-Toe";
    newGameButton.classList.remove("visible");
    easyUsedIndicator = false;

    for (const cell of cells) {
      cell.innerHTML = null;
    }

    easyButton.style.visibility = "visible";
    mediumButton.style.visibility = "visible";
    hardButton.style.visibility = "visible";
  },
  false
);

const theWinner = () => {
  winnerElement.textContent = player;
};

for (let cell of cells) {
  cell.addEventListener(
    "mouseup",
    () => {
      newGameButton.classList.add("visible");

      if (level === "easy") {
        mediumButton.style.visibility = "hidden";
        hardButton.style.visibility = "hidden";
      } else if (level === "medium") {
        easyButton.style.visibility = "hidden";
        hardButton.style.visibility = "hidden";
      } else if (level === "hard") {
        easyButton.style.visibility = "hidden";
        mediumButton.style.visibility = "hidden";
      }

      if (player === "x") {
        if (!cell.hasChildNodes()) {
          const playerImageX = document.createElement("img");
          playerImageX.setAttribute("src", "./gfx/x.png");
          playerImageX.setAttribute("alt", "X");
          cell.appendChild(playerImageX);
          player = "o";

          let id = cell.getAttribute("id");
          cellArray[id] = "X";

          checkWinner();
        }
      }
    },
    false
  );
}

function checkWinner() {
  const playerXWon = "You won!";
  const playerOWon = "You lost!";

  switch (true) {
    case cellArray[0] === "X" && cellArray[1] === "X" && cellArray[2] === "X":
      player = playerXWon;
      theWinner();
      break;
    case cellArray[3] === "X" && cellArray[4] === "X" && cellArray[5] === "X":
      player = playerXWon;
      theWinner();
      break;
    case cellArray[6] === "X" && cellArray[7] === "X" && cellArray[8] === "X":
      player = playerXWon;
      theWinner();
      break;
    case cellArray[0] === "X" && cellArray[3] === "X" && cellArray[6] === "X":
      player = playerXWon;
      theWinner();
      break;
    case cellArray[1] === "X" && cellArray[4] === "X" && cellArray[7] === "X":
      player = playerXWon;
      theWinner();
      break;
    case cellArray[2] === "X" && cellArray[5] === "X" && cellArray[8] === "X":
      player = playerXWon;
      theWinner();
      break;
    case cellArray[0] === "X" && cellArray[4] === "X" && cellArray[8] === "X":
      player = playerXWon;
      theWinner();
      break;
    case cellArray[2] === "X" && cellArray[4] === "X" && cellArray[6] === "X":
      player = playerXWon;
      theWinner();
      break;
    /*-----------------------------------------------*/
    case cellArray[0] === "O" && cellArray[1] === "O" && cellArray[2] === "O":
      player = playerOWon;
      theWinner();
      break;
    case cellArray[3] === "O" && cellArray[4] === "O" && cellArray[5] === "O":
      player = playerOWon;
      theWinner();
      break;
    case cellArray[6] === "O" && cellArray[7] === "O" && cellArray[8] === "O":
      player = playerOWon;
      theWinner();
      break;
    case cellArray[0] === "O" && cellArray[3] === "O" && cellArray[6] === "O":
      player = playerOWon;
      theWinner();
      break;
    case cellArray[1] === "O" && cellArray[4] === "O" && cellArray[7] === "O":
      player = playerOWon;
      theWinner();
      break;
    case cellArray[2] === "O" && cellArray[5] === "O" && cellArray[8] === "O":
      player = playerOWon;
      theWinner();
      break;
    case cellArray[0] === "O" && cellArray[4] === "O" && cellArray[8] === "O":
      player = playerOWon;
      theWinner();
      break;
    case cellArray[2] === "O" && cellArray[4] === "O" && cellArray[6] === "O":
      player = playerOWon;
      theWinner();
      break;
    /*-----------------------------------------------*/
    case cellArray.every((element) => {
      return element !== "empty";
    }):
      player = "Draw!";
      theWinner();
      break;
    default:
      if (level === "easy") {
        setTimeout(computersTurnEasy, 300);
      } else if (level === "medium") {
        setTimeout(computersTurnMedium, 300);
      } else if (level === "hard") {
        setTimeout(computersTurnHard, 300);
      }

      const playerImageO = document.createElement("img");
      playerImageO.setAttribute("src", "./gfx/o.png");
      playerImageO.setAttribute("alt", "O");

      function doStuffOnComputersTurn(cellNumber) {
        cells[cellNumber].appendChild(playerImageO);
        player = "x";
        cellArray[cellNumber] = "O";
        checkWinner();
      }

      function computersTurnEasy() {
        if (player === "o") {
          let rdmNumber = Math.floor(Math.random() * 9);
          if (!cells[rdmNumber].hasChildNodes()) {
            doStuffOnComputersTurn(rdmNumber);
          } else {
            computersTurnEasy();
          }
        }
      }

      function computersTurnMedium() {
        if (player === "o") {
          if (easyUsedIndicator === false) {
            easyUsedIndicator = true;
            computersTurnEasy();
          } else {
            mediumWinningCombinations();
          }

          function mediumWinningCombinations() {
            switch (true) {
              case cellArray[0] === "O" &&
                cellArray[1] === "O" &&
                cellArray[2] === "empty":
                doStuffOnComputersTurn(2);
                break;

              case cellArray[0] === "empty" &&
                cellArray[1] === "O" &&
                cellArray[2] === "O":
                doStuffOnComputersTurn(0);
                break;

              case cellArray[0] === "O" &&
                cellArray[1] === "empty" &&
                cellArray[2] === "O":
                doStuffOnComputersTurn(1);
                break;

              case cellArray[3] === "O" &&
                cellArray[4] === "O" &&
                cellArray[5] === "empty":
                doStuffOnComputersTurn(5);
                break;

              case cellArray[3] === "empty" &&
                cellArray[4] === "O" &&
                cellArray[5] === "O":
                doStuffOnComputersTurn(3);
                break;

              case cellArray[3] === "O" &&
                cellArray[4] === "empty" &&
                cellArray[5] === "O":
                doStuffOnComputersTurn(4);
                break;

              case cellArray[6] === "O" &&
                cellArray[7] === "O" &&
                cellArray[8] === "empty":
                doStuffOnComputersTurn(8);
                break;

              case cellArray[6] === "empty" &&
                cellArray[7] === "O" &&
                cellArray[8] === "O":
                doStuffOnComputersTurn(6);
                break;

              case cellArray[6] === "O" &&
                cellArray[7] === "empty" &&
                cellArray[8] === "O":
                doStuffOnComputersTurn(7);
                break;

              case cellArray[0] === "O" &&
                cellArray[3] === "O" &&
                cellArray[6] === "empty":
                doStuffOnComputersTurn(6);
                break;

              case cellArray[0] === "empty" &&
                cellArray[3] === "O" &&
                cellArray[6] === "O":
                doStuffOnComputersTurn(0);
                break;

              case cellArray[0] === "O" &&
                cellArray[3] === "empty" &&
                cellArray[6] === "O":
                doStuffOnComputersTurn(3);
                break;

              case cellArray[1] === "O" &&
                cellArray[4] === "O" &&
                cellArray[7] === "empty":
                doStuffOnComputersTurn(7);
                break;

              case cellArray[1] === "empty" &&
                cellArray[4] === "O" &&
                cellArray[7] === "O":
                doStuffOnComputersTurn(1);
                break;

              case cellArray[1] === "O" &&
                cellArray[4] === "empty" &&
                cellArray[7] === "O":
                doStuffOnComputersTurn(4);
                break;

              case cellArray[2] === "O" &&
                cellArray[5] === "O" &&
                cellArray[8] === "empty":
                doStuffOnComputersTurn(8);
                break;

              case cellArray[2] === "empty" &&
                cellArray[5] === "O" &&
                cellArray[8] === "O":
                doStuffOnComputersTurn(2);
                break;

              case cellArray[2] === "O" &&
                cellArray[5] === "empty" &&
                cellArray[8] === "O":
                doStuffOnComputersTurn(5);
                break;

              case cellArray[0] === "O" &&
                cellArray[4] === "O" &&
                cellArray[8] === "empty":
                doStuffOnComputersTurn(8);
                break;

              case cellArray[0] === "O" &&
                cellArray[4] === "empty" &&
                cellArray[8] === "O":
                doStuffOnComputersTurn(4);
                break;

              case cellArray[0] === "empty" &&
                cellArray[4] === "O" &&
                cellArray[8] === "O":
                doStuffOnComputersTurn(0);
                break;

              case cellArray[2] === "O" &&
                cellArray[4] === "O" &&
                cellArray[6] === "empty":
                doStuffOnComputersTurn(6);
                break;

              case cellArray[2] === "O" &&
                cellArray[4] === "empty" &&
                cellArray[6] === "O":
                doStuffOnComputersTurn(4);
                break;

              case cellArray[2] === "empty" &&
                cellArray[4] === "O" &&
                cellArray[6] === "O":
                doStuffOnComputersTurn(2);
                break;

              default:
                computersTurnHard();
                break;
            }
          }
        }
      }

      function computersTurnHard() {
        if (player === "o") {
          switch (true) {
            case cellArray[4] === "empty" &&
              cellArray.filter((el) => el === "empty").length === 8:
              doStuffOnComputersTurn(4);
              break;

            // Case cellArray[4] === 'O' START
            case cellArray[4] === "O" &&
              cellArray[0] === "X" &&
              cellArray[1] === "X" &&
              cellArray.filter((el) => el === "empty").length === 6:
              doStuffOnComputersTurn(2);
              break;

            case cellArray[4] === "O" &&
              cellArray[0] === "X" &&
              cellArray[1] === "X" &&
              cellArray[6] === "X" &&
              cellArray[2] === "O" &&
              cellArray.filter((el) => el === "empty").length === 4:
              doStuffOnComputersTurn(3);
              break;

            case cellArray[4] === "O" &&
              cellArray[0] === "X" &&
              cellArray[1] === "X" &&
              cellArray[6] === "empty" &&
              cellArray[2] === "O" &&
              cellArray.filter((el) => el === "empty").length === 4:
              doStuffOnComputersTurn(6);
              break;

            case cellArray[4] === "O" &&
              cellArray[0] === "X" &&
              cellArray[1] === "X" &&
              cellArray[6] === "X" &&
              cellArray[5] === "X" &&
              cellArray[2] === "O" &&
              cellArray[3] === "O" &&
              cellArray.filter((el) => el === "empty").length === 2:
              doStuffOnComputersTurn(8);
              break;

            case cellArray[4] === "O" &&
              cellArray[0] === "X" &&
              cellArray[1] === "X" &&
              cellArray[6] === "X" &&
              cellArray[5] === "empty" &&
              cellArray[2] === "O" &&
              cellArray[3] === "O" &&
              cellArray.filter((el) => el === "empty").length === 2:
              doStuffOnComputersTurn(5);
              break;

            //
            case cellArray[4] === "O" &&
              cellArray[1] === "X" &&
              cellArray[2] === "X" &&
              cellArray.filter((el) => el === "empty").length === 6:
              doStuffOnComputersTurn(0);
              break;

            case cellArray[4] === "O" &&
              cellArray[1] === "X" &&
              cellArray[2] === "X" &&
              cellArray[8] === "X" &&
              cellArray[0] === "O" &&
              cellArray.filter((el) => el === "empty").length === 4:
              doStuffOnComputersTurn(5);
              break;

            case cellArray[4] === "O" &&
              cellArray[1] === "X" &&
              cellArray[2] === "X" &&
              cellArray[8] === "empty" &&
              cellArray[0] === "O" &&
              cellArray.filter((el) => el === "empty").length === 4:
              doStuffOnComputersTurn(8);
              break;

            case cellArray[4] === "O" &&
              cellArray[1] === "X" &&
              cellArray[2] === "X" &&
              cellArray[8] === "X" &&
              cellArray[3] === "X" &&
              cellArray[0] === "O" &&
              cellArray[5] === "O" &&
              cellArray.filter((el) => el === "empty").length === 2:
              doStuffOnComputersTurn(6);
              break;

            case cellArray[4] === "O" &&
              cellArray[1] === "X" &&
              cellArray[2] === "X" &&
              cellArray[8] === "X" &&
              cellArray[3] === "empty" &&
              cellArray[0] === "O" &&
              cellArray[5] === "O" &&
              cellArray.filter((el) => el === "empty").length === 2:
              doStuffOnComputersTurn(3);
              break;

            //
            case cellArray[4] === "O" &&
              cellArray[2] === "X" &&
              cellArray[3] === "X" &&
              cellArray.filter((el) => el === "empty").length === 6:
              doStuffOnComputersTurn(0);
              break;

            case cellArray[4] === "O" &&
              cellArray[2] === "X" &&
              cellArray[3] === "X" &&
              cellArray[8] === "empty" &&
              cellArray[0] === "O" &&
              cellArray.filter((el) => el === "empty").length === 4:
              doStuffOnComputersTurn(8);
              break;

            case cellArray[4] === "O" &&
              cellArray[2] === "X" &&
              cellArray[3] === "X" &&
              cellArray[8] === "X" &&
              cellArray[0] === "O" &&
              cellArray.filter((el) => el === "empty").length === 4:
              doStuffOnComputersTurn(5);
              break;

            case cellArray[4] === "O" &&
              cellArray[2] === "X" &&
              cellArray[3] === "X" &&
              cellArray[8] === "X" &&
              cellArray[1] === "X" &&
              cellArray[0] === "O" &&
              cellArray[5] === "O" &&
              cellArray.filter((el) => el === "empty").length === 2:
              doStuffOnComputersTurn(6);
              break;

            case cellArray[4] === "O" &&
              cellArray[2] === "X" &&
              cellArray[3] === "X" &&
              cellArray[8] === "X" &&
              cellArray[6] === "X" &&
              cellArray[0] === "O" &&
              cellArray[5] === "O" &&
              cellArray.filter((el) => el === "empty").length === 2:
              doStuffOnComputersTurn(7);
              break;

            case cellArray[4] === "O" &&
              cellArray[2] === "X" &&
              cellArray[3] === "X" &&
              cellArray[8] === "X" &&
              cellArray[7] === "X" &&
              cellArray[0] === "O" &&
              cellArray[5] === "O" &&
              cellArray.filter((el) => el === "empty").length === 2:
              doStuffOnComputersTurn(6);
              break;

            //
            case cellArray[4] === "O" &&
              cellArray[3] === "X" &&
              cellArray[5] === "X" &&
              cellArray.filter((el) => el === "empty").length === 6:
              doStuffOnComputersTurn(8);
              break;

            case cellArray[4] === "O" &&
              cellArray[3] === "X" &&
              cellArray[5] === "X" &&
              cellArray[0] === "empty" &&
              cellArray[8] === "O" &&
              cellArray.filter((el) => el === "empty").length === 4:
              doStuffOnComputersTurn(0);
              break;

            case cellArray[4] === "O" &&
              cellArray[3] === "X" &&
              cellArray[5] === "X" &&
              cellArray[0] === "X" &&
              cellArray[8] === "O" &&
              cellArray.filter((el) => el === "empty").length === 4:
              doStuffOnComputersTurn(6);
              break;

            case cellArray[4] === "O" &&
              cellArray[3] === "X" &&
              cellArray[5] === "X" &&
              cellArray[0] === "X" &&
              cellArray[2] === "empty" &&
              cellArray[6] === "O" &&
              cellArray[8] === "O" &&
              cellArray.filter((el) => el === "empty").length === 2:
              doStuffOnComputersTurn(2);
              break;

            case cellArray[4] === "O" &&
              cellArray[3] === "X" &&
              cellArray[5] === "X" &&
              cellArray[0] === "X" &&
              cellArray[7] === "empty" &&
              cellArray[6] === "O" &&
              cellArray[8] === "O" &&
              cellArray.filter((el) => el === "empty").length === 2:
              doStuffOnComputersTurn(7);
              break;

            //
            case cellArray[4] === "O" &&
              cellArray[5] === "X" &&
              cellArray[6] === "X" &&
              cellArray.filter((el) => el === "empty").length === 6:
              doStuffOnComputersTurn(8);
              break;

            case cellArray[4] === "O" &&
              cellArray[5] === "X" &&
              cellArray[6] === "X" &&
              cellArray[0] === "empty" &&
              cellArray[8] === "O" &&
              cellArray.filter((el) => el === "empty").length === 4:
              doStuffOnComputersTurn(0);
              break;

            case cellArray[4] === "O" &&
              cellArray[5] === "X" &&
              cellArray[6] === "X" &&
              cellArray[0] === "X" &&
              cellArray[8] === "O" &&
              cellArray.filter((el) => el === "empty").length === 4:
              doStuffOnComputersTurn(3);
              break;

            case cellArray[4] === "O" &&
              cellArray[5] === "X" &&
              cellArray[6] === "X" &&
              cellArray[0] === "X" &&
              cellArray[2] === "X" &&
              cellArray[3] === "O" &&
              cellArray[8] === "O" &&
              cellArray.filter((el) => el === "empty").length === 2:
              doStuffOnComputersTurn(1);
              break;

            case cellArray[4] === "O" &&
              cellArray[5] === "X" &&
              cellArray[6] === "X" &&
              cellArray[0] === "X" &&
              cellArray[7] === "X" &&
              cellArray[3] === "O" &&
              cellArray[8] === "O" &&
              cellArray.filter((el) => el === "empty").length === 2:
              doStuffOnComputersTurn(1);
              break;

            case cellArray[4] === "O" &&
              cellArray[5] === "X" &&
              cellArray[6] === "X" &&
              cellArray[0] === "X" &&
              cellArray[1] === "X" &&
              cellArray[3] === "O" &&
              cellArray[8] === "O" &&
              cellArray.filter((el) => el === "empty").length === 2:
              doStuffOnComputersTurn(2);
              break;

            //
            case cellArray[4] === "O" &&
              cellArray[6] === "X" &&
              cellArray[7] === "X" &&
              cellArray.filter((el) => el === "empty").length === 6:
              doStuffOnComputersTurn(8);
              break;

            case cellArray[4] === "O" &&
              cellArray[6] === "X" &&
              cellArray[7] === "X" &&
              cellArray[0] === "empty" &&
              cellArray[8] === "O" &&
              cellArray.filter((el) => el === "empty").length === 4:
              doStuffOnComputersTurn(0);
              break;

            case cellArray[4] === "O" &&
              cellArray[6] === "X" &&
              cellArray[7] === "X" &&
              cellArray[0] === "X" &&
              cellArray[8] === "O" &&
              cellArray.filter((el) => el === "empty").length === 4:
              doStuffOnComputersTurn(3);
              break;

            case cellArray[4] === "O" &&
              cellArray[6] === "X" &&
              cellArray[7] === "X" &&
              cellArray[0] === "X" &&
              cellArray[5] === "empty" &&
              cellArray[3] === "O" &&
              cellArray[8] === "O" &&
              cellArray.filter((el) => el === "empty").length === 2:
              doStuffOnComputersTurn(5);
              break;

            case cellArray[4] === "O" &&
              cellArray[6] === "X" &&
              cellArray[7] === "X" &&
              cellArray[0] === "X" &&
              cellArray[5] === "X" &&
              cellArray[3] === "O" &&
              cellArray[8] === "O" &&
              cellArray.filter((el) => el === "empty").length === 2:
              doStuffOnComputersTurn(1);
              break;

            //
            case cellArray[4] === "O" &&
              cellArray[7] === "X" &&
              cellArray[8] === "X" &&
              cellArray.filter((el) => el === "empty").length === 6:
              doStuffOnComputersTurn(6);
              break;

            case cellArray[4] === "O" &&
              cellArray[7] === "X" &&
              cellArray[8] === "X" &&
              cellArray[2] === "empty" &&
              cellArray[6] === "O" &&
              cellArray.filter((el) => el === "empty").length === 4:
              doStuffOnComputersTurn(2);
              break;

            case cellArray[4] === "O" &&
              cellArray[7] === "X" &&
              cellArray[8] === "X" &&
              cellArray[2] === "X" &&
              cellArray[6] === "O" &&
              cellArray.filter((el) => el === "empty").length === 4:
              doStuffOnComputersTurn(5);
              break;

            case cellArray[4] === "O" &&
              cellArray[7] === "X" &&
              cellArray[8] === "X" &&
              cellArray[2] === "X" &&
              cellArray[3] === "empty" &&
              cellArray[5] === "O" &&
              cellArray[6] === "O" &&
              cellArray.filter((el) => el === "empty").length === 2:
              doStuffOnComputersTurn(3);
              break;

            case cellArray[4] === "O" &&
              cellArray[7] === "X" &&
              cellArray[8] === "X" &&
              cellArray[2] === "X" &&
              cellArray[3] === "X" &&
              cellArray[5] === "O" &&
              cellArray[6] === "O" &&
              cellArray.filter((el) => el === "empty").length === 2:
              doStuffOnComputersTurn(1);
              break;

            ////

            //
            case cellArray[4] === "O" &&
              cellArray[0] === "X" &&
              cellArray[2] === "X" &&
              cellArray.filter((el) => el === "empty").length === 6:
              doStuffOnComputersTurn(1);
              break;

            case cellArray[4] === "O" &&
              cellArray[0] === "X" &&
              cellArray[2] === "X" &&
              cellArray[7] === "empty" &&
              cellArray[1] === "O" &&
              cellArray.filter((el) => el === "empty").length === 4:
              doStuffOnComputersTurn(7);
              break;

            case cellArray[4] === "O" &&
              cellArray[0] === "X" &&
              cellArray[2] === "X" &&
              cellArray[7] === "X" &&
              cellArray[1] === "O" &&
              cellArray.filter((el) => el === "empty").length === 4:
              doStuffOnComputersTurn(5);
              break;

            case cellArray[4] === "O" &&
              cellArray[0] === "X" &&
              cellArray[2] === "X" &&
              cellArray[7] === "X" &&
              cellArray[3] === "empty" &&
              cellArray[1] === "O" &&
              cellArray[5] === "O" &&
              cellArray.filter((el) => el === "empty").length === 2:
              doStuffOnComputersTurn(3);
              break;

            case cellArray[4] === "O" &&
              cellArray[0] === "X" &&
              cellArray[2] === "X" &&
              cellArray[7] === "X" &&
              cellArray[3] === "X" &&
              cellArray[1] === "O" &&
              cellArray[5] === "O" &&
              cellArray.filter((el) => el === "empty").length === 2:
              doStuffOnComputersTurn(6);
              break;

            //
            case cellArray[4] === "O" &&
              cellArray[0] === "X" &&
              cellArray[3] === "X" &&
              cellArray.filter((el) => el === "empty").length === 6:
              doStuffOnComputersTurn(6);
              break;

            case cellArray[4] === "O" &&
              cellArray[0] === "X" &&
              cellArray[3] === "X" &&
              cellArray[2] === "empty" &&
              cellArray[6] === "O" &&
              cellArray.filter((el) => el === "empty").length === 4:
              doStuffOnComputersTurn(2);
              break;

            case cellArray[4] === "O" &&
              cellArray[0] === "X" &&
              cellArray[3] === "X" &&
              cellArray[2] === "X" &&
              cellArray[6] === "O" &&
              cellArray.filter((el) => el === "empty").length === 4:
              doStuffOnComputersTurn(1);
              break;

            case cellArray[4] === "O" &&
              cellArray[0] === "X" &&
              cellArray[3] === "X" &&
              cellArray[2] === "X" &&
              cellArray[7] === "empty" &&
              cellArray[1] === "O" &&
              cellArray[6] === "O" &&
              cellArray.filter((el) => el === "empty").length === 2:
              doStuffOnComputersTurn(7);
              break;

            case cellArray[4] === "O" &&
              cellArray[0] === "X" &&
              cellArray[3] === "X" &&
              cellArray[2] === "X" &&
              cellArray[7] === "X" &&
              cellArray[1] === "O" &&
              cellArray[6] === "O" &&
              cellArray.filter((el) => el === "empty").length === 2:
              doStuffOnComputersTurn(5);
              break;

            //
            case cellArray[4] === "O" &&
              cellArray[0] === "X" &&
              cellArray[5] === "X" &&
              cellArray.filter((el) => el === "empty").length === 6:
              doStuffOnComputersTurn(2);
              break;

            case cellArray[4] === "O" &&
              cellArray[0] === "X" &&
              cellArray[5] === "X" &&
              cellArray[6] === "empty" &&
              cellArray[2] === "O" &&
              cellArray.filter((el) => el === "empty").length === 4:
              doStuffOnComputersTurn(6);
              break;

            case cellArray[4] === "O" &&
              cellArray[0] === "X" &&
              cellArray[5] === "X" &&
              cellArray[6] === "X" &&
              cellArray[2] === "O" &&
              cellArray.filter((el) => el === "empty").length === 4:
              doStuffOnComputersTurn(3);
              break;

            case cellArray[4] === "O" &&
              cellArray[0] === "X" &&
              cellArray[5] === "X" &&
              cellArray[6] === "X" &&
              cellArray[1] === "X" &&
              cellArray[2] === "O" &&
              cellArray[3] === "O" &&
              cellArray.filter((el) => el === "empty").length === 2:
              doStuffOnComputersTurn(8);
              break;

            case cellArray[4] === "O" &&
              cellArray[0] === "X" &&
              cellArray[5] === "X" &&
              cellArray[6] === "X" &&
              cellArray[7] === "X" &&
              cellArray[2] === "O" &&
              cellArray[3] === "O" &&
              cellArray.filter((el) => el === "empty").length === 2:
              doStuffOnComputersTurn(8);
              break;

            case cellArray[4] === "O" &&
              cellArray[0] === "X" &&
              cellArray[5] === "X" &&
              cellArray[6] === "X" &&
              cellArray[8] === "X" &&
              cellArray[2] === "O" &&
              cellArray[3] === "O" &&
              cellArray.filter((el) => el === "empty").length === 2:
              doStuffOnComputersTurn(7);
              break;

            //
            case cellArray[4] === "O" &&
              cellArray[0] === "X" &&
              cellArray[6] === "X" &&
              cellArray.filter((el) => el === "empty").length === 6:
              doStuffOnComputersTurn(3);
              break;

            case cellArray[4] === "O" &&
              cellArray[0] === "X" &&
              cellArray[6] === "X" &&
              cellArray[5] === "empty" &&
              cellArray[3] === "O" &&
              cellArray.filter((el) => el === "empty").length === 4:
              doStuffOnComputersTurn(5);
              break;

            case cellArray[4] === "O" &&
              cellArray[0] === "X" &&
              cellArray[6] === "X" &&
              cellArray[5] === "X" &&
              cellArray[3] === "O" &&
              cellArray.filter((el) => el === "empty").length === 4:
              doStuffOnComputersTurn(7);
              break;

            case cellArray[4] === "O" &&
              cellArray[0] === "X" &&
              cellArray[6] === "X" &&
              cellArray[5] === "X" &&
              cellArray[1] === "empty" &&
              cellArray[3] === "O" &&
              cellArray[7] === "O" &&
              cellArray.filter((el) => el === "empty").length === 2:
              doStuffOnComputersTurn(1);
              break;

            case cellArray[4] === "O" &&
              cellArray[0] === "X" &&
              cellArray[6] === "X" &&
              cellArray[5] === "X" &&
              cellArray[1] === "X" &&
              cellArray[3] === "O" &&
              cellArray[7] === "O" &&
              cellArray.filter((el) => el === "empty").length === 2:
              doStuffOnComputersTurn(2);
              break;

            //
            case cellArray[4] === "O" &&
              cellArray[0] === "X" &&
              cellArray[7] === "X" &&
              cellArray.filter((el) => el === "empty").length === 6:
              doStuffOnComputersTurn(6);
              break;

            case cellArray[4] === "O" &&
              cellArray[0] === "X" &&
              cellArray[7] === "X" &&
              cellArray[2] === "empty" &&
              cellArray[6] === "O" &&
              cellArray.filter((el) => el === "empty").length === 4:
              doStuffOnComputersTurn(2);
              break;

            case cellArray[4] === "O" &&
              cellArray[0] === "X" &&
              cellArray[7] === "X" &&
              cellArray[2] === "X" &&
              cellArray[6] === "O" &&
              cellArray.filter((el) => el === "empty").length === 4:
              doStuffOnComputersTurn(1);
              break;

            // rule already exists
            // case cellArray[4] === 'O' &&
            //     cellArray[0] === 'X' &&
            //     cellArray[7] === 'X' &&
            //     cellArray[2] === 'X' &&
            //     cellArray[3] === 'X' &&
            //     cellArray[6] === 'O' &&
            //     cellArray.filter( (el) => el === 'empty' ).length === 2
            //     :
            // doStuffOnComputersTurn(5);
            // break;

            case cellArray[4] === "O" &&
              cellArray[0] === "X" &&
              cellArray[7] === "X" &&
              cellArray[2] === "X" &&
              cellArray[5] === "X" &&
              cellArray[6] === "O" &&
              cellArray[1] === "O" &&
              cellArray.filter((el) => el === "empty").length === 2:
              doStuffOnComputersTurn(8);
              break;

            case cellArray[4] === "O" &&
              cellArray[0] === "X" &&
              cellArray[7] === "X" &&
              cellArray[2] === "X" &&
              cellArray[8] === "X" &&
              cellArray[6] === "O" &&
              cellArray.filter((el) => el === "empty").length === 2:
              doStuffOnComputersTurn(5);
              break;

            //
            case cellArray[4] === "O" &&
              cellArray[0] === "X" &&
              cellArray[8] === "X" &&
              cellArray.filter((el) => el === "empty").length === 6:
              doStuffOnComputersTurn(3);
              break;

            case cellArray[4] === "O" &&
              cellArray[0] === "X" &&
              cellArray[8] === "X" &&
              cellArray[5] === "empty" &&
              cellArray[3] === "O" &&
              cellArray.filter((el) => el === "empty").length === 4:
              doStuffOnComputersTurn(5);
              break;

            case cellArray[4] === "O" &&
              cellArray[0] === "X" &&
              cellArray[8] === "X" &&
              cellArray[5] === "X" &&
              cellArray[3] === "O" &&
              cellArray.filter((el) => el === "empty").length === 4:
              doStuffOnComputersTurn(2);
              break;

            case cellArray[4] === "O" &&
              cellArray[0] === "X" &&
              cellArray[8] === "X" &&
              cellArray[5] === "X" &&
              cellArray[6] === "empty" &&
              cellArray[3] === "O" &&
              cellArray[2] === "O" &&
              cellArray.filter((el) => el === "empty").length === 2:
              doStuffOnComputersTurn(6);
              break;

            // rule already exists
            // case cellArray[4] === 'O' &&
            //     cellArray[0] === 'X' &&
            //     cellArray[8] === 'X' &&
            //     cellArray[5] === 'X' &&
            //     cellArray[6] === 'X' &&
            //     cellArray[3] === 'O' &&
            //     cellArray[2] === 'O' &&
            //     cellArray.filter( (el) => el === 'empty' ).length === 2
            //     :
            // doStuffOnComputersTurn(7);
            // break;

            //
            case cellArray[4] === "O" &&
              cellArray[1] === "X" &&
              cellArray[3] === "X" &&
              cellArray.filter((el) => el === "empty").length === 6:
              doStuffOnComputersTurn(0);
              break;

            case cellArray[4] === "O" &&
              cellArray[1] === "X" &&
              cellArray[3] === "X" &&
              cellArray[8] === "empty" &&
              cellArray[0] === "O" &&
              cellArray.filter((el) => el === "empty").length === 4:
              doStuffOnComputersTurn(8);
              break;

            case cellArray[4] === "O" &&
              cellArray[1] === "X" &&
              cellArray[3] === "X" &&
              cellArray[8] === "X" &&
              cellArray[0] === "O" &&
              cellArray.filter((el) => el === "empty").length === 4:
              doStuffOnComputersTurn(6);
              break;

            case cellArray[4] === "O" &&
              cellArray[1] === "X" &&
              cellArray[3] === "X" &&
              cellArray[8] === "X" &&
              cellArray[2] === "empty" &&
              cellArray[0] === "O" &&
              cellArray[6] === "O" &&
              cellArray.filter((el) => el === "empty").length === 2:
              doStuffOnComputersTurn(2);
              break;

            case cellArray[4] === "O" &&
              cellArray[1] === "X" &&
              cellArray[3] === "X" &&
              cellArray[8] === "X" &&
              cellArray[2] === "X" &&
              cellArray[0] === "O" &&
              cellArray[6] === "O" &&
              cellArray.filter((el) => el === "empty").length === 2:
              doStuffOnComputersTurn(5);
              break;

            //
            case cellArray[4] === "O" &&
              cellArray[1] === "X" &&
              cellArray[5] === "X" &&
              cellArray.filter((el) => el === "empty").length === 6:
              doStuffOnComputersTurn(2);
              break;

            case cellArray[4] === "O" &&
              cellArray[1] === "X" &&
              cellArray[5] === "X" &&
              cellArray[6] === "empty" &&
              cellArray[2] === "O" &&
              cellArray.filter((el) => el === "empty").length === 4:
              doStuffOnComputersTurn(6);
              break;

            case cellArray[4] === "O" &&
              cellArray[1] === "X" &&
              cellArray[5] === "X" &&
              cellArray[6] === "X" &&
              cellArray[2] === "O" &&
              cellArray.filter((el) => el === "empty").length === 4:
              doStuffOnComputersTurn(8);
              break;

            case cellArray[4] === "O" &&
              cellArray[1] === "X" &&
              cellArray[5] === "X" &&
              cellArray[6] === "X" &&
              cellArray[0] === "empty" &&
              cellArray[2] === "O" &&
              cellArray[8] === "O" &&
              cellArray.filter((el) => el === "empty").length === 2:
              doStuffOnComputersTurn(0);
              break;

            case cellArray[4] === "O" &&
              cellArray[1] === "X" &&
              cellArray[5] === "X" &&
              cellArray[6] === "X" &&
              cellArray[0] === "X" &&
              cellArray[2] === "O" &&
              cellArray[8] === "O" &&
              cellArray.filter((el) => el === "empty").length === 2:
              doStuffOnComputersTurn(3);
              break;

            //
            case cellArray[4] === "O" &&
              cellArray[1] === "X" &&
              cellArray[6] === "X" &&
              cellArray.filter((el) => el === "empty").length === 6:
              doStuffOnComputersTurn(0);
              break;

            case cellArray[4] === "O" &&
              cellArray[1] === "X" &&
              cellArray[6] === "X" &&
              cellArray[8] === "empty" &&
              cellArray[0] === "O" &&
              cellArray.filter((el) => el === "empty").length === 4:
              doStuffOnComputersTurn(8);
              break;

            case cellArray[4] === "O" &&
              cellArray[1] === "X" &&
              cellArray[6] === "X" &&
              cellArray[8] === "X" &&
              cellArray[0] === "O" &&
              cellArray.filter((el) => el === "empty").length === 4:
              doStuffOnComputersTurn(7);
              break;

            case cellArray[4] === "O" &&
              cellArray[1] === "X" &&
              cellArray[6] === "X" &&
              cellArray[8] === "X" &&
              cellArray[2] === "X" &&
              cellArray[0] === "O" &&
              cellArray[7] === "O" &&
              cellArray.filter((el) => el === "empty").length === 2:
              doStuffOnComputersTurn(5);
              break;

            case cellArray[4] === "O" &&
              cellArray[1] === "X" &&
              cellArray[6] === "X" &&
              cellArray[8] === "X" &&
              cellArray[3] === "X" &&
              cellArray[0] === "O" &&
              cellArray[7] === "O" &&
              cellArray.filter((el) => el === "empty").length === 2:
              doStuffOnComputersTurn(5);
              break;

            case cellArray[4] === "O" &&
              cellArray[1] === "X" &&
              cellArray[6] === "X" &&
              cellArray[8] === "X" &&
              cellArray[5] === "X" &&
              cellArray[0] === "O" &&
              cellArray[7] === "O" &&
              cellArray.filter((el) => el === "empty").length === 2:
              doStuffOnComputersTurn(2);
              break;

            //
            case cellArray[4] === "O" &&
              cellArray[1] === "X" &&
              cellArray[7] === "X" &&
              cellArray.filter((el) => el === "empty").length === 6:
              doStuffOnComputersTurn(8);
              break;

            case cellArray[4] === "O" &&
              cellArray[1] === "X" &&
              cellArray[7] === "X" &&
              cellArray[0] === "empty" &&
              cellArray[8] === "O" &&
              cellArray.filter((el) => el === "empty").length === 4:
              doStuffOnComputersTurn(0);
              break;

            case cellArray[4] === "O" &&
              cellArray[1] === "X" &&
              cellArray[7] === "X" &&
              cellArray[0] === "X" &&
              cellArray[8] === "O" &&
              cellArray.filter((el) => el === "empty").length === 4:
              doStuffOnComputersTurn(2);
              break;

            case cellArray[4] === "O" &&
              cellArray[1] === "X" &&
              cellArray[7] === "X" &&
              cellArray[0] === "X" &&
              cellArray[6] === "empty" &&
              cellArray[8] === "O" &&
              cellArray[2] === "O" &&
              cellArray.filter((el) => el === "empty").length === 2:
              doStuffOnComputersTurn(6);
              break;

            case cellArray[4] === "O" &&
              cellArray[1] === "X" &&
              cellArray[7] === "X" &&
              cellArray[0] === "X" &&
              cellArray[6] === "X" &&
              cellArray[8] === "O" &&
              cellArray[2] === "O" &&
              cellArray.filter((el) => el === "empty").length === 2:
              doStuffOnComputersTurn(3);
              break;

            //
            case cellArray[4] === "O" &&
              cellArray[1] === "X" &&
              cellArray[8] === "X" &&
              cellArray.filter((el) => el === "empty").length === 6:
              doStuffOnComputersTurn(2);
              break;

            case cellArray[4] === "O" &&
              cellArray[1] === "X" &&
              cellArray[8] === "X" &&
              cellArray[6] === "empty" &&
              cellArray[2] === "O" &&
              cellArray.filter((el) => el === "empty").length === 4:
              doStuffOnComputersTurn(6);
              break;

            case cellArray[4] === "O" &&
              cellArray[1] === "X" &&
              cellArray[8] === "X" &&
              cellArray[6] === "X" &&
              cellArray[2] === "O" &&
              cellArray.filter((el) => el === "empty").length === 4:
              doStuffOnComputersTurn(7);
              break;

            case cellArray[4] === "O" &&
              cellArray[1] === "X" &&
              cellArray[8] === "X" &&
              cellArray[6] === "X" &&
              cellArray[0] === "X" &&
              cellArray[2] === "O" &&
              cellArray[7] === "O" &&
              cellArray.filter((el) => el === "empty").length === 2:
              doStuffOnComputersTurn(3);
              break;

            case cellArray[4] === "O" &&
              cellArray[1] === "X" &&
              cellArray[8] === "X" &&
              cellArray[6] === "X" &&
              cellArray[3] === "X" &&
              cellArray[2] === "O" &&
              cellArray[7] === "O" &&
              cellArray.filter((el) => el === "empty").length === 2:
              doStuffOnComputersTurn(0);
              break;

            case cellArray[4] === "O" &&
              cellArray[1] === "X" &&
              cellArray[8] === "X" &&
              cellArray[6] === "X" &&
              cellArray[5] === "X" &&
              cellArray[2] === "O" &&
              cellArray[7] === "O" &&
              cellArray.filter((el) => el === "empty").length === 2:
              doStuffOnComputersTurn(3);
              break;

            //
            case cellArray[4] === "O" &&
              cellArray[2] === "X" &&
              cellArray[5] === "X" &&
              cellArray.filter((el) => el === "empty").length === 6:
              doStuffOnComputersTurn(8);
              break;

            case cellArray[4] === "O" &&
              cellArray[2] === "X" &&
              cellArray[5] === "X" &&
              cellArray[0] === "empty" &&
              cellArray[8] === "O" &&
              cellArray.filter((el) => el === "empty").length === 4:
              doStuffOnComputersTurn(0);
              break;

            case cellArray[4] === "O" &&
              cellArray[2] === "X" &&
              cellArray[5] === "X" &&
              cellArray[0] === "X" &&
              cellArray[8] === "O" &&
              cellArray.filter((el) => el === "empty").length === 4:
              doStuffOnComputersTurn(1);
              break;

            case cellArray[4] === "O" &&
              cellArray[2] === "X" &&
              cellArray[5] === "X" &&
              cellArray[0] === "X" &&
              cellArray[7] === "empty" &&
              cellArray[8] === "O" &&
              cellArray[1] === "O" &&
              cellArray.filter((el) => el === "empty").length === 2:
              doStuffOnComputersTurn(7);
              break;

            case cellArray[4] === "O" &&
              cellArray[2] === "X" &&
              cellArray[5] === "X" &&
              cellArray[0] === "X" &&
              cellArray[7] === "X" &&
              cellArray[8] === "O" &&
              cellArray[1] === "O" &&
              cellArray.filter((el) => el === "empty").length === 2:
              doStuffOnComputersTurn(3);
              break;

            //
            case cellArray[4] === "O" &&
              cellArray[2] === "X" &&
              cellArray[6] === "X" &&
              cellArray.filter((el) => el === "empty").length === 6:
              doStuffOnComputersTurn(7);
              break;

            case cellArray[4] === "O" &&
              cellArray[2] === "X" &&
              cellArray[6] === "X" &&
              cellArray[1] === "empty" &&
              cellArray[7] === "O" &&
              cellArray.filter((el) => el === "empty").length === 4:
              doStuffOnComputersTurn(1);
              break;

            case cellArray[4] === "O" &&
              cellArray[2] === "X" &&
              cellArray[6] === "X" &&
              cellArray[1] === "X" &&
              cellArray[7] === "O" &&
              cellArray.filter((el) => el === "empty").length === 4:
              doStuffOnComputersTurn(0);
              break;

            case cellArray[4] === "O" &&
              cellArray[2] === "X" &&
              cellArray[6] === "X" &&
              cellArray[1] === "X" &&
              cellArray[8] === "empty" &&
              cellArray[7] === "O" &&
              cellArray[0] === "O" &&
              cellArray.filter((el) => el === "empty").length === 2:
              doStuffOnComputersTurn(8);
              break;

            // rule already exists
            // case cellArray[4] === 'O' &&
            //     cellArray[2] === 'X' &&
            //     cellArray[6] === 'X' &&
            //     cellArray[1] === 'X' &&
            //     cellArray[8] === 'X' &&
            //     cellArray[7] === 'O' &&
            //     cellArray[0] === 'O' &&
            //     cellArray.filter( (el) => el === 'empty' ).length === 2
            //     :
            // doStuffOnComputersTurn(5);
            // break;

            //
            case cellArray[4] === "O" &&
              cellArray[2] === "X" &&
              cellArray[7] === "X" &&
              cellArray.filter((el) => el === "empty").length === 6:
              doStuffOnComputersTurn(8);
              break;

            case cellArray[4] === "O" &&
              cellArray[2] === "X" &&
              cellArray[7] === "X" &&
              cellArray[0] === "empty" &&
              cellArray[8] === "O" &&
              cellArray.filter((el) => el === "empty").length === 4:
              doStuffOnComputersTurn(0);
              break;

            case cellArray[4] === "O" &&
              cellArray[2] === "X" &&
              cellArray[7] === "X" &&
              cellArray[0] === "X" &&
              cellArray[8] === "O" &&
              cellArray.filter((el) => el === "empty").length === 4:
              doStuffOnComputersTurn(1);
              break;

            case cellArray[4] === "O" &&
              cellArray[2] === "X" &&
              cellArray[7] === "X" &&
              cellArray[0] === "X" &&
              cellArray[3] === "X" &&
              cellArray[8] === "O" &&
              cellArray[1] === "O" &&
              cellArray.filter((el) => el === "empty").length === 2:
              doStuffOnComputersTurn(6);
              break;

            case cellArray[4] === "O" &&
              cellArray[2] === "X" &&
              cellArray[7] === "X" &&
              cellArray[0] === "X" &&
              cellArray[5] === "X" &&
              cellArray[8] === "O" &&
              cellArray[1] === "O" &&
              cellArray.filter((el) => el === "empty").length === 2:
              doStuffOnComputersTurn(3);
              break;

            case cellArray[4] === "O" &&
              cellArray[2] === "X" &&
              cellArray[7] === "X" &&
              cellArray[0] === "X" &&
              cellArray[6] === "X" &&
              cellArray[8] === "O" &&
              cellArray[1] === "O" &&
              cellArray.filter((el) => el === "empty").length === 2:
              doStuffOnComputersTurn(3);
              break;

            //
            case cellArray[4] === "O" &&
              cellArray[2] === "X" &&
              cellArray[8] === "X" &&
              cellArray.filter((el) => el === "empty").length === 6:
              doStuffOnComputersTurn(5);
              break;

            case cellArray[4] === "O" &&
              cellArray[2] === "X" &&
              cellArray[8] === "X" &&
              cellArray[3] === "empty" &&
              cellArray[5] === "O" &&
              cellArray.filter((el) => el === "empty").length === 4:
              doStuffOnComputersTurn(3);
              break;

            case cellArray[4] === "O" &&
              cellArray[2] === "X" &&
              cellArray[8] === "X" &&
              cellArray[3] === "X" &&
              cellArray[5] === "O" &&
              cellArray.filter((el) => el === "empty").length === 4:
              doStuffOnComputersTurn(7);
              break;

            case cellArray[4] === "O" &&
              cellArray[2] === "X" &&
              cellArray[8] === "X" &&
              cellArray[3] === "X" &&
              cellArray[1] === "empty" &&
              cellArray[5] === "O" &&
              cellArray[7] === "O" &&
              cellArray.filter((el) => el === "empty").length === 2:
              doStuffOnComputersTurn(1);
              break;

            case cellArray[4] === "O" &&
              cellArray[2] === "X" &&
              cellArray[8] === "X" &&
              cellArray[3] === "X" &&
              cellArray[1] === "X" &&
              cellArray[5] === "O" &&
              cellArray[7] === "O" &&
              cellArray.filter((el) => el === "empty").length === 2:
              doStuffOnComputersTurn(0);
              break;

            //
            case cellArray[4] === "O" &&
              cellArray[3] === "X" &&
              cellArray[6] === "X" &&
              cellArray.filter((el) => el === "empty").length === 6:
              doStuffOnComputersTurn(0);
              break;

            case cellArray[4] === "O" &&
              cellArray[3] === "X" &&
              cellArray[6] === "X" &&
              cellArray[8] === "empty" &&
              cellArray[0] === "O" &&
              cellArray.filter((el) => el === "empty").length === 4:
              doStuffOnComputersTurn(8);
              break;

            case cellArray[4] === "O" &&
              cellArray[3] === "X" &&
              cellArray[6] === "X" &&
              cellArray[8] === "X" &&
              cellArray[0] === "O" &&
              cellArray.filter((el) => el === "empty").length === 4:
              doStuffOnComputersTurn(7);
              break;

            case cellArray[4] === "O" &&
              cellArray[3] === "X" &&
              cellArray[6] === "X" &&
              cellArray[8] === "X" &&
              cellArray[1] === "empty" &&
              cellArray[0] === "O" &&
              cellArray[7] === "O" &&
              cellArray.filter((el) => el === "empty").length === 2:
              doStuffOnComputersTurn(1);
              break;

            // rule already exists
            // case cellArray[4] === 'O' &&
            //     cellArray[3] === 'X' &&
            //     cellArray[6] === 'X' &&
            //     cellArray[8] === 'X' &&
            //     cellArray[1] === 'X' &&
            //     cellArray[0] === 'O' &&
            //     cellArray[7] === 'O' &&
            //     cellArray.filter( (el) => el === 'empty' ).length === 2
            //     :
            // doStuffOnComputersTurn(5);
            // break;

            //
            case cellArray[4] === "O" &&
              cellArray[3] === "X" &&
              cellArray[7] === "X" &&
              cellArray.filter((el) => el === "empty").length === 6:
              doStuffOnComputersTurn(6);
              break;

            case cellArray[4] === "O" &&
              cellArray[3] === "X" &&
              cellArray[7] === "X" &&
              cellArray[2] === "empty" &&
              cellArray[6] === "O" &&
              cellArray.filter((el) => el === "empty").length === 4:
              doStuffOnComputersTurn(2);
              break;

            case cellArray[4] === "O" &&
              cellArray[3] === "X" &&
              cellArray[7] === "X" &&
              cellArray[2] === "X" &&
              cellArray[6] === "O" &&
              cellArray.filter((el) => el === "empty").length === 4:
              doStuffOnComputersTurn(8);
              break;

            case cellArray[4] === "O" &&
              cellArray[3] === "X" &&
              cellArray[7] === "X" &&
              cellArray[2] === "X" &&
              cellArray[0] === "empty" &&
              cellArray[6] === "O" &&
              cellArray[8] === "O" &&
              cellArray.filter((el) => el === "empty").length === 2:
              doStuffOnComputersTurn(0);
              break;

            case cellArray[4] === "O" &&
              cellArray[3] === "X" &&
              cellArray[7] === "X" &&
              cellArray[2] === "X" &&
              cellArray[0] === "X" &&
              cellArray[6] === "O" &&
              cellArray[8] === "O" &&
              cellArray.filter((el) => el === "empty").length === 2:
              doStuffOnComputersTurn(1);
              break;

            //
            case cellArray[4] === "O" &&
              cellArray[3] === "X" &&
              cellArray[8] === "X" &&
              cellArray.filter((el) => el === "empty").length === 6:
              doStuffOnComputersTurn(6);
              break;

            case cellArray[4] === "O" &&
              cellArray[3] === "X" &&
              cellArray[8] === "X" &&
              cellArray[2] === "empty" &&
              cellArray[6] === "O" &&
              cellArray.filter((el) => el === "empty").length === 4:
              doStuffOnComputersTurn(2);
              break;

            case cellArray[4] === "O" &&
              cellArray[3] === "X" &&
              cellArray[8] === "X" &&
              cellArray[2] === "X" &&
              cellArray[6] === "O" &&
              cellArray.filter((el) => el === "empty").length === 4:
              doStuffOnComputersTurn(5);
              break;

            case cellArray[4] === "O" &&
              cellArray[3] === "X" &&
              cellArray[8] === "X" &&
              cellArray[2] === "X" &&
              cellArray[0] === "X" &&
              cellArray[6] === "O" &&
              cellArray[5] === "O" &&
              cellArray.filter((el) => el === "empty").length === 2:
              doStuffOnComputersTurn(1);
              break;

            case cellArray[4] === "O" &&
              cellArray[3] === "X" &&
              cellArray[8] === "X" &&
              cellArray[2] === "X" &&
              cellArray[1] === "X" &&
              cellArray[6] === "O" &&
              cellArray[5] === "O" &&
              cellArray.filter((el) => el === "empty").length === 2:
              doStuffOnComputersTurn(0);
              break;

            case cellArray[4] === "O" &&
              cellArray[3] === "X" &&
              cellArray[8] === "X" &&
              cellArray[2] === "X" &&
              cellArray[7] === "X" &&
              cellArray[6] === "O" &&
              cellArray[5] === "O" &&
              cellArray.filter((el) => el === "empty").length === 2:
              doStuffOnComputersTurn(1);
              break;

            //
            case cellArray[4] === "O" &&
              cellArray[5] === "X" &&
              cellArray[7] === "X" &&
              cellArray.filter((el) => el === "empty").length === 6:
              doStuffOnComputersTurn(8);
              break;

            // rule already exists
            // case cellArray[4] === 'O' &&
            //     cellArray[5] === 'X' &&
            //     cellArray[7] === 'X' &&
            //     cellArray[0] === 'empty' &&
            //     cellArray[8] === 'O' &&
            //     cellArray.filter( (el) => el === 'empty' ).length === 4
            //     :
            // doStuffOnComputersTurn(0);
            // break;

            case cellArray[4] === "O" &&
              cellArray[5] === "X" &&
              cellArray[7] === "X" &&
              cellArray[0] === "X" &&
              cellArray[8] === "O" &&
              cellArray.filter((el) => el === "empty").length === 4:
              doStuffOnComputersTurn(6);
              break;

            case cellArray[4] === "O" &&
              cellArray[5] === "X" &&
              cellArray[7] === "X" &&
              cellArray[0] === "X" &&
              cellArray[1] === "X" &&
              cellArray[8] === "O" &&
              cellArray[6] === "O" &&
              cellArray.filter((el) => el === "empty").length === 2:
              doStuffOnComputersTurn(2);
              break;

            case cellArray[4] === "O" &&
              cellArray[5] === "X" &&
              cellArray[7] === "X" &&
              cellArray[0] === "X" &&
              cellArray[2] === "X" &&
              cellArray[8] === "O" &&
              cellArray[6] === "O" &&
              cellArray.filter((el) => el === "empty").length === 2:
              doStuffOnComputersTurn(1);
              break;

            //
            case cellArray[4] === "O" &&
              cellArray[5] === "X" &&
              cellArray[8] === "X" &&
              cellArray.filter((el) => el === "empty").length === 6:
              doStuffOnComputersTurn(2);
              break;

            case cellArray[4] === "O" &&
              cellArray[5] === "X" &&
              cellArray[8] === "X" &&
              cellArray[6] === "empty" &&
              cellArray[2] === "O" &&
              cellArray.filter((el) => el === "empty").length === 4:
              doStuffOnComputersTurn(6);
              break;

            case cellArray[4] === "O" &&
              cellArray[5] === "X" &&
              cellArray[8] === "X" &&
              cellArray[6] === "X" &&
              cellArray[2] === "O" &&
              cellArray.filter((el) => el === "empty").length === 4:
              doStuffOnComputersTurn(7);
              break;

            case cellArray[4] === "O" &&
              cellArray[5] === "X" &&
              cellArray[8] === "X" &&
              cellArray[6] === "X" &&
              cellArray[2] === "O" &&
              cellArray[1] === "empty" &&
              cellArray[7] === "O" &&
              cellArray.filter((el) => el === "empty").length === 2:
              doStuffOnComputersTurn(1);
              break;

            // rule already exists
            // case cellArray[4] === 'O' &&
            //     cellArray[5] === 'X' &&
            //     cellArray[8] === 'X' &&
            //     cellArray[6] === 'X' &&
            //     cellArray[2] === 'O' &&
            //     cellArray[1] === 'X' &&
            //     cellArray[7] === 'O' &&
            //     cellArray.filter( (el) => el === 'empty' ).length === 2
            //     :
            // doStuffOnComputersTurn(3);
            // break;

            //
            case cellArray[4] === "O" &&
              cellArray[6] === "X" &&
              cellArray[8] === "X" &&
              cellArray.filter((el) => el === "empty").length === 6:
              doStuffOnComputersTurn(7);
              break;

            case cellArray[4] === "O" &&
              cellArray[6] === "X" &&
              cellArray[8] === "X" &&
              cellArray[1] === "empty" &&
              cellArray[7] === "O" &&
              cellArray.filter((el) => el === "empty").length === 4:
              doStuffOnComputersTurn(1);
              break;

            case cellArray[4] === "O" &&
              cellArray[6] === "X" &&
              cellArray[8] === "X" &&
              cellArray[1] === "X" &&
              cellArray[7] === "O" &&
              cellArray.filter((el) => el === "empty").length === 4:
              doStuffOnComputersTurn(5);
              break;

            case cellArray[4] === "O" &&
              cellArray[6] === "X" &&
              cellArray[8] === "X" &&
              cellArray[1] === "X" &&
              cellArray[3] === "empty" &&
              cellArray[7] === "O" &&
              cellArray[5] === "O" &&
              cellArray.filter((el) => el === "empty").length === 2:
              doStuffOnComputersTurn(3);
              break;

            case cellArray[4] === "O" &&
              cellArray[6] === "X" &&
              cellArray[8] === "X" &&
              cellArray[1] === "X" &&
              cellArray[3] === "X" &&
              cellArray[7] === "O" &&
              cellArray[5] === "O" &&
              cellArray.filter((el) => el === "empty").length === 2:
              doStuffOnComputersTurn(0);
              break;
            // Case cellArray[4] === 'O' END

            ///////////////////////////
            ///////////////////////////

            // Case cellArray[4] === 'X' START
            case cellArray[4] === "X" &&
              cellArray.filter((el) => el === "empty").length === 8:
              doStuffOnComputersTurn(8);
              break;

            //
            case cellArray[4] === "X" &&
              cellArray[8] === "O" &&
              cellArray[0] === "X" &&
              cellArray.filter((el) => el === "empty").length === 6:
              doStuffOnComputersTurn(6);
              break;

            case cellArray[4] === "X" &&
              cellArray[8] === "O" &&
              cellArray[0] === "X" &&
              cellArray[7] === "empty" &&
              cellArray[6] === "O" &&
              cellArray.filter((el) => el === "empty").length === 4:
              doStuffOnComputersTurn(7);
              break;

            case cellArray[4] === "X" &&
              cellArray[8] === "O" &&
              cellArray[0] === "X" &&
              cellArray[7] === "X" &&
              cellArray[6] === "O" &&
              cellArray.filter((el) => el === "empty").length === 4:
              doStuffOnComputersTurn(1);
              break;

            case cellArray[4] === "X" &&
              cellArray[8] === "O" &&
              cellArray[0] === "X" &&
              cellArray[7] === "X" &&
              cellArray[6] === "O" &&
              cellArray[1] === "O" &&
              cellArray[2] === "X" &&
              cellArray.filter((el) => el === "empty").length === 2:
              doStuffOnComputersTurn(5);
              break;

            case cellArray[4] === "X" &&
              cellArray[8] === "O" &&
              cellArray[0] === "X" &&
              cellArray[7] === "X" &&
              cellArray[6] === "O" &&
              cellArray[1] === "O" &&
              cellArray[3] === "X" &&
              cellArray.filter((el) => el === "empty").length === 2:
              doStuffOnComputersTurn(5);
              break;

            case cellArray[4] === "X" &&
              cellArray[8] === "O" &&
              cellArray[0] === "X" &&
              cellArray[7] === "X" &&
              cellArray[6] === "O" &&
              cellArray[1] === "O" &&
              cellArray[5] === "X" &&
              cellArray.filter((el) => el === "empty").length === 2:
              doStuffOnComputersTurn(3);
              break;

            //
            case cellArray[4] === "X" &&
              cellArray[8] === "O" &&
              cellArray[1] === "X" &&
              cellArray.filter((el) => el === "empty").length === 6:
              doStuffOnComputersTurn(7);
              break;

            case cellArray[4] === "X" &&
              cellArray[8] === "O" &&
              cellArray[1] === "X" &&
              cellArray[6] === "empty" &&
              cellArray[7] === "O" &&
              cellArray.filter((el) => el === "empty").length === 4:
              doStuffOnComputersTurn(6);
              break;

            case cellArray[4] === "X" &&
              cellArray[8] === "O" &&
              cellArray[1] === "X" &&
              cellArray[6] === "X" &&
              cellArray[7] === "O" &&
              cellArray.filter((el) => el === "empty").length === 4:
              doStuffOnComputersTurn(2);
              break;

            case cellArray[4] === "X" &&
              cellArray[8] === "O" &&
              cellArray[1] === "X" &&
              cellArray[6] === "X" &&
              cellArray[7] === "O" &&
              cellArray[5] === "empty" &&
              cellArray[2] === "O" &&
              cellArray.filter((el) => el === "empty").length === 2:
              doStuffOnComputersTurn(5);
              break;

            case cellArray[4] === "X" &&
              cellArray[8] === "O" &&
              cellArray[1] === "X" &&
              cellArray[6] === "X" &&
              cellArray[7] === "O" &&
              cellArray[5] === "X" &&
              cellArray[2] === "O" &&
              cellArray.filter((el) => el === "empty").length === 2:
              doStuffOnComputersTurn(3);
              break;

            //
            case cellArray[4] === "X" &&
              cellArray[8] === "O" &&
              cellArray[2] === "X" &&
              cellArray.filter((el) => el === "empty").length === 6:
              doStuffOnComputersTurn(6);
              break;

            case cellArray[4] === "X" &&
              cellArray[8] === "O" &&
              cellArray[2] === "X" &&
              cellArray[7] === "empty" &&
              cellArray[6] === "O" &&
              cellArray.filter((el) => el === "empty").length === 4:
              doStuffOnComputersTurn(7);
              break;

            case cellArray[4] === "X" &&
              cellArray[8] === "O" &&
              cellArray[2] === "X" &&
              cellArray[7] === "X" &&
              cellArray[6] === "O" &&
              cellArray.filter((el) => el === "empty").length === 4:
              doStuffOnComputersTurn(1);
              break;

            case cellArray[4] === "X" &&
              cellArray[8] === "O" &&
              cellArray[2] === "X" &&
              cellArray[7] === "X" &&
              cellArray[6] === "O" &&
              cellArray[0] === "X" &&
              cellArray[1] === "O" &&
              cellArray.filter((el) => el === "empty").length === 2:
              doStuffOnComputersTurn(5);
              break;

            case cellArray[4] === "X" &&
              cellArray[8] === "O" &&
              cellArray[2] === "X" &&
              cellArray[7] === "X" &&
              cellArray[6] === "O" &&
              cellArray[3] === "X" &&
              cellArray[1] === "O" &&
              cellArray.filter((el) => el === "empty").length === 2:
              doStuffOnComputersTurn(5);
              break;

            case cellArray[4] === "X" &&
              cellArray[8] === "O" &&
              cellArray[2] === "X" &&
              cellArray[7] === "X" &&
              cellArray[6] === "O" &&
              cellArray[5] === "X" &&
              cellArray[1] === "O" &&
              cellArray.filter((el) => el === "empty").length === 2:
              doStuffOnComputersTurn(3);
              break;

            //
            case cellArray[4] === "X" &&
              cellArray[8] === "O" &&
              cellArray[3] === "X" &&
              cellArray.filter((el) => el === "empty").length === 6:
              doStuffOnComputersTurn(5);
              break;

            case cellArray[4] === "X" &&
              cellArray[8] === "O" &&
              cellArray[3] === "X" &&
              cellArray[2] === "empty" &&
              cellArray[5] === "O" &&
              cellArray.filter((el) => el === "empty").length === 4:
              doStuffOnComputersTurn(2);
              break;

            case cellArray[4] === "X" &&
              cellArray[8] === "O" &&
              cellArray[3] === "X" &&
              cellArray[2] === "X" &&
              cellArray[5] === "O" &&
              cellArray.filter((el) => el === "empty").length === 4:
              doStuffOnComputersTurn(6);
              break;

            case cellArray[4] === "X" &&
              cellArray[8] === "O" &&
              cellArray[3] === "X" &&
              cellArray[2] === "X" &&
              cellArray[5] === "O" &&
              cellArray[7] === "empty" &&
              cellArray[6] === "O" &&
              cellArray.filter((el) => el === "empty").length === 2:
              doStuffOnComputersTurn(7);
              break;

            case cellArray[4] === "X" &&
              cellArray[8] === "O" &&
              cellArray[3] === "X" &&
              cellArray[2] === "X" &&
              cellArray[5] === "O" &&
              cellArray[7] === "X" &&
              cellArray[6] === "O" &&
              cellArray.filter((el) => el === "empty").length === 2:
              doStuffOnComputersTurn(1);
              break;

            //
            // spread it - fields: 1, 2, 6, 7
            case cellArray[4] === "X" &&
              cellArray[8] === "O" &&
              cellArray[5] === "X" &&
              cellArray.filter((el) => el === "empty").length === 6:
              doStuffOnComputersTurn(3);
              break;

            case cellArray[4] === "X" &&
              cellArray[8] === "O" &&
              cellArray[5] === "X" &&
              cellArray[0] === "X" &&
              cellArray[3] === "O" &&
              cellArray.filter((el) => el === "empty").length === 4:
              doStuffOnComputersTurn(6);
              break;

            case cellArray[4] === "X" &&
              cellArray[8] === "O" &&
              cellArray[5] === "X" &&
              cellArray[0] === "X" &&
              cellArray[3] === "O" &&
              cellArray[7] === "empty" &&
              cellArray[6] === "O" &&
              cellArray.filter((el) => el === "empty").length === 2:
              doStuffOnComputersTurn(7);
              break;

            case cellArray[4] === "X" &&
              cellArray[8] === "O" &&
              cellArray[5] === "X" &&
              cellArray[0] === "X" &&
              cellArray[3] === "O" &&
              cellArray[7] === "X" &&
              cellArray[6] === "O" &&
              cellArray.filter((el) => el === "empty").length === 2:
              doStuffOnComputersTurn(1);
              break;

            case cellArray[4] === "X" &&
              cellArray[8] === "O" &&
              cellArray[5] === "X" &&
              cellArray[1] === "X" &&
              cellArray[3] === "O" &&
              cellArray.filter((el) => el === "empty").length === 4:
              doStuffOnComputersTurn(7);
              break;

            case cellArray[4] === "X" &&
              cellArray[8] === "O" &&
              cellArray[5] === "X" &&
              cellArray[1] === "X" &&
              cellArray[3] === "O" &&
              cellArray[6] === "empty" &&
              cellArray[7] === "O" &&
              cellArray.filter((el) => el === "empty").length === 2:
              doStuffOnComputersTurn(6);
              break;

            case cellArray[4] === "X" &&
              cellArray[8] === "O" &&
              cellArray[5] === "X" &&
              cellArray[1] === "X" &&
              cellArray[3] === "O" &&
              cellArray[6] === "X" &&
              cellArray[7] === "O" &&
              cellArray.filter((el) => el === "empty").length === 2:
              doStuffOnComputersTurn(2);
              break;

            case cellArray[4] === "X" &&
              cellArray[8] === "O" &&
              cellArray[5] === "X" &&
              cellArray[2] === "X" &&
              cellArray[3] === "O" &&
              cellArray.filter((el) => el === "empty").length === 4:
              doStuffOnComputersTurn(6);
              break;

            case cellArray[4] === "X" &&
              cellArray[8] === "O" &&
              cellArray[5] === "X" &&
              cellArray[2] === "X" &&
              cellArray[3] === "O" &&
              cellArray[7] === "empty" &&
              cellArray[6] === "O" &&
              cellArray.filter((el) => el === "empty").length === 2:
              doStuffOnComputersTurn(7);
              break;

            case cellArray[4] === "X" &&
              cellArray[8] === "O" &&
              cellArray[5] === "X" &&
              cellArray[2] === "X" &&
              cellArray[3] === "O" &&
              cellArray[7] === "X" &&
              cellArray[6] === "O" &&
              cellArray.filter((el) => el === "empty").length === 2:
              doStuffOnComputersTurn(1);
              break;

            // case 6 - sub-spread it - fields: 0, 1, 7
            case cellArray[4] === "X" &&
              cellArray[8] === "O" &&
              cellArray[5] === "X" &&
              cellArray[6] === "X" &&
              cellArray[3] === "O" &&
              cellArray.filter((el) => el === "empty").length === 4:
              doStuffOnComputersTurn(2);
              break;

            case cellArray[4] === "X" &&
              cellArray[8] === "O" &&
              cellArray[5] === "X" &&
              cellArray[6] === "X" &&
              cellArray[3] === "O" &&
              cellArray[0] === "X" &&
              cellArray[2] === "O" &&
              cellArray.filter((el) => el === "empty").length === 2:
              doStuffOnComputersTurn(7);
              break;

            case cellArray[4] === "X" &&
              cellArray[8] === "O" &&
              cellArray[5] === "X" &&
              cellArray[6] === "X" &&
              cellArray[3] === "O" &&
              cellArray[1] === "X" &&
              cellArray[2] === "O" &&
              cellArray.filter((el) => el === "empty").length === 2:
              doStuffOnComputersTurn(7);
              break;

            case cellArray[4] === "X" &&
              cellArray[8] === "O" &&
              cellArray[5] === "X" &&
              cellArray[6] === "X" &&
              cellArray[3] === "O" &&
              cellArray[7] === "X" &&
              cellArray[2] === "O" &&
              cellArray.filter((el) => el === "empty").length === 2:
              doStuffOnComputersTurn(1);
              break;

            // case 7 - sub-spread it - fields: 0, 2, 6
            case cellArray[4] === "X" &&
              cellArray[8] === "O" &&
              cellArray[5] === "X" &&
              cellArray[7] === "X" &&
              cellArray[3] === "O" &&
              cellArray.filter((el) => el === "empty").length === 4:
              doStuffOnComputersTurn(1);
              break;

            case cellArray[4] === "X" &&
              cellArray[8] === "O" &&
              cellArray[5] === "X" &&
              cellArray[7] === "X" &&
              cellArray[3] === "O" &&
              cellArray[0] === "X" &&
              cellArray[1] === "O" &&
              cellArray.filter((el) => el === "empty").length === 2:
              doStuffOnComputersTurn(6);
              break;

            case cellArray[4] === "X" &&
              cellArray[8] === "O" &&
              cellArray[5] === "X" &&
              cellArray[7] === "X" &&
              cellArray[3] === "O" &&
              cellArray[2] === "X" &&
              cellArray[1] === "O" &&
              cellArray.filter((el) => el === "empty").length === 2:
              doStuffOnComputersTurn(6);
              break;

            case cellArray[4] === "X" &&
              cellArray[8] === "O" &&
              cellArray[5] === "X" &&
              cellArray[7] === "X" &&
              cellArray[3] === "O" &&
              cellArray[6] === "X" &&
              cellArray[1] === "O" &&
              cellArray.filter((el) => el === "empty").length === 2:
              doStuffOnComputersTurn(2);
              break;

            //
            case cellArray[4] === "X" &&
              cellArray[8] === "O" &&
              cellArray[6] === "X" &&
              cellArray.filter((el) => el === "empty").length === 6:
              doStuffOnComputersTurn(2);
              break;

            case cellArray[4] === "X" &&
              cellArray[8] === "O" &&
              cellArray[6] === "X" &&
              cellArray[5] === "empty" &&
              cellArray[2] === "O" &&
              cellArray.filter((el) => el === "empty").length === 4:
              doStuffOnComputersTurn(5);
              break;

            // Spreads are already covered
            case cellArray[4] === "X" &&
              cellArray[8] === "O" &&
              cellArray[6] === "X" &&
              cellArray[5] === "X" &&
              cellArray[2] === "O" &&
              cellArray.filter((el) => el === "empty").length === 4:
              doStuffOnComputersTurn(3);
              break;

            //
            // spread it - fields: 0, 2, 3, 5, 6
            case cellArray[4] === "X" &&
              cellArray[8] === "O" &&
              cellArray[7] === "X" &&
              cellArray.filter((el) => el === "empty").length === 6:
              doStuffOnComputersTurn(1);
              break;

            case cellArray[4] === "X" &&
              cellArray[8] === "O" &&
              cellArray[7] === "X" &&
              cellArray[0] === "X" && // field 0
              cellArray[1] === "O" &&
              cellArray.filter((el) => el === "empty").length === 4:
              doStuffOnComputersTurn(2);
              break;

            case cellArray[4] === "X" &&
              cellArray[8] === "O" &&
              cellArray[7] === "X" &&
              cellArray[0] === "X" && // field 0
              cellArray[5] === "empty" &&
              cellArray[1] === "O" &&
              cellArray.filter((el) => el === "empty").length === 2:
              doStuffOnComputersTurn(5);
              break;

            case cellArray[4] === "X" &&
              cellArray[8] === "O" &&
              cellArray[7] === "X" &&
              cellArray[0] === "X" && // field 0
              cellArray[5] === "X" &&
              cellArray[1] === "O" &&
              cellArray.filter((el) => el === "empty").length === 2:
              doStuffOnComputersTurn(3);
              break;

            // spread it - fields: 0, 3, 5 - already covered
            case cellArray[4] === "X" &&
              cellArray[8] === "O" &&
              cellArray[7] === "X" &&
              cellArray[2] === "X" && // field 2
              cellArray[1] === "O" &&
              cellArray.filter((el) => el === "empty").length === 4:
              doStuffOnComputersTurn(6);
              break;

            case cellArray[4] === "X" &&
              cellArray[8] === "O" &&
              cellArray[7] === "X" &&
              cellArray[3] === "X" && // field 3
              cellArray[1] === "O" &&
              cellArray.filter((el) => el === "empty").length === 4:
              doStuffOnComputersTurn(5);
              break;

            case cellArray[4] === "X" &&
              cellArray[8] === "O" &&
              cellArray[7] === "X" &&
              cellArray[3] === "X" && // field 3
              cellArray[1] === "O" &&
              cellArray[2] === "empty" &&
              cellArray.filter((el) => el === "empty").length === 2:
              doStuffOnComputersTurn(2);
              break;

            case cellArray[4] === "X" &&
              cellArray[8] === "O" &&
              cellArray[7] === "X" &&
              cellArray[3] === "X" && // field 3
              cellArray[1] === "O" &&
              cellArray[2] === "X" &&
              cellArray.filter((el) => el === "empty").length === 2:
              doStuffOnComputersTurn(6);
              break;

            // spread it - fields: 0, 2, 6 - already covered
            case cellArray[4] === "X" &&
              cellArray[8] === "O" &&
              cellArray[7] === "X" &&
              cellArray[5] === "X" && // field 5
              cellArray[1] === "O" &&
              cellArray.filter((el) => el === "empty").length === 4:
              doStuffOnComputersTurn(3);
              break;

            case cellArray[4] === "X" &&
              cellArray[8] === "O" &&
              cellArray[7] === "X" &&
              cellArray[6] === "X" && // field 6
              cellArray[1] === "O" &&
              cellArray.filter((el) => el === "empty").length === 4:
              doStuffOnComputersTurn(2);
              break;

            case cellArray[4] === "X" &&
              cellArray[8] === "O" &&
              cellArray[7] === "X" &&
              cellArray[6] === "X" && // field 6
              cellArray[1] === "O" &&
              cellArray[2] === "O" &&
              cellArray[0] === "X" &&
              cellArray.filter((el) => el === "empty").length === 2:
              doStuffOnComputersTurn(5);
              break;

            case cellArray[4] === "X" &&
              cellArray[8] === "O" &&
              cellArray[7] === "X" &&
              cellArray[6] === "X" && // field 6
              cellArray[1] === "O" &&
              cellArray[2] === "O" &&
              cellArray[5] === "X" &&
              cellArray.filter((el) => el === "empty").length === 2:
              doStuffOnComputersTurn(0);
              break;

            case cellArray[4] === "X" &&
              cellArray[8] === "O" &&
              cellArray[7] === "X" &&
              cellArray[6] === "X" && // field 6
              cellArray[1] === "O" &&
              cellArray[2] === "O" &&
              cellArray[3] === "X" &&
              cellArray.filter((el) => el === "empty").length === 2:
              doStuffOnComputersTurn(0);
              break;
            // Case cellArray[4] === 'X' END

            default:
              computersTurnEasy();
              break;
          }
        }
      }
      break;
  }
}
