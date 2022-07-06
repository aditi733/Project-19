var brickImg, brick;
var doorImg, door, doorsGroup;
var climberImg, climber, climbersGroup;
var mario, marioImg;
var invisibleBlockGroup, invisibleBlock;
var gameState = "play"

function preload(){
  brickImg = loadImage("brick.png");
  doorImg = loadImage("door.png");
  climberImg = loadImage("climber.png");
  marioImg = loadImage("mario.png");
  arcadeSound = loadSound("arcade.mp3");
}

function setup() {
  createCanvas(600, 600);
  brick = createSprite(300,300);
  brick.addImage("brick",brickImg);
  brick.velocityY = 1;
  mario = createSprite(200,200)
  mario.addImage("marioImg", marioImg)
  mario.scale=0.3
  
  doorsGroup=new Group()
  climbersGroup=new Group()
  invisibleBlockGroup= new Group()
}

function draw() {
  background(200);
  arcadeSound.play()
  if (gameState==='play'){
    
    if (keyDown('space')){
      mario.velocityY=-10

    }
    if (keyDown('left')){
      mario.x=mario.x-3
    }
    if (keyDown('right')){
      mario.x=mario.x+3
    }
    mario.velocityY=mario.velocityY+0.8
    if(brick.y > 400){
      brick.y = 300
    }
    if (mario.isTouching(invisibleBlockGroup)||mario.y>600){
      mario.destroy()
      gameState='end'
    }
    if (climbersGroup.isTouching(mario)){
      mario.velocityY=0
    }
    doors()
  
  
  
  drawSprites()
}
if (gameState==='end'){
  textSize(50)
  fill('yellow')
  text('Game Over', 150,250)
  
}
}
function doors(){
  if (frameCount%240===0){
    door=createSprite(200,-50)
    climber=createSprite(200,10)
    invisibleBlock=createSprite(200,15)
    invisibleBlock.width=climber.width
    invisibleBlock.height=2
    door.x=Math.round(random(120,400))
    climber.x=door.x
    invisibleBlock.x=door.x

    climber.addImage('climberImg', climberImg)
    door.addImage('doorImg', doorImg)
    door.velocityY=1
    climber.velocityY=1
    invisibleBlock.velocityY=1
    mario.depth=door.depth
    mario.depth+=1
    door.lifetime=600
    climber.lifetime=600
    invisibleBlock.lifetime=600
    
    doorsGroup.add(door)
    climbersGroup.add(climber)
    invisibleBlockGroup.add(invisibleBlock)
  }
  
}
