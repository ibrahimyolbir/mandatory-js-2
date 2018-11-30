let origBoard;
let count;
const firstPlayer = "O"
const secondPlayer = "X";
const winArray = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [6, 4, 2]
];
const cells = document.querySelectorAll(".cell");

function startGame() {
    count = 0;
    
    document.querySelector(".playerone").style.display = "none";
    document.querySelector(".playertwo").style.display = "none";
    origBoard = Array.from(Array(9).keys());
    //origBoard = new Array(9);

    console.log(origBoard);
    for (let i = 0; i < cells.length; i++) {
        cells[i].innerText = "";
        cells[i].style.removeProperty('background-color');
        cells[i].addEventListener('click', turnClick, false);
    }
}
startGame();
function turnClick(square) {
    if (count % 2 == 0) {
        turn(square.target.id, firstPlayer);
    } else if (count % 2 == 1) {
        turn(square.target.id, secondPlayer);
    }
    count++;
}

function turn(squareId, player) {
    origBoard[squareId] = player;
    document.getElementById(squareId).innerText = player;
    let gameWon = checkWin(origBoard, player);
    if (gameWon) gameOver(gameWon);
}
function checkWin(board, player) {
    let plays = board.reduce((a, e, i) =>
        (e === player) ? a.concat(i) : a, []);
    let gameWon = null;
    for (let [index, win] of winArray.entries()) {
        if (win.every(elem => plays.indexOf(elem) > -1)) {
            gameWon = { index: index, player: player };
            break;
        }
    }
    return gameWon;
}

function gameOver(gameWon) {
    
    for (let index of winArray[gameWon.index]) {
        // document.getElementById(index).style.backgroundColor =
        //     gameWon.player == firstPlayer ? "blue" : "red";
        if (gameWon.player == firstPlayer){
            document.getElementById(index).style.backgroundColor = "#165c94"
            $(".playerone").css("display","block");
            $(".playerone").fadeIn("slow");
        } else {
            document.getElementById(index).style.backgroundColor = "#6f1610"
            $(".playertwo").css("display","block");
            $(".playertwo").fadeIn("slow");
        }
    }
    for (let i = 0; i < cells.length; i++) {
        cells[i].removeEventListener('click', turnClick, false);
    }

}

