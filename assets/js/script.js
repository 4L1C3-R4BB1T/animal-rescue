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
    var rescueSound = document.getElementById("rescue");
    var gameoverMusic = document.getElementById("gameover");
    var collisionSound = document.getElementById("collision");
    var turnHappySound = document.getElementById("turnHappy");

    bgMusic.volume -= .7;
    gameoverMusic.volume -= .7;
    rescueSound.volume -= .7;

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
           
            $("#shot").css("left", 950);
                
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
            
            $("#shot").css("left", 950);
            
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
			
            if (hearts > 0) {
                $("#background").append("<div id='player' class='animationPlayer'></div>");
                $("#player").css("top", playerY);
                $("#player").css("left", playerX);
            }
        }
    } 

    /*--------------- reposition bird ---------------*/
    function repositionBird() {        
        if (!gameover) {  
            positionY = parseInt(Math.random() * 300) + 30;
        
            $("#background").append("<div id='bird' class='animationBird'></div>");
            $("#bird").css("left", 850);
            $("#bird").css("top", positionY);
        }
    } 

    /*--------------- reposition frog ---------------*/
    function repositionFrog() {
        if (!gameover) {    
            $("#background").append("<div id='frog' class='animationFrog'></div>");
        }    
    }	

    /*--------------- reposition cat ---------------*/
    function repositionCat() {
        if (!gameover) {
            cat = parseInt(Math.random()*4) + 1;

            $("#background").append("<div id='cat' class='animationCat'></div>");	
			$("#cat").css("background-image", `url(assets/img/cats/${cat}.png)`);
			$(".animationCat").css("background-image", `url(assets/img/cats/${cat}.png)`);    
        }
    } 
}