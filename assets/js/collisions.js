/*--------------- collision ---------------*/
function checkCollision() {
    let collisionPlayerBird = ($("#player").collision($("#bird")));
    let collisionPlayerFrog = ($("#player").collision($("#frog")));
    let collisionShotBird = ($("#shot").collision($("#bird")));
    let collisionShotFrog = ($("#shot").collision($("#frog")));
    let collisionPlayerCat = ($("#player").collision($("#cat")));
    let collisionFrogCat = ($("#frog").collision($("#cat")));
        
    // check collision between player and bird
    if (collisionPlayerBird.length > 0) {
        hearts--;
        
        let birdX = parseInt($("#bird").css("left"));
        let birdY = parseInt($("#bird").css("top"));
        
        let playerX = parseInt($("#player").css("left"));
        let playerY = parseInt($("#player").css("top"));
       
        $("#bird").remove();

        collisionBird(birdX, birdY);
        collisionPlayer(playerX, playerY);
    
        setTimeout(repositionBird, 1000);
    }    

    // check collision between player and frog
    if (collisionPlayerFrog.length > 0) {
        hearts--;
        
        let frogX = parseInt($("#frog").css("left"));
        let frogY = parseInt($("#frog").css("top"));
       
        let playerX = parseInt($("#player").css("left"));
        let playerY = parseInt($("#player").css("top"));
       
        $("#frog").remove();
       
        collisionFrog(frogX, frogY);  
        collisionPlayer(playerX, playerY);
        
        setTimeout(repositionFrog, 3000);	
    }

    // check collision between shot and bird
    if (collisionShotBird.length > 0) {
        score += 100;
        birdVelocity += 0.3;

        let birdX = parseInt($("#bird").css("left"));
        let birdY = parseInt($("#bird").css("top"));
            
        $("#bird").remove();	
            
        collisionBirdShot(birdX, birdY);
       
        $("#shot").css("background-image", "none");
        $("#shot").css("left", 926);
            
        setTimeout(repositionBird, 1500);
    }

    // check collision between shot and frog
    if (collisionShotFrog.length > 0) {
        score += 50;
        frogVelocity += 0.05;
        
        let frogX = parseInt($("#frog").css("left"));
        let frogY = parseInt($("#frog").css("top"));
        
        $("#frog").remove();
    
        collisionFrogShot(frogX, frogY);
        
        $("#shot").css("background-image", "none");
        $("#shot").css("left", 926);
        
        setTimeout(repositionFrog, 1500);
    }

    // check collision between player and cat
    if (collisionPlayerCat.length > 0) { 
        score += 10;
        rescues++;

        rescueSound.play();
        
        $("#cat").remove();

        setTimeout(repositionCat, 3000);
    }

    //  check collision between frog and cat
    if (collisionFrogCat.length > 0) {     
        losts++;
        
        let catX = parseInt($("#cat").css("left"));
        let catY = parseInt($("#cat").css("top"));
        
        $("#cat").remove();

        collisionCat(catX, catY);
        
        setTimeout(repositionCat, 3000);
    }
} 

/*--------------- collision bird ---------------*/
function collisionBird(birdX, birdY) {
    $("#background").append("<div id='collisionOne' class='animationBirdCollision'></div>");
    $("#collisionOne").css("background-image", "url(assets/img/bird/collision.png)");
  
    $("#collisionOne").css("top", birdY);
    $("#collisionOne").css("left", birdX);
     
    setTimeout(() => {
        $("#collisionOne").remove();
    }, 2000);
} 

/*--------------- collision bird shot ---------------*/
function collisionBirdShot(birdX, birdY) {
    turnHappySound.play();

    $("#background").append("<div id='collisionOne' class='animationBirdHit'></div>");
    $("#collisionOne").css("background-image", "url(assets/img/bird/hit.png)");
  
    $("#collisionOne").css("top", birdY);
    $("#collisionOne").css("left", birdX);
    
    setTimeout(() => {
        $("#collisionOne").remove();
    }, 1500);
} 

/*--------------- collision frog ---------------*/
function collisionFrog(frogX, frogY) {
    $("#background").append("<div id='collisionTwo' class='animationFrogCollision'></div>");
    $("#collisionTwo").css("background-image", "url(assets/img/frog/collision.png)");
    
    $("#collisionTwo").css("top", frogY);
    $("#collisionTwo").css("left", frogX);

    setTimeout(() => {
        $("#collisionTwo").remove();
    }, 2000);
} 

/*--------------- collision frog shot ---------------*/
function collisionFrogShot(frogX, frogY) {
    turnHappySound.play();

    $("#background").append("<div id='collisionTwo' class='animationFrogHit'></div>");
    $("#collisionTwo").css("background-image", "url(assets/img/frog/hit.png)");
            
    $("#collisionTwo").css("top", frogY);
    $("#collisionTwo").css("left", frogX);
            
    setTimeout(() => {
        $("#collisionTwo").remove();
    }, 1300);
} 

/*--------------- collision cat ---------------*/
function collisionCat(catX, catY) {
    meow.play();

    $("#background").append("<div id='collisionThree' class='animationCatHit'></div>");
    $("#collisionThree").css("top", catY);
    $("#collisionThree").css("left", catX);
    
    setTimeout(() => {
        $("#collisionThree").remove();
    }, 2000);
} 

/*--------------- collision player ---------------*/
function collisionPlayer(playerX, playerY) {
    collisionSound.play();
    
    $("#player").remove();

    $("#background").append("<div id='collisionFour' class='animationPlayerHit'></div>");
    $("#collisionFour").css("top", playerY);
    $("#collisionFour").css("left", playerX);
    
    setTimeout(() => {
        $("#collisionFour").remove();

        if (hearts > 0) {
            $("#background").append("<div id='player' class='animationPlayer'></div>");
            $("#player").css("top", playerY);
            $("#player").css("left", playerX);
        }
    }, 2000);
} 

/*--------------- reposition bird ---------------*/
function repositionBird() {        
    if (hearts > 0) {  
        birdY = parseInt(Math.random() * 300) + 30;
    
        $("#background").append("<div id='bird' class='animationBird'></div>");
        $("#bird").css("left", 850);
        $("#bird").css("top", birdY);
    }
} 

/*--------------- reposition frog ---------------*/
function repositionFrog() {
    if (hearts > 0) {    
        $("#background").append("<div id='frog' class='animationFrog'></div>");
    }    
}	

/*--------------- reposition cat ---------------*/
function repositionCat() {
    if (hearts > 0) {
        let cat = parseInt(Math.random() * 4) + 1;

        $("#background").append("<div id='cat' class='animationCat'></div>");	
        $(".animationCat").css("background-image", `url(assets/img/cats/${cat}.png)`);    
    }
} 