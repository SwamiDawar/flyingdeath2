var ghost, ghostImage;
var tower, towerImage;
var door, doorImage;
var climber, climberImage;
var doorGroup, climberGroup, deathPlatGroup;
var deathPlat;
var PLAY = 1;
var END = 0;
var gameState = PLAY;


function preload(){
  towerImage = loadImage('tower.png');
  doorImage = loadImage('door.png');
  climberImage = loadImage('climber.png');
  ghostImage = loadImage('ghost-standing.png');
  ghostJumpImage = loadImage('ghost-jumping.png');
}


function setup(){
  createCanvas(windowWidth,windowHeight);
  
  tower = createSprite(windowWidth / 2, windowHeight / 2, width, height);
  tower.addImage(towerImage);
  
  doorGroup = new Group();
  climberGroup = new Group();
  deathPlatGroup = new Group();
  
  ghost = createSprite(width / 2, height / 2 , 10, 10);
  ghost.addImage(ghostImage);
  ghost.scale = 0.4;
}

function draw(){
  //console.log(height / 2);
  if(gameState === PLAY){
    tower.velocityY = 2;
    if(tower.y > height){
      tower.y = height / 2;   
    }
    spawnDoors();
    if(keyDown('space')){
      ghost.velocityY = -10;
    }
    if(keyDown('LEFT_ARROW')){
      ghost.velocityX = -2;
    }
    if(keyWentUp('LEFT_ARROW')){
      ghost.velocityX = 0;
    }
    if(keyDown('RIGHT_ARROW')){
      ghost.velocityX = 2;
    }
    if(keyWentUp('RIGHT_ARROW')){
      ghost.velocityX = 0;
    }
    
    if(ghost.isTouching(deathPlatGroup)){
      gameState = END;
    }
    
    
    ghost.collide(climberGroup);
    ghost.velocityY = ghost.velocityY + 0.8;
  }
  if(gameState === END){
    climberGroup.destroyEach();
    deathPlatGroup.destroyEach();
    doorGroup.destroyEach();
    ghost.velocityY = 0;
    ghost.velocityX = 0;
    tower.velocityY = 0;
    ghost.visible = false;
    tower.visible = false;
    textSize(30);
    fill('yellow');
    text("GameOver", width / 2 - 100, height / 2);
  }
  ghost.depth = doorGroup.depth;
  ghost.depth = ghost.depth + 1;
  drawSprites();
  ghost.setCollider('rectangle', -20, 30, 170, 250);
}

function spawnDoors(){
  if(frameCount % 200 === 0){
    door = createSprite(width / 2,0,20,20);
    door.x = Math.round(random(width / 2 - 200, width / 2 + 200));
    door.addImage(doorImage);
    door.velocityY = 2;
    doorGroup.add(door);
    door.lifetime = height / 2;
    
    climber = createSprite(door.x, 65, 20,20);
    climber.addImage(climberImage);
    climber.velocityY = 2;
    climberGroup.add(climber);
    climber.lifetime = height / 2;
    
    deathPlat = createSprite(door.x, 75,100,10);
    deathPlat.velocityY = 2;
    deathPlat.lifetime = height / 2;
    deathPlat.visible = false;
    deathPlatGroup.add(deathPlat);
  }
  
}