let boxes = document.querySelectorAll(".box");
let newGame = document.querySelector(".new-btn");
let reset = document.querySelector(".reset");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");

let turn0 = true; //playerA , playerB

const winningPattern = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

//reset function
const resetGame = () => {
  turn0 = true;
  enableButton();
  msgContainer.classList.add("hide");
};

boxes.forEach((box) => {
  box.addEventListener("click", () => {
    if (turn0) {
      box.innerText = "O";
      turn0 = false;
    } else {
      box.innerText = "X";
      turn0 = true;
    }
    box.disabled = true;

    checkPattern();
  });
});

const disableButton = () => {
  for (box of boxes) {
    box.disabled = true;
  }
};

//
const enableButton = () => {
  for (box of boxes) {
    box.disabled = false;
    box.innerText = "";
    box.style.backgroundColor = "#f3d68d";
  }
};

//winner declarement
const showWinner = (win) => {
  if (win === "O") {
    msg.innerText = `Congratulations , ${name1} wins!`;
  } else {
    msg.innerText = `Congratulations , ${name2} wins!`;
  }

  //hide removal:for show-casing winner
  msgContainer.classList.remove("hide");
  disableButton();
};

//checking the pattern
const checkPattern = () => {
  for (let pattern of winningPattern) {
    let filledBoxes = 0;
    //selecting innertext in box
    let pos1Val = boxes[pattern[0]].innerText;
    let pos2Val = boxes[pattern[1]].innerText;
    let pos3Val = boxes[pattern[2]].innerText;

    if (pos1Val != "" && pos2Val != "" && pos3Val != "") {
      if (pos1Val === pos2Val && pos2Val === pos3Val) {
        showWinner(pos1Val);
        grayButton(boxes[pattern[0]], boxes[pattern[1]], boxes[pattern[2]]);
        return;
      }
    }
    boxes.forEach((box) => {
      if (box.innerText !== "") filledBoxes++;
    });

    if (filledBoxes === 9) {
      msg.innerText = `It's a draw!`;
      msgContainer.classList.remove("hide");
    }
  }
};

//changing the color of win pattern box
const grayButton = (one, two, three) => {
  one.style.backgroundColor = "gray";
  two.style.backgroundColor = "gray";
  three.style.backgroundColor = "gray";
};

//reseting the values to default
newGame.addEventListener("click", resetGame);
reset.addEventListener("click", resetGame);

let name1 = prompt("Enter Player 1 name");
let name2 = prompt("Enter Player 2 name");
