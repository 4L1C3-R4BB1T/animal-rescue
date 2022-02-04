let shotSound = document.getElementById("shot");
let meow = document.getElementById("meow");
let bgMusic = document.getElementById("bgMusic");
let rescueSound = document.getElementById("rescue");
let gameoverMusic = document.getElementById("gameover");
let collisionSound = document.getElementById("collision");
let turnHappySound = document.getElementById("turnHappy");

bgMusic.volume -= .7;
gameoverMusic.volume -= .7;
rescueSound.volume -= .7;

function start() {
    $("#start").hide();
    
    $("#background").append("<div id='player' class='animationPlayer'></div>");
    $("#background").append("<div id='bird' class='animationBird'></div>");
	$("#background").append("<div id='frog' class='animationFrog'></div>");
	$("#background").append("<div id='cat' class='animationCat'></div>");
    $("#background").append("<div id='score'></div>");
    $("#background").append("<div id='hearts'></div>");

    /*--------------- loop music ---------------*/
    bgMusic.addEventListener("ended", () => { 
		bgMusic.currentTime = 0; 
        bgMusic.play(); 
	}, false);
	
	bgMusic.play();

    /*--------------- variables ---------------*/
    let game = {};
    
    let canShot = true;
    let gameover = false;
    
    let birdVelocity = 5;
    let frogVelocity = 3;
    let catVelocity = 1;
    let velocityShot = 5;
    
    let score = 0;
    let rescues = 0;
    let losts = 0;
    let hearts = 1;
    
    let KEY = { W: 87, S: 83, D: 68 }
    
    let positionY = parseInt(Math.random() * 334);

    game.pressed = [];

    /*------- checks if the user pressed any key -------*/
    $(document).keydown(function(e) {
        game.pressed[e.which] = true;
    });
    
    $(document).keyup(function(e) {
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

    /*--------------- move background ---------------*/
    function moveBackground() {
        left = parseInt($("#background").css("background-position"));
        $("#background").css("background-position", left - 1);
    } 

    /*--------------- move player ---------------*/
    function movePlayer() {
        if (game.pressed[KEY.W]) {
            let top = parseInt($("#player").css("top"));
            
            if (top > 25) {
                $("#player").css("top", top - 10);
            }
        }
        
        if (game.pressed[KEY.S]) {
            let top = parseInt($("#player").css("top"));
           
            if (top < 420) {	
                $("#player").css("top", top + 10);
            }
        }
        
        if (game.pressed[KEY.D]) {
            shot();	
        }
    } 

    /*--------------- move bird ---------------*/
    function moveBird() {
        positionX = parseInt($("#bird").css("left"));
      
        $("#bird").css("left", positionX - birdVelocity);
        $("#bird").css("top", positionY);
            
        if (positionX <= 0) {
            positionY = parseInt(Math.random() * 300) + 30;

            $("#bird").css("left", 850);
            $("#bird").css("top", positionY);
        }
    } 

    /*--------------- move frog ---------------*/
    function moveFrog() {
        positionX = parseInt($("#frog").css("left"));
        
        $("#frog").css("left", positionX - frogVelocity);
                    
        if (positionX <= 0) {      
            $("#frog").css("left", 775);
        }
    } 

    /*--------------- move cat ---------------*/
    function moveCat() {
        positionX = parseInt($("#cat").css("left"));
        
        $("#cat").css("left", positionX + catVelocity);
                    
        if (positionX > 906) {       
            $("#cat").css("left", 0);            
        }
    } 

    /*--------------- shot ---------------*/
    function shot() {
        if (canShot) {
            shotSound.play();

            canShot = false;
            
            let top = parseInt($("#player").css("top"))
            positionX = parseInt($("#player").css("left"))
            
            shotX = positionX + 70;
            topShot = top + 42;
            
            $("#background").append("<div id='shot' class='animationShot'></div>");
            $("#shot").css("top", topShot);
            $("#shot").css("left", shotX);
            
            var timeShot = window.setInterval(executeShot, 30);
        } 
     
        function executeShot() {
            positionX = parseInt($("#shot").css("left"));
            
            $("#shot").css("left", positionX + velocityShot); 
    
            if (positionX > 925) {               
                window.clearInterval(timeShot);
                timeShot = null;
                $("#shot").remove();
                canShot = true;        
            }
        } 
    } 

    /*--------------- collision ---------------*/
    function checkCollision() {
        var collision1 = ($("#player").collision($("#bird")));
        var collision2 = ($("#player").collision($("#frog")));
        var collision3 = ($("#shot").collision($("#bird")));
        var collision4 = ($("#shot").collision($("#frog")));
        var collision5 = ($("#player").collision($("#cat")));
        var collision6 = ($("#frog").collision($("#cat")));
            
        // check collision between player and bird
        if (collision1.length > 0) {
			hearts--;
			
            birdX = parseInt($("#bird").css("left"));
            birdY = parseInt($("#bird").css("top"));
			
			playerX = parseInt($("#player").css("left"));
            playerY = parseInt($("#player").css("top"));
           
            $("#bird").remove();

			collisionBird(birdX, birdY);
			collisionPlayer(playerX, playerY);
        
            setTimeout(repositionBird, 1000);
        }    

        // check collision between player and frog
        if (collision2.length > 0) {
			hearts--;
			
            frogX = parseInt($("#frog").css("left"));
            frogY = parseInt($("#frog").css("top"));
           
			playerX = parseInt($("#player").css("left"));
            playerY = parseInt($("#player").css("top"));
		   
            $("#frog").remove();
           
            collisionFrog(frogX, frogY);  
			collisionPlayer(playerX, playerY);
            
            setTimeout(repositionFrog, 3000);	
        }

        // check collision between shot and bird
	    if (collision3.length > 0) {
            birdX = parseInt($("#bird").css("left"));
            birdY = parseInt($("#bird").css("top"));
                
			$("#bird").remove();	
				
            collisionBirdShot(birdX, birdY);
           
            $("#shot").css("left", 940);
                
			setTimeout(repositionBird, 1500);
        
            score += 100;
            birdVelocity += 0.3;
        }

        // check collision between shot and frog
        if (collision4.length > 0) {
            frogX = parseInt($("#frog").css("left"));
            frogY = parseInt($("#frog").css("top"));
            
            $("#frog").remove();
        
            collisionFrogShot(frogX, frogY);
            
            $("#shot").css("left", 940);
            
            setTimeout(repositionFrog, 1500);

            score += 50;
        }

        // check collision between player and cat
        if (collision5.length > 0) { 
			rescueSound.play();
            
            $("#cat").remove();

            setTimeout(repositionCat, 3000);
            
            rescues++;
        }

        //  check collision between frog and cat
        if (collision6.length > 0) {     
            catX = parseInt($("#cat").css("left"));
            catY = parseInt($("#cat").css("top"));
            
            collisionCat(catX, catY);
            
            $("#cat").remove();
                    
            setTimeout(repositionCat, 3000);
            
            losts++;
        }
    } 

    /*--------------- collision bird ---------------*/
    function collisionBird(birdX, birdY) {
        collisionSound.play();

        $("#background").append("<div id='collisionOne' class='animationBirdCollision'></div>");
        $("#collisionOne").css("background-image", "url(assets/img/bird/collision.png)");
      
        $("#collisionOne").css("top", birdY);
        $("#collisionOne").css("left", birdX);
     
        var time = window.setInterval(removeCollision, 2000);
        
        function removeCollision() {        
            $("#collisionOne").remove();
            window.clearInterval(time);
            time = null;                
        } 
	} 
    
    /*--------------- collision frog ---------------*/
    function collisionFrog(frogX, frogY) {
        collisionSound.play();

        $("#background").append("<div id='collisionTwo' class='animationFrogCollision'></div>");
        $("#collisionTwo").css("background-image", "url(assets/img/frog/collision.png)");
        
        $("#collisionTwo").css("top", frogY);
        $("#collisionTwo").css("left", frogX);

        var time = window.setInterval(removeCollision, 2000);
        
        function removeCollision() {        
            $("#collisionTwo").remove();
            window.clearInterval(time);
            time = null;    
        }        
    } 

    /*--------------- collision bird shot ---------------*/
    function collisionBirdShot(birdX, birdY) {
        turnHappySound.play();

        $("#background").append("<div id='collisionOne' class='animationBirdHit'></div>");
        $("#collisionOne").css("background-image", "url(assets/img/bird/hit.png)");
      
        $("#collisionOne").css("top", birdY);
        $("#collisionOne").css("left", birdX);
        
        var time = window.setInterval(removeCollision, 1500);
        
        function removeCollision() {        
            $("#collisionOne").remove();
            window.clearInterval(time);
            time = null;                
        } 
	} 

    /*--------------- collision frog shot ---------------*/
    function collisionFrogShot(frogX, frogY) {
        turnHappySound.play();

        $("#background").append("<div id='collisionTwo' class='animationFrogHit'></div>");
        $("#collisionTwo").css("background-image", "url(assets/img/frog/hit.png)");
                
        $("#collisionTwo").css("top", frogY);
        $("#collisionTwo").css("left", frogX);
                
        var time = window.setInterval(removeCollision, 1300);
        
        function removeCollision() {        
            $("#collisionTwo").remove();
            window.clearInterval(time);
            time = null;    
        }        
    } 

    /*--------------- collision cat ---------------*/
    function collisionCat(catX, catY) {
        meow.play();

        $("#background").append("<div id='collisionThree' class='animationCatHit'></div>");
        $("#collisionThree").css("top", catY);
        $("#collisionThree").css("left", catX);
        
        var time = window.setInterval(removeCollision, 2000);
        
        function removeCollision() {
            $("#collisionThree").remove();
            window.clearInterval(time);
            time = null;
        }
    } 

    /*--------------- collision player ---------------*/
    function collisionPlayer(playerX, playerY) {
		$("#player").remove();

        $("#background").append("<div id='collisionFour' class='animationPlayerHit'></div>");
        $("#collisionFour").css("top", playerY);
        $("#collisionFour").css("left", playerX);
        
        var time = window.setInterval(removeCollision, 2000);
        
        function removeCollision() {
            $("#collisionFour").remove();
            window.clearInterval(time);
            time = null;
        }

        setTimeout(() => {
            if (hearts > 0) {
                $("#background").append("<div id='player' class='animationPlayer'></div>");
                $("#player").css("top", playerY);
                $("#player").css("left", playerX);
            }
        }, 2000);
    } 

    /*--------------- reposition bird ---------------*/
    function repositionBird() {        
        if (!gameover && hearts > 0) {  
            positionY = parseInt(Math.random() * 300) + 30;
        
            $("#background").append("<div id='bird' class='animationBird'></div>");
            $("#bird").css("left", 850);
            $("#bird").css("top", positionY);
        }
    } 

    /*--------------- reposition frog ---------------*/
    function repositionFrog() {
        if (!gameover && hearts > 0) {    
            $("#background").append("<div id='frog' class='animationFrog'></div>");
        }    
    }	

    /*--------------- reposition cat ---------------*/
    function repositionCat() {
        if (!gameover && hearts > 0) {
            cat = parseInt(Math.random()*4) + 1;

            $("#background").append("<div id='cat' class='animationCat'></div>");	
			$("#cat").css("background-image", `url(assets/img/cats/${cat}.png)`);
			$(".animationCat").css("background-image", `url(assets/img/cats/${cat}.png)`);    
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
        gameOver = true;
        
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
        
		$('#background').css("background-image", "url(assets/img/bg-inverted.png"); 
		
        $("#background").append("<div id='gameover'></div>");
        
        $("#gameover").html("<h1>Game Over</h1><p>Sua pontuação foi: " + score + "</p>" 
            + "<div id='restart' onClick=restartGame()><h3>Jogar Novamente</h3></div>");
    } 
}

function restartGame() {
	gameoverMusic.pause();
	$("#gameover").remove();
	$('#background').css("background-image", "url(assets/img/bg.png"); 
	start();
} 