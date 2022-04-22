
//module Game board
const gameBoard = (() => {
    const board = ["", "", "", "", "", "", "", "", ""];

    //get index from the item
    const getIndex = (index) => {
        return board[index];
    };

    //set value to the item
    const setValue = (index, value) => {
        board[index] = value;
        console.log(board)
    };

    //reset the board
    const reset = () => {
        for (let i = 0; i < board.length; i++) {
            board[i] = "";
        }
    };

return { getIndex, setValue, reset }
})();

//player factory function
const Player = (value) => {
    this.value = value;
    const getValue = () => {
        return value;
    }
    this.name = name;
    const getName = () => {
        return name;
    }
return { getValue, name };
};


const displayControl = (() => {
    //DOM
    const itemsArr = document.querySelectorAll(".item");
    const result = document.getElementById("result");
    const restart = document.getElementById("restart");
    const pre = document.getElementById("pre");
    const display = document.getElementById("main");
    const start = document.getElementById("start");
    



    //click to the item listener
    itemsArr.forEach(item => {
      item.addEventListener("click", () => {
        if (gameControl.checkIsOver() || isNotEmpty(item.dataset.index)) return;
        gameControl.makeRound(item.dataset.index);
        updateBoard();
        
        });
    });

    //restart button
    restart.addEventListener("click", () => gameControl.restart());

    //start game button
    start.addEventListener("click", () => startGame());


    //print winner 
    const printWinner = (winner) => {
        result.textContent = `${winner} won. Press restart`;
    };

    //print Tie
    const printTie = () => {
        result.textContent = `Tie! Nobody won. Press restart`
    };

    //print round
    const printRound = (player) => {
        result.textContent = `${player}'s turn`;
    };

    //update Board checking array "board"
    const updateBoard = () => {
        itemsArr.forEach(item => {
            item.textContent = gameBoard.getIndex(item.dataset.index);
        })
    };

    //check is item empty
    const isNotEmpty = index => itemsArr[index].textContent !== "";


    //start a game
    const startGame = () => {
        let first = document.getElementById("first").value;
        let second = document.getElementById("second").value;
        if (first === "") first = "Player X";
        if (second === "") second = "Player O";
        playerX.name = first;
        playerO.name = second;
        pre.classList.add("notactive");
        display.classList.remove("notactive");
        printRound(first);
    }

return { printWinner, printTie, printRound, updateBoard };
})();


const gameControl = (() => {
    let round = 1;
    let isOver = false;
    
    //play one round
    const makeRound = (index) => {
        gameBoard.setValue(index, checkPlayer());
        if (checkWinner()) {
            isOver = true;
            displayControl.printWinner(checkPlayerName());
            return;
        }

        if (round > 8) {
            isOver = true;
            displayControl.printTie();
            return;
        }

        round++;
        displayControl.printRound(checkPlayerName());
    };

    const checkIsOver = () => isOver;
    const checkPlayer = () => (round % 2 === 1 ? playerX.getValue() : playerO.getValue()); 
    const checkPlayerName = () => (round % 2 === 1 ? playerX.name : playerO.name);
    
    const restart = () => {
        round = 1;
        isOver = false;
        gameBoard.reset();
        displayControl.updateBoard();
        displayControl.printRound(checkPlayerName());
    };

    //check winner
    const checkWinner = () => {
    
    //possible combination
    const winItems = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];

    //checking possible combination
    return winItems
        .some(combination => combination
        .every(element => gameBoard.getIndex(element) === checkPlayer()));
    };
return { checkWinner, makeRound, checkIsOver, restart };   
})();


//create players
const playerX = Player("X");
const playerO = Player("O");
