


function gameController() {

    let game;
    let player1;
    let player2;
    let square;

//  create player logic
    function createPlayer(name, mark) {
        return {
            name: name,
            mark: mark,
            isActive: false,
            wins: 0,
        };
        
    }

    
// game start logic
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
        
    }

 
   // Click to start Game 
    document.querySelector('#start-game').addEventListener('click', function() {
        
        let player1Name = getValue('#player1-name');
        let player1Mark = getValue('#player1-mark');
        let player2Name = getValue('#player2-name');
        let player2Mark = getValue('#player2-mark');

        player1 = createPlayer(player1Name, player1Mark);
        console.log(player1.name, player1.isActive, player1.mark)
        player2 = createPlayer(player2Name, player2Mark);
        console.log(player2.name, player2.isActive, player2.mark)
        console.log(`${player1.name} vs ${player2.name}!`);
        
        
        const displayPlayer1Name = document.getElementById('display-player1-name');
        const displayPlayer2Name = document.getElementById('display-player2-name');
        const displayPlayer1Mark = document.getElementById('display-player1-mark');
        const displayPlayer2Mark = document.getElementById('display-player2-mark');
        

        displayPlayer1Name.textContent = player1Name;
        displayPlayer2Name.textContent = player2Name;
        displayPlayer1Mark.textContent = player1Mark;
        displayPlayer2Mark.textContent = player2Mark;
       

        startGame();
    });

    //function to get the value of an id

    function getValue(selector) {
        return document.querySelector(selector).value;

    }


    function setCurrentPlayer() {
        return player1.isActive ? player1 : player2;
    }

    function playRound(cell, player) {
        displayBoard(game);
        placeMarks(cell, player);
        game.roundCounter++;
        checkGameStatus(game, player);
       
    }

    function displayBoard(game) {
        console.log('Current game board:');
        game.board.forEach(row => {
            console.log(row.join(' | '));
            console.log('---------');
        });
    }



    function placeMarks(cell, player) {
        const row = Math.floor(cell / 3);
        const column = cell % 3;

        if (game.board[row][column] === ' ') {
            game.board[row][column] = player.mark;
            console.log(`${player.market} Mark placed!\n`);
        } else {
            console.log("clicked on used cell");
         
        }
       ;
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
            
        } else if (game.roundCounter === 9) {
            game.isOver = true;
            console.log(`Game over!... Tie!`);
            continueGameQuery();


         
        };
    }

    function continueGameQuery() {

        if (confirm('continue game? (y/n)')) {
            
            console.log('Keep playing!');
            startGame();
          } else {
           
            console.log('Thanks for playing!');
            return;
          }
    }


    function switchPlayers() {
        player1.isActive = !player1.isActive;
        player2.isActive = !player2.isActive;
    }



    // Square Board

    function createSquare(id, element) {
    return {
        id: id,
        mark: null,
        element: element,
        setValue: function(mark) {
            if (this.mark === null){
                this.mark = mark;
                this.element.textContent = mark;
                }; 
            },
        };
    }

    let squares = [];

    document.querySelectorAll('.square').forEach((element, index) => {
        square = createSquare(index, element);
        square.addClickListener = function () {
            this.element.addEventListener('click', () => {
                let player = setCurrentPlayer();
                this.setValue(player.mark);
                let cell = this.id
                playRound(cell, player);
                switchPlayers(player);
            });
        };
        square.addClickListener();
        squares[index] = square;

    });








}

gameController();






