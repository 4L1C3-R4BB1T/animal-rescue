/*--------------- move background ---------------*/
function moveBackground() {
    let left = parseInt($("#background").css("background-position"));
    $("#background").css("background-position", left - 1);
} 

/*--------------- move player ---------------*/
function movePlayer() {
    if (game.pressed[KEY.W]) {
        let playerY = parseInt($("#player").css("top"));
            
        if (playerY > 25) {
            $("#player").css("top", playerY - 10);
        }
    }
        
    if (game.pressed[KEY.S]) {
        let playerY = parseInt($("#player").css("top"));
           
        if (playerY < 420) {	
            $("#player").css("top", playerY + 10);
        }
    }
        
    if (game.pressed[KEY.D]) {
        shot();	
    }
} 

/*--------------- move bird ---------------*/
function moveBird() {
    let birdX = parseInt($("#bird").css("left"));
    
    $("#bird").css("left", birdX - birdVelocity);
    $("#bird").css("top", birdY);
            
    if (birdX <= 0) {
        birdY = parseInt(Math.random() * 300) + 30;

        $("#bird").css("left", 850);
        $("#bird").css("top", birdY);
    }
} 

/*--------------- move frog ---------------*/
function moveFrog() {
    let frogX = parseInt($("#frog").css("left"));
        
    $("#frog").css("left", frogX - frogVelocity);
                    
    if (frogX <= 0) {      
        $("#frog").css("left", 775);
    }
} 

/*--------------- move cat ---------------*/
function moveCat() {
    let catX = parseInt($("#cat").css("left"));
        
    $("#cat").css("left", catX + catVelocity);
                    
    if (catX > 906) {       
        $("#cat").css("left", 0);            
    }
} 

/*--------------- shot ---------------*/
function shot() {
    if (canShot) {
        shotSound.play();

        canShot = false;
            
        let playerY = parseInt($("#player").css("top"))
        let playerX = parseInt($("#player").css("left"))
            
        let shotY = playerY + 42;
        let shotX = playerX + 70;
            
        $("#background").append("<div id='shot' class='animationShot'></div>");
        
        $("#shot").css("top", shotY);
        $("#shot").css("left", shotX);
            
        var time = window.setInterval(executeShot, 30);
    } 
     
    function executeShot() {
        let shotX = parseInt($("#shot").css("left"));
            
        $("#shot").css("left", shotX + 5); 
    
        if (shotX > 925) {               
            window.clearInterval(time);
            time = null;
            
            $("#shot").remove();
            
            canShot = true;        
        }
    } 
} 