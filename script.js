

const readlineSync = require('readline-sync');


function gameController() {

    function createPlayer(name, mark) {
        return {
            name: name,
            mark: mark,
            isActive: false,
        };
    }

    let player1 = createPlayer('Rocky', 'X');
    let player2 = createPlayer('Drago', 'O');
    console.log(`${player1.name} vs ${player2.name}!`);
    
  
    
    let game;



    function startGame() {
        game = {
            board: [
                [' ', ' ', ' '],
                [' ', ' ', ' '],
                [' ', ' ', ' ']
            ],
            isOver: false,
            isTie: false,
            winner: null,
            roundCounter: 0,
        };

        player1.isActive = true;
        playRound();
    }

    function setCurrentPlayer() {
        return player1.isActive ? player1 : player2;
    }

    function playRound() {
        let player = setCurrentPlayer();
        displayBoard(game);
        let cell = getUserInput(player);
        placeMarks(cell, player);
        checkGameStatus(game, player);
       
    }

    function displayBoard(game) {
        console.log('Current game board:');
        game.board.forEach(row => {
            console.log(row.join(' | '));
            console.log('---------');
        });
    }

    function getUserInput(player) {
        let cell = readlineSync.questionInt(`${player.name}, enter the cell number (0-8) to place your mark: `);
        while (cell < 0 || cell > 8 || isNaN(cell)) {
            console.log('Invalid input. Please try again.');
            cell = readlineSync.questionInt('Enter the cell number (0-8) to place your mark: ');
        }
        return cell;
    }

    function placeMarks(cell, player) {
        const row = Math.floor(cell / 3);
        const column = cell % 3;

        if (game.board[row][column] === ' ') {
            game.board[row][column] = player.mark;
            console.log('Mark placed!\n');
        } else {
            console.log("Invalid input. Cell already taken. Please try again.");
            cell = getUserInput(player); // Recursive call to ensure valid input
            placeMarks(cell, player); // Recursive call with new valid cell
        }
        displayBoard(game);
    }

    function checkWin(game) {
        // check rows
        const size = 3;

        for (let i = 0; i < size; i++) {
            if (game.board[i][0] === game.board[i][1] && game.board[i][0] === game.board[i][2]  && game.board[i][0] !== ' ') {
                game.isOver = true;
                console.log(`game over! win on ${i} row!`);
                
            }
        }

        // check columns
     
        
        for (let i = 0; i < size; i++) {
            if (game.board[0][i] === game.board[1][i] && game.board[0][i] === game.board[2][i] && game.board[0][i] !== ' ') {
                game.isOver = true;
                console.log(`game over! win on ${i} column!`);
            }
        }
   

        // check diagonals
        // downwards
        if ((game.board[1][1] === game.board[0][0] && game.board[1][1] === game.board[2][2] && game.board[1][1] !== ' ') ||
        // upwards
            (game.board[1][1] === game.board[2][0] && game.board[1][1] === game.board[0][2] && game.board[1][1] !== ' ')) {
                game.isOver = true;
                console.log(`game over! diagonal win!`);
            }
        

        
           
    }

    function checkGameStatus(game, player) {
        checkWin(game); // Check win conditions
        // Update game status based on win or tie
        if (game.isOver) {
            console.log(`Game over! ${player.name} (${player.mark}) wins! \n`);
            continueGameQuery();
            
        } else {
            switchPlayers();
            playRound();
        };
    }

    function continueGameQuery() {

        let continuePrompt = readlineSync.question(`continue game? (y/n) \n`).toLowerCase();
        if (continuePrompt === 'y') {
            startGame();
        } else {
            console.log('Thanks for playing!');
            return;
        };
    }


    function switchPlayers() {
        player1.isActive = !player1.isActive;
        player2.isActive = !player2.isActive;
    }

    startGame();
}

gameController();
