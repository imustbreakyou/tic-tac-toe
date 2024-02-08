

// Game Controller



function gameController () {

    const readline = require('readline');
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });


    

    let createPlayer = function(name, mark) {
        return {
            name: name,
            mark: mark,
            isActive: false,  
        };     
    };

    let player1 = createPlayer('Rocky', 'X');
    let player2 = createPlayer('Drago', 'O');





    function startGame () {
        let gameState = {
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
        return gameState;

    };


    function setCurrentPlayer () {
        return player1.isActive ? player1 : player2; // this is cool
    };


    async function playRound() {
        let player = setCurrentPlayer();
        let cell = await getUserInput(); // Await user input here
        await placeMarks(cell, player, game); // Ensure placeMarks is awaited
        await checkGameStatus(game); // Await checkGameStatus to ensure correct flow
    }
    



    function displayBoard(game) {
        process.stdout.write('Current game board:\n');
        for (let row of game.board) {
            process.stdout.write(row.join(' | ') + '\n');
            process.stdout.write('---------\n');
        }
    }


    function getUserInput() {
        return new Promise((resolve) => {
            rl.question('Enter the cell number (0-8) to place your mark: ', (input) => {
                const cell = parseInt(input, 10);
                if (isNaN(cell) || cell < 0 || cell > 8) {
                    console.log('Invalid input. Please try again.');
                    getUserInput().then(resolve); // Recursively call getUserInput and resolve with its result
                } else {
                    resolve(cell); // Resolve the Promise with the valid cell number
                }
            });
        });
    }
    

    async function placeMarks(cell, player, game) {
        const row = Math.floor(cell / 3);
        const column = cell % 3;
    
        if (game.board[row][column] === ' ') {
            game.board[row][column] = player.mark;
            displayBoard(game);
            console.log('Mark placed! \n');
        } else {
            console.log("Invalid input. Cell already taken.");
            cell = await getUserInput(); // Correctly await new user input
            await placeMarks(cell, player, game); // Recursively call with awaited input
        }
    }

    function checkWin() {
        // win conditions here

        // depending on win conditions update game Object

    }

    async function checkGameStatus(game) {
        checkWin(game); // Ensure this function updates game.isOver and game.winner as necessary
        if (!game.isOver) {
            switchPlayers();
            await playRound(); // Await playRound to ensure the game waits for this round to complete
        } else {
            console.log(`${game.winner ? game.winner.name : 'Nobody'} wins!`);
            rl.close();
        }
    }

    function switchPlayers(){
        if (player1.isActive) {
            player1.isActive = false;
            player2.isActive = true;
        } else {
            player2.isActive = false;
            player1.isActive = true;
        }
        

    }




    let game = startGame();
    

 
  

};

gameController();



