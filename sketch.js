// creating variables
var bananaImage;
var obstacleImage;
var scene , backgroundImg;
var score; 
var PLAY = 1;
var END = 0;
var touchCount = 0;
var player , player_running, player_scale, player_end;
var gameState = PLAY;
var gameOver, restart, gameOverImg, restartImg;
var invisibleGround ;

function preload(){
  
// loading images for variables
  backgroundImg = loadImage("images/imageGround.jpg");
  
  player_running = loadAnimation("images/Monkey_01.png","images/Monkey_02.png" ,
  "images/Monkey_03.png","images/Monkey_04.png","images/Monkey_05.png" ,
  "images/Monkey_06.png","images/Monkey_07.png","images/Monkey_08.png" ,
  "images/Monkey_09.png","images/Monkey_10.png");
  
  player_end = loadImage("images/Monkey_01_end.png");
  
  bananaImage = loadImage("images/banana.png");
  obstacleImage = loadImage("images/stone.png");
  
  gameOverImg = loadImage("images/game_over.png");
  restartImg = loadImage("images/restart.jpg");
}


function setup() {
  createCanvas(displayWidth*3/4, displayHeight*3/4);
  
// creating a object of Ground()
  scene = new Ground();

// creating player sprite   
  player = createSprite(278, 896, 10, 10);
  player.setCollider("circle",30,0,180);
  player.addAnimation("running" , player_running );
  player.addAnimation("collided", player_end);
  player.scale = 0.15;
  player.velocityX = 4;

// creating invisibleGround sprite     
  invisibleGround = createSprite(displayWidth*10/2,995,displayWidth*10,5);
  invisibleGround.visible = false;
  
// creating new group  
  foodGroup  = new Group();
  obstaclesGroup = new Group();
  
// creating score  
  score = 0;
  
// creating gameover and restart sprite  
  gameOver = createSprite(displayWidth*2, 896);
  restart = createSprite(displayWidth*2, 958);
  gameOver.addImage(gameOverImg);
  gameOver.scale = 0.10;
  restart.addImage(restartImg);
  restart.scale = 0.2;
}


function draw() {
 background(220);

  if(gameState === PLAY){
    scene.display();

// setting the gameOver ,restart invisible 
    gameOver.visible = false;
    restart.visible = false;
    
    camera.position.x = player.x;
    camera.position.y = player.y;

// on the press pf space the player jumps    
    if(keyDown("space") && player.y >= 740){
      player.velocityY = -15;
    }
    
// setting the gravity    
    player.velocityY = player.velocityY + 0.8;

// calling the food ,spawnObstacles functions
    food();
    spawnObstacles();
    
// adding the score    
    if(foodGroup.isTouching(player)){
      score = score+ 2;
      foodGroup.destroyEach();
      
// increasing the measure in different score      
      switch(score){
        case 10 : player.scale = player.scale + 0.03;
          break;
        case 20 : player.scale = player.scale + 0.03;
          break;
        case 30 : player.scale = player.scale + 0.03;
          break;
        case 40 : player.scale = player.scale + 0.03;
          break;
        case 50 : player.scale = player.scale + 0.03;
          break;
        default : break;
      }
    }

// Game = End
  if(player.x >= displayWidth*8){
    console.log("In Game state End");
    gameState = END;
  }

// the functions while obstacle is touching the player    
    if(obstaclesGroup.isTouching(player)){
      player.scale = 0.15;
      score = score - 1;
      player.velocityY = 0;
      touchCount++;
      if(touchCount >= 2){
        gameState = END;
      }
    }
  }
    
  if(gameState === END){
    
//  setting the gameOver ,restart visible 
    gameOver.visible = true;
    restart.visible = true;
    
 // functions of gameState "END" 
    player.velocityX = 0;
    player.changeAnimation("collided", player_end);
    gameOver.addImage(gameOverImg);
    restart.addImage(restartImg);
    console.log(restart);
    camera.position.x = gameOver.x;
    
 // calling the reset function       
    if(mousePressedOver(restart)) {
      reset();
    }
 
  }
 
 // monkey.collides the invisibleGround
    player.collide(invisibleGround);

  drawSprites();
 
 // scoreboard  
  stroke("black");
  textSize(20);
  fill("black");
  text("score : " + score , player.x +87,696 );
}

// creating function for reset
function reset(){
  gameState = PLAY;
  score = 0;
  touchCount = 0;
  gameOver.visible = false;
  restart.visible = false;
  
  obstaclesGroup.destroyEach();
  foodGroup.destroyEach();
  scene.velocityX = -2;
  player.changeAnimation("running",player_running);
  player.x = 278;
  player.velocityX = 4;
  
}

// creating function for food
function food(){
  if(frameCount%80 === 0){
    
 //creating the obstacle     
    var banana  = createSprite(278, 743,20,20);
    banana.addAnimation("banana.png",bananaImage);
    banana.scale = 0.1;
    banana.x =  Math.round(random(player.x+200,player.x+300));
    banana.y = Math.round(random(650, 780));
   
    banana.depth = player.depth;
  
 // setting the lifetime    
    banana.lifetime = 265;

  //add banana to the bananaGroup
    foodGroup.add(banana);

  }
}

// creating function for spawnobstacles
function spawnObstacles(){
  if(World.frameCount%300 === 0){
    
  // creating the obstacle
    var obstacle = createSprite(690,972,20,20);
    obstacle.setCollider("circle",0,0,100);
    obstacle.addAnimation("stone.png", obstacleImage);
    obstacle.x =  Math.round(random(player.x+200,player.x+400));
    obstacle.scale = random(0.1,0.3);
    
  //assign lifetime to the obstacle           
    obstacle.lifetime = 265;
   
 //  adding the depth for player   
    obstacle.depth = player.depth;
    player.depth = player.depth + 1;
    
  //add obstacle to the Obstaclesgroup
    obstaclesGroup.add(obstacle);
    
  }
}
  