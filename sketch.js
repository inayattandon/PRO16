
var monkey , monkey_running;
var banana ,bananaImage, obstacle, obstacleImage;
var FoodGroup, obstacleGroup;
var score;
var survivalTime;

function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
}



function setup() {
  createCanvas(600, 600);
  monkey = createSprite(50,320,20,50);
  monkey.addAnimation("running", monkey_running);

  monkey.scale = 0.1;
  
  ground = createSprite(300,330,1200,20);
  ground.velocityX = -4;

  ground.x = ground.width /2;
  
  obstacleGroup = createGroup();
  foodGroup = createGroup();
  
  score = 0;
  
  survivalTime = 0;

}


function draw() {
 background("white");

  text("Score: "+ score, 500,50);
  text("Survival Time: " + survivalTime, 350, 50);
  
  monkey.collide(ground);
  
   if (ground.x < 0){
      ground.x = ground.width/2;
    }
  
   if(keyDown("space")) {
        monkey.velocityY = -12;
    }
  
    monkey.velocityY = monkey.velocityY + 0.8
  
    spawnFood();

    spawnObstacle();
    
    if(obstacleGroup.isTouching(monkey)){
      ground.velocityX = 0;
      monkey.velocityY = 0;
      obstacleGroup.setVelocityXEach(0);
      foodGroup.setVelocityXEach(0);
      
      obstacleGroup.setLifetimeEach(-1);
      foodGroup.setLifetimeEach(-1);
     
    }
  
  if(foodGroup.isTouching(monkey)){
    score = score+1;
    foodGroup[0].destroy();
  }
  
      survivalTime = survivalTime + Math.round(getFrameRate()/60);
  
  drawSprites();
}

function spawnObstacle(){
 if (frameCount % 300 === 0){
   obstacle = createSprite(600,302,10,40);
   obstacle.velocityX = -(6 + score/100);
   
   obstacle.addImage(obstacleImage);
           
    obstacle.scale = 0.1;
    obstacle.lifetime = 300;
   
    obstacleGroup.add(obstacle);
 }
}

function spawnFood() {
  if (frameCount % 80 === 0) {
    banana = createSprite(600,120,40,10);
    banana.y = Math.round(random(200,270));
    banana.addImage(bananaImage);
    banana.scale = 0.05;
    banana.velocityX = -3;
 
    banana.lifetime = 200;
    
    banana.depth = monkey.depth;
    monkey.depth = monkey.depth + 1;
    
    foodGroup.add(banana);
  }
}

