function start() {
    $("#start").hide();
    
    $("#background").append("<div id='player' class='animationPlayer'></div>");
    $("#background").append("<div id='bird' class='animationBird'></div>");
    $("#background").append("<div id='frog' class='animationFrog'></div>");
    $("#background").append("<div id='cat' class='animationCat'></div>");
    $("#background").append("<div id='score'></div>");
    $("#background").append("<div id='hearts'></div>");

    /*--------------- music loop ---------------*/
    bgMusic.addEventListener("ended", () => { 
	    bgMusic.currentTime = 0; 
        bgMusic.play(); 
    }, false);
	
    bgMusic.play();

    /*--------------- checks if the user pressed any key ---------------*/
    $(document).keydown((e) => {
        game.pressed[e.which] = true;
    });
    
    $(document).keyup((e) => {
        game.pressed[e.which] = false;
    });
   
    /*--------------- game loop ---------------*/
    game.timer = setInterval(loop, 30);

    function loop() {
        moveBackground();
        movePlayer();
        moveBird();
        moveFrog();
        moveCat();
        checkCollision();
        showScore();
        showHearts();
    } 
}

/*--------------- score ---------------*/
function showScore() {
    $("#score").html(`<h2> Pontos: ${score} | Salvos: ${rescues} | Perdidos: ${losts}</h2>`);
} 

/*--------------- hearts ---------------*/
function showHearts() {
    $("#hearts").css("background-image", `url(assets/img/hearts/${hearts}.png)`);
    if (hearts == 0) { 
        gameOver();
    }
} 

/*--------------- gameover ---------------*/
function gameOver() {    
    bgMusic.pause();

    gameoverMusic.addEventListener("ended", () => { 
        gameoverMusic.currentTime = 0; 
        gameoverMusic.play(); 
    }, false);
    
    gameoverMusic.play();

    window.clearInterval(game.timer);
    game.timer = null;
    
    $("#player").remove();
    $("#bird").remove();
    $("#frog").remove();
    $("#cat").remove();
    
    $('#background').css("background-image", "url(assets/img/background/bg-inverted.png"); 
    
    $("#background").append(`<div id='gameover'><h1>Game Over</h1>
        <p>Sua pontuação foi: ${score}</p><div id='restart' onClick=restartGame()>
        <h3>Jogar Novamente</h3></div></div>`);
} 

/*--------------- restart game ---------------*/
function restartGame() {
    gameoverMusic.pause();

    bgMusic.currentTime = 0; 
    gameoverMusic.currentTime = 0; 
	
    $("#gameover").remove();
	
    $('#background').css("background-image", "url(assets/img/background/bg.png");
    $("#background").css("background-position", 0); 
    
    resetVariables();
	
    start();
} 