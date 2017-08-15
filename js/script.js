(function(){	
const startButton = $('#startButton');
const start = $('#start');
let begin = 0;
const box1 = $('#box1');
const box2 = $('#box2');
const box3 = $('#box3');
const box4 = $('#box4');
const box5 = $('#box5');
const box6 = $('#box6');
const box7 = $('#box7');
const box8 = $('#box8');
const box9 = $('#box9');
const newGameButton = $('.button');
let firstWins = 'box box-filled-1';
let secondWins = 'box box-filled-2';
let counter = 0;
let PC = 0;
let player2Name;





$('#board').hide();
$('#finish-one').hide();
$('#finish-two').hide();
$('#finish-draw').hide();
$('#my-form').show();



//Player-------------------------------------------------------------------------------------------
function Player(name) {
    this.name = name;
    this.win;
    this.currentPlayer = 0;
}

//Game---------------------------------------------------------------------------------------------
function Game(player1 ,player2) {
    this.player1 = player1;
    this.player2 = player2;
    this.won = 0;

    Game.prototype.startGame = function() {
        player1.currentPlayer = 1;
        $('#player1').addClass('active');
    },
    
    Game.prototype.current = function() {
        if(this.player1.currentPlayer === 1) {
            $('#player2display').attr('class', 'current');
            $('#player1display').removeClass('current');
            this.player2.currentPlayer = 1;
            this.player1.currentPlayer = 0;
            $('#player1').removeClass('active');
            $('#player2').addClass('active');
        } else {
            $('#player1display').attr('class', 'current');
            $('#player2display').removeClass('current');
            this.player1.currentPlayer = 1;
            this.player2.currentPlayer = 0;
            $('#player2').removeClass('active');
            $('#player1').addClass('active');
        }
    },

    Game.prototype.endGame = function() {
        if(player1.win === 1) {
            this.won = 1;
        } else if(player2.win === 1) {
            this.won = 2;
        } else {
            this.won = 0;
        }
    }
}

//GameUI-------------------------------------------------------------------------------------------
var GameUI = {

    displayWinner : function(game){
        if(game.won === 1) {
            $('#board').hide();
            $('#finish-one').show();
        } else if(game.won === 2) {
            $('#board').hide();
            $('#finish-two').show();
        } else {
            $('#board').hide();
            $('#finish-draw').show();
        }
    }
}

//App----------------------------------------------------------------------------------------------

let player1 = new Player(player1Name);
let player2 = new Player(player2Name);

let newGame = new Game(player1, player2);


startButton.on('click', () => {
    $('#player1display').attr('class', 'current');
    $('#player2display').removeClass('current');
    start.hide();
    $('#board').show();
    newGame.startGame();
    if( $('#computer').prop('checked')) {
        PC = 1;
    }
    let player1Name = prompt("Player 1's name:");
    $('#player1Name').text(player1Name);
    
    if(PC === 0) {
        player2Name = prompt("Player 2's name:");
        $('#player2Name').text(player2Name);
    } else {
        player2Name = 'Computer';
        $('#player2Name').text(player2Name);
    }
    $('#player1display').text(player1Name);
    $('#player2display').text(player2Name);
});
newGameButton.on('click', () => {
    $('#player1display').attr('class', 'current');
    $('#player2display').removeClass('current');
    counter = 0;
    $('player2').removeClass('active');
    $('#finish-one').hide();
    $('#finish-two').hide();
    $('#finish-draw').hide();
    $('#board').show();
    newGame.startGame();
    player1.win = 0;
    player2.win = 0;
    for(let i = 0; i < 9; i += 1) {
        $('.box')[i].className = "box";
    }
});
$('.box').each(function() {
    $(this).mouseenter(function() {
        if($(this).hasClass('.box-filled-1')!== 1 && $(this).hasClass('.box-filled-2')!== 1) {
            if(player1.currentPlayer === 1) {
                $(this).css('background-image', 'url(img/o.svg)');
            } else {
                $(this).css('background-image', 'url(img/x.svg)');
            }
        }
    });
    $(this).mouseleave(function() {
        if($(this).hasClass('.box-filled-1')!== 1 && $(this).hasClass('.box-filled-2')!== 1) {
            $(this).css('background-image', '');
        }
    });
});



$('.boxes').on('click', (e) => {
    let target = e.target;
    if(target.className === 'box') {
        if(newGame.player1.currentPlayer === 1) {
        target.className += " box-filled-1";
        counter ++;
        newGame.current();
        } else if(newGame.player2.currentPlayer === 1) {
        target.className += " box-filled-2";
        counter ++;
        newGame.current();
        }
    if(PC === 1 && counter < 9 ) {
            if(newGame.player1.currentPlayer === 1) {
                target.className += " box-filled-1";
                counter ++;
            } else if(newGame.player2.currentPlayer === 1){
                let id = Math.floor((Math.random() * 8));
                while($('.box')[id].className !== "box") {
                    id = Math.floor((Math.random() * 8));
                }
                $('.box')[id].className += " box-filled-2";
                counter ++;
            }
               newGame.current();
        }
        if((box1.attr('class') === firstWins) && (box2.attr('class') === firstWins) && (box3.attr('class') === firstWins)||(box4.attr('class') === firstWins) && (box5.attr('class') === firstWins) && (box6.attr('class') === firstWins)||(box7.attr('class') === firstWins) && (box8.attr('class') === firstWins) && (box9.attr('class') === firstWins)||(box1.attr('class') === firstWins) && (box4.attr('class') === firstWins) && (box7.attr('class') === firstWins)||(box2.attr('class') === firstWins) && (box5.attr('class') === firstWins) && (box8.attr('class') === firstWins)||(box3.attr('class') === firstWins) && (box6.attr('class') === firstWins) && (box9.attr('class') === firstWins)||(box1.attr('class') === firstWins) && (box5.attr('class') === firstWins) && (box9.attr('class') === firstWins)||(box3.attr('class') === firstWins) && (box5.attr('class') === firstWins) && (box7.attr('class') === firstWins)) {
            newGame.player1.win = 1;
            newGame.endGame();
            GameUI.displayWinner(newGame);
        }
        else if((box1.attr('class') === secondWins) && (box2.attr('class') === secondWins) && (box3.attr('class') === secondWins)||(box4.attr('class') === secondWins) && (box5.attr('class') === secondWins) && (box6.attr('class') === secondWins)||(box7.attr('class') === secondWins) && (box8.attr('class') === secondWins) && (box9.attr('class') === secondWins)||(box1.attr('class') === secondWins) && (box4.attr('class') === secondWins) && (box7.attr('class') === secondWins)||(box2.attr('class') === secondWins) && (box5.attr('class') === secondWins) && (box8.attr('class') === secondWins)||(box3.attr('class') === secondWins) && (box6.attr('class') === secondWins) && (box9.attr('class') === secondWins)||(box1.attr('class') === secondWins) && (box5.attr('class') === secondWins) && (box9.attr('class') === secondWins)||(box3.attr('class') === secondWins) && (box5.attr('class') === secondWins) && (box7.attr('class') === secondWins)) {
            newGame.player2.win = 1;
            newGame.endGame();
            GameUI.displayWinner(newGame);
        } else {
            if(counter === 9) {
                newGame.endGame();
                GameUI.displayWinner(newGame);
            }
        } 
}    
});
}());


    