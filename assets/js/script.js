function start() {
    $("#start").hide();
    
    $("#background").append("<div id='player' class='animationPlayer'></div>");
    $("#background").append("<div id='bird' class='animationBird'></div>");
	$("#background").append("<div id='frog' class='animationFrog'></div>");
	$("#background").append("<div id='cat' class='animationCat'></div>");
    $("#background").append("<div id='score'></div>");
    $("#background").append("<div id='hearts'></div>");

    var shot = document.getElementById("shot");
    var meow = document.getElementById("meow");
    var bgMusic = document.getElementById("bgMusic");
    var rescue = document.getElementById("rescue");
    var gameover = document.getElementById("gameover");
    var collision = document.getElementById("collision");
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
    var gameover = true;
    var birdVelocity = 5;
    var frogVelocity = 3;
    var catVelocity = 1;
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
            // shot();	
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

}