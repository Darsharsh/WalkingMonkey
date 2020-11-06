var PLAY = 1;
var END = 0;
var gameState = 1;

var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage
var FoodGroup, obstacleGroup
var score

function preload(){
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstaceImage = loadImage("obstacle.png");
 
}



function setup() {
  createCanvas(500,400);
  
  ground = createSprite(400,350,900,10);
  ground.velociityX = -4;
  ground.x = ground.width/2;
  
  monkey = createSprite(80,315,20,20);
  monkey.addAnimation("moving", monkey_running);
  monkey.scale = 0.1;
  
  obstacleGroup = createGroup();
  bananasGroup = createGroup();
  
  score = 0;
  Score = 0;
}


function draw() {
  background(220);
  
  text("Survival time: "+ score, 50,90);
  text("Score:" + Score,380,90);
  
  
  if(gameState === PLAY){
   
  if(ground.x<0){
     ground.x=ground.width/2;
    }
    
    if(keyDown("space") && monkey.y >=310){
     monkey.velocityY = -10;
    }
    
    monkey.velocityY = monkey.velocityY + 0.3;
    
    bananas();
    obstacles();
    
    score = score + Math.round(getFrameRate()/60);
    
    if(bananasGroup.isTouching(monkey)){
     bananasGroup.destroyEach();
     Score = Score + 2;
    }
    if(obstacleGroup.isTouching(monkey)){
      gameState = END;
    }
  }
   else if (gameState === END) {
     
     background(0);
       
     textSize(30);
     fill("white");
     text("Gameover",185,150);
     
     bananasGroup.setLifetimeEach(-1);
     obstacleGroup.setLifetimeEach(-1);
     bananasGroup.visible=false;
     obstacleGroup.visible=false;
     
     obstacleGroup.setVelocityXEach(0);
     bananasGroup.setVelocityXEach(0);
     
     monkey.velocityY=0;
     monkey.visible=false;
     
   }
  
  monkey.collide(ground);
  
  drawSprites();
}

function obstacles(){
  
  if (frameCount % 80 === 0){
   var obstacle = createSprite(500,330,20,20);
  obstacle.x = Math.round(random(400,500));
   obstacle.velocityX=-5;

    var rand = Math.round(random(1));
    switch(rand) {
      case 1: obstacle.addImage(obstaceImage);
              break;
      default: break;
    }
      
    obstacle.scale=0.1;
    
    //assign lifetime to the variable
    obstacle.lifetime=100;
  
    //add each obstacle to the group
    obstacleGroup.add(obstacle);
 }
  
}

function bananas(){
  
  if (frameCount % 80 === 0){
   var bananas = createSprite(500,290,20,20);
  bananas.x = Math.round(random(400,500));
  bananas.y = Math.round(random(200,300));
  bananas.velocityX=-5;

    var rand = Math.round(random(1));
    switch(rand) {
      case 1: bananas.addImage(bananaImage);
              break;
      default: break;
    }
   
    bananas.scale=0.1;
    
    //assign lifetime to the variable
    bananas.lifetime=100;
  
    //add each banana to the group
     bananasGroup.add(bananas);
 }
  
}
