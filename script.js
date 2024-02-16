


function gameController() {

    let game;
    let player1;
    let player2;
    let squares = [];
    // immutable round counter increment;
    createBoard();

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
     
        clearBoard();
        
        player1.isActive = true;
        player2.isActive = false;
        console.log(`Start Game game over status: ${game.isOver}`);
        console.log(`Start Game array ${game.board}`);
        console.log(`Start Game Round counter: ${game.roundCounter}`);
        let displayPlayer1Wins = document.querySelector('#display-player1-wins');
        let displayPlayer2Wins = document.querySelector('#display-player2-wins');
        displayPlayer1Wins.textContent = `Wins: ${player1.wins}`;
        displayPlayer2Wins.textContent = `Wins: ${player2.wins}`;

        
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
   
    
        placeMarks(cell, player);
        game.roundCounter += 1;
        console.log(`Round counter: ${game.roundCounter}`);
        setTimeout(() => {
            checkGameStatus(game, player);
        }, 500);
       
    }





    function placeMarks(cell, player) {
        const row = Math.floor(cell / 3);
        const column = cell % 3;

        if (game.board[row][column] === ' ') {
            game.board[row][column] = player.mark;
            console.log(`${player.mark} Mark placed!\n`);
            console.log(`array ${game.board}`);
        } else {
            console.log(`${player.name} clicked on used cell!`);
            console.log(`array ${game.board}`);
         
        }
       ;
    }

    function checkWin(game, player) {
        // check rows
        const size = 3;


     

        for (let i = 0; i < size; i++) {
            if (game.board[i][0] === game.board[i][1] && game.board[i][0] === game.board[i][2]  && game.board[i][0] !== ' ') {
                game.isOver = true;
                player.wins++;
                console.log(`${player.wins}`);
                console.log(`game over! win on ${i} row!`);
                
            }
        }

        // check columns
     
        
        for (let i = 0; i < size; i++) {
            if (game.board[0][i] === game.board[1][i] && game.board[0][i] === game.board[2][i] && game.board[0][i] !== ' ') {
                game.isOver = true;
                player.wins++;
                console.log(`${player.wins}`);
                console.log(`game over! win on ${i} column!`);
            }
        }
   

        // check diagonals
        // downwards
        if ((game.board[1][1] === game.board[0][0] && game.board[1][1] === game.board[2][2] && game.board[1][1] !== ' ') ||
        // upwards
            (game.board[1][1] === game.board[2][0] && game.board[1][1] === game.board[0][2] && game.board[1][1] !== ' ')) {
                game.isOver = true;
                player.wins++;
                console.log(`${player.wins}`);
                console.log(`game over! diagonal win!`);
        }


        

        
           
    }
  /*
    function displayPlayerWins(player1, player2) {



    
    }
        */
    

  

    function checkGameStatus(game, player) {
        checkWin(game, player); // Check win conditions
        // Update game status based on win or tie
        if (game.isOver) {
            console.log(`${player.name} (${player.mark}) wins! \n Game Over \n`);
         //   displayPlayerWins();
            continueGameQuery(game, player);
            
        } else if (game.roundCounter === 9) {
            game.isOver = true;
            game.isTie = true;
            console.log(`Game over!... Tie!`);
            continueGameQuery(game, player);


         
        };
    }

    function continueGameQuery(game, player) {
        if (game.isTie) {
            if (confirm('A Tie!? Continue Playing? (y/n)')) {
            
                console.log('Keep playing! \n');
                startGame();
              } else {
               
                console.log('Thanks for playing!');
                return;
              }
            
        } else {

            if (confirm(`Player: ${player.name} wins! continue playing? (y/n)`)) {
            
                console.log('Keep playing! \n');
                startGame();
              } else {
               
                console.log('Thanks for playing!');
                return;
              }
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


    function createBoard () {       

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
 
    
        document.querySelectorAll('.square').forEach((element, index) => {
            let square = createSquare(index, element);
            square.element.addEventListener('click', () => handleSquareClick(index));
            squares.push(square);
        });
    }

    function handleSquareClick(index) {
        let player = setCurrentPlayer();
        let square = squares[index]
        if (game.isOver || square.mark) {
            return;
        }
        square.setValue(player.mark);
        playRound(index, player);
        switchPlayers();
    } 

    function clearBoard() {
        squares.forEach(square => {
            square.mark = null;
            square.element.textContent = '';

        });

        game.board = [
            [' ', ' ', ' '],
            [' ', ' ', ' '],
            [' ', ' ', ' ']
        ];
        game.isOver = false;
        game.isTie = false;
        game.roundCounter = 0;

  
}
function resetPlayer(player) {
    player.name = "";
    player.mark = null;
    player.wins = 0;
    player.isActive = false;
}

function resetGame(player1, player2) {
    resetPlayer(player1);
    resetPlayer(player2);
    clearBoard();

    const displayPlayer1Name = document.getElementById('display-player1-name');
    const displayPlayer2Name = document.getElementById('display-player2-name');
    const displayPlayer1Mark = document.getElementById('display-player1-mark');
    const displayPlayer2Mark = document.getElementById('display-player2-mark');
    
    let player1Name = document.getElementById('player1-name');
    let player1Mark = document.getElementById('player1-mark');
    let player2Name = document.getElementById('player2-name');
    let player2Mark = document.getElementById('player2-mark');


    player1Name.value = "";
    player2Name.value = "";
    player1Mark.value = "";
    player2Mark.value = "";

    displayPlayer1Name.textContent = "";
    displayPlayer2Name.textContent = "";
    displayPlayer1Mark.textContent = "";
    displayPlayer2Mark.textContent = "";

   

}


let reset = document.querySelector('#reset-game');
reset.addEventListener('click', function()  {
    console.log('game reset!');
    
    resetGame(player1, player2);
});



};
      



gameController();






