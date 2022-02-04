function start() {
    $("#start").hide();
    
    $("#background").append("<div id='player' class='animationPlayer'></div>");
    $("#background").append("<div id='bird' class='animationBird'></div>");
	$("#background").append("<div id='frog' class='animationFrog'></div>");
	$("#background").append("<div id='cat' class='animationCat'></div>");
    $("#background").append("<div id='score'></div>");
    $("#background").append("<div id='hearts'></div>");

    var shotSound = document.getElementById("shot");
    var meow = document.getElementById("meow");
    var bgMusic = document.getElementById("bgMusic");
    var rescue = document.getElementById("rescue");
    var gameover = document.getElementById("gameover");
    var collisionSound = document.getElementById("collision");
    var turnHappy = document.getElementById("turnHappy");

    bgMusic.volume -= .7;
    gameover.volume -= .7;
    rescue.volume -= .7;

    /*--------------- loop music ---------------*/
    bgMusic.addEventListener("ended", () => { 
		bgMusic.currentTime = 0; 
        bgMusic.play(); 
	}, false);
	
	bgMusic.play();

    /*--------------- variables ---------------*/
    var game = {};
    
    var canShot = true;
    var gameover = false;
    
    var birdVelocity = 5;
    var frogVelocity = 3;
    var catVelocity = 1;
    var velocityShot = 5;
    
    var score = 0;
    var rescues = 0;
    var losts = 0;
    var hearts = 5;
    
    var KEY = { W: 87, S: 83, D: 68 }
    
    var positionY = parseInt(Math.random() * 334);

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
    } 

    /*--------------- move background ---------------*/
    function moveBackground() {
        left = parseInt($("#background").css("background-position"));
        $("#background").css("background-position", left - 1);
    } 

    /*--------------- move player ---------------*/
    function movePlayer() {
        if (game.pressed[KEY.W]) {
            var top = parseInt($("#player").css("top"));
            
            if (top > 25) {
                $("#player").css("top", top - 10);
            }
        }
        
        if (game.pressed[KEY.S]) {
            var top = parseInt($("#player").css("top"));
           
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
            
            var top = parseInt($("#player").css("top"))
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
           
			collisionOne(birdX, birdY);
			collisionSix(playerX, playerY);
        
            positionY = parseInt(Math.random() * 300)  + 30;
           
            $("#bird").css("left", 850);
            $("#bird").css("top", positionY);
        }    

        // check collision between player and frog
        if (collision2.length > 0) {
			hearts--;
			
            frogX = parseInt($("#frog").css("left"));
            frogY = parseInt($("#frog").css("top"));
           
			playerX = parseInt($("#player").css("left"));
            playerY = parseInt($("#player").css("top"));
		   
            collisionTwo(frogX, frogY);
                    
            $("#frog").remove();
						
			collisionSix(playerX, playerY);
                
            repositionFrog();
        }

       
    } 

    /*--------------- collisionOne ---------------*/
    function collisionOne(birdX, birdY) {
        collisionSound.play();

        $("#background").append("<div id='collisionOne' class='animationBirdCollision'></div>");
        $("#collisionOne").css("background-image", "url(assets/img/bird/collision.png)");
      
        $("#collisionOne").css("top", birdY);
        $("#collisionOne").css("left", birdX);
     
        var timeCollision = window.setInterval(removeCollision, 2000);
        
        function removeCollision() {        
            $("#collisionOne").remove();
            window.clearInterval(timeCollision);
            timeCollision = null;                
        } 
	} 
    
    /*--------------- collisionTwo ---------------*/
    function collisionTwo(frogX, frogY) {
        collisionSound.play();

        $("#background").append("<div id='collisionTwo' class='animationFrogCollision'></div>");
        $("#collisionTwo").css("background-image", "url(assets/img/frog/collision.png)");
        
        $("#collisionTwo").css("top", frogY);
        $("#collisionTwo").css("left", frogX);

        var timeCollision = window.setInterval(removeCollision, 2000);
        
        function removeCollision() {        
            $("#collisionTwo").remove();
            window.clearInterval(timeCollision);
            timeCollision = null;    
        }        
    } 

    /*--------------- collisionThree ---------------*/


    /*--------------- collisionFour ---------------*/


    /*--------------- collisionFive ---------------*/


    /*--------------- collisionSix ---------------*/
    function collisionSix(playerX, playerY) {
		$("#player").remove();

        $("#background").append("<div id='collisionFour' class='animationPlayerHit'></div>");
        $("#collisionFour").css("top", playerY);
        $("#collisionFour").css("left", playerX);
        
        var timeCollision = window.setInterval(removeCollision, 2000);
        
        function removeCollision() {
            $("#collisionFour").remove();
            window.clearInterval(timeCollision);
            timeCollision = null;
			
            if (hearts > 0) {
                $("#background").append("<div id='player' class='animationPlayer'></div>");
                $("#player").css("top", playerY);
                $("#player").css("left", playerX);
            }
        }
    } 

    /*--------------- reposition frog ---------------*/
    function repositionFrog() {
        var time = window.setInterval(reposition, 3000);
            
        function reposition() {
            window.clearInterval(time);
            time = null;
                
            if (!gameover) {    
                $("#background").append("<div id='frog' class='animationFrog'></div>");
            }    
        }			
    }	
    
}