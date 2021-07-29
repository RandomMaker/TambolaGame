"use strict";

const numberBoardId = "gameNumbers";
const numberBoard = document.getElementById(numberBoardId);
const numbers = new Array(90).fill(0);
const gameStartButton = document.getElementById("game-start-button");
const gameResetButton = document.getElementById("game-reset-button");
const currentNumberElementValue = document.getElementById(
    "currentActiveNumber"
);
const previousNumberElementValue = document.getElementById(
    "previousNumberValue"
);

let previousNumber = null;

//region NumberBoard Initialization

function InitializeNumberBoard(number_board) {
    number_board.innerHTML = "";
    currentNumberElementValue.innerHTML = "";
    previousNumberElementValue.innerHTML = "";
    for (let i = 1; i < 91; i++) {
        const numberHtml = GenerateNumberBlock(i);
        number_board.appendChild(numberHtml);
    }
    gameStartButton.removeAttribute("disabled");
}

function GenerateNumberBlock(number) {
    const element = document.createElement("div");
    element.classList.add(
        "btn",
        "btn-secondary",
        "m-2",
        "py-3",
        "px-4",
        "pe-none",
        "numberBtn"
    );
    element.setAttribute("id", `number-${number}`);
    element.innerHTML = `
           <h4>${number}</h4>
   `;
    return element;
}

//endregion

//region NumberActivation Methods

function ActivateNumber(number) {
    const element = document.getElementById(`number-${number}`);
    element.classList.remove("btn-outline-warning");
    element.classList.remove("shadow-active");
    element.classList.add("btn-warning");
    element.classList.add("shadow-activated");
}

function SetCurrentNumberActive(number) {
    const element = document.getElementById(`number-${number}`);
    element.classList.remove("btn-secondary");
    element.classList.add("btn-outline-warning");
    element.classList.add("shadow-active");
}

//endregion

//region Random Number Generation

function GenerateRandomNumber(max) {
    return Math.trunc(Math.random() * max) + 1;
}

function GetRandomTambolaNumber() {
    let number = GenerateRandomNumber(90);
    if (numbers[number - 1] === 0) {
        numbers[number - 1] = 1;
        return number;
    } else {
        if (!numbers.includes(0)) {
            console.log("GAME FINISHED");
            return null;
        }
        while (numbers[number - 1] !== 0) {
            number = GenerateRandomNumber(90);
        }
        numbers[number - 1] = 1;
        return number;
    }
}

//endregion

gameStartButton.addEventListener("click", () => {
    if (previousNumber !== null) {
        ActivateNumber(previousNumber);
        previousNumberElementValue.innerHTML = previousNumber;
    }
    let currentNumber = GetRandomTambolaNumber();
    currentNumberElementValue.innerHTML = currentNumber;
    previousNumber = currentNumber;
    if (currentNumber === null) {
        // gameStartButton.classList.add('disabled')
        gameStartButton.setAttribute("disabled", "");
        return;
    }
    SetCurrentNumberActive(currentNumber);
});
gameResetButton.addEventListener("click", () => {
    ResetGame();
});
document.addEventListener("keypress", function onPress(event) {
    if (event.key === "Enter") {
        gameStartButton.click();
        numberBoard.scrollIntoView();
    }
    if (event.shiftKey && event.key === "Enter") {
        gameResetButton.click();
    }
});

function StartGame() {
    InitializeNumberBoard(numberBoard);
}

function ResetGame() {
    previousNumber = null;
    numbers.fill(0);
    InitializeNumberBoard(numberBoard);
}

StartGame();
