var PLAY=1;
var END=0;
var gameState=1;

var knife;
var fruit,fruitGroup;
var monster,monsterGroup;
var score;
var gameover,gameoverSound;

var knifeSound;

function preload(){
  //loading Images
  knife_Image=loadImage("sword.png")
  fruit1_Image=loadImage("fruit1.png")
  fruit2_Image=loadImage("fruit2.png")
  fruit3_Image=loadImage("fruit3.png")
  fruit4_Image=loadImage("fruit4.png")
  monsterImage=loadImage("alien1.png")
  knifeSound = loadSound("knifeSound.mp3")
  gameoverSound = loadSound("gameover.mp3")
  gameover_Image=loadImage("gameover.png")
}

function setup(){
   createCanvas(500,500);
   //creating knife
 knife = createSprite(40,200,20,20);
  knife.addImage("sword",knife_Image);
  knife.scale=0.59;
   gameover= createSprite(250,250,100,100);
     gameover.addImage("gameover",gameover_Image)
  fruitGroup=new Group();
  enemyGroup=new Group();
    score = 0  
} 
function draw(){
background("skyblue");
  
  
    if(gameState === PLAY){
 
      //move knife with mouse
  knife.y=World.mouseY;
  knife.x=World.mouseX;
    fruits();
     gameover.visible=false;
    }
  
   else if (gameState === END){
     score=0

     fruitGroup.visible=false;
     monster.visible=false;
     knife.visible=false;
     gameover.visible=true;
   }
  
  
if(knife.isTouching(fruitGroup)){
   score=score+5;
  fruitGroup.destroyEach();
  knifeSound.play();
}

  if (knife.isTouching(enemyGroup)){
    enemyGroup.destroyEach();
    fruitGroup.destroyEach();
   gameoverSound.play();
    gameState=END;
   }
  
    if(keyDown("space")){
       gameState=PLAY
      knife.visible=true;;
      gameover.visible=false;
    }
  
  text("Score: "+ score, 400,50);

  
   enemy();

  drawSprites();
}
function fruits(){
  if(World.frameCount%80===0){
    fruit=createSprite(520,200,20,20);
    fruit.scale=0.2;
    //fruit.debug=true;
    r=Math.round(random(1,4));
    if(r==1){
      fruit.addImage("fruit1",fruit1_Image)
    }else if(r==2){
      fruit.addImage("fruit2",fruit2_Image)
    }else if(r==3){
      fruit.addImage("fruit3",fruit3_Image)
  }else if(r==4){
      fruit.addImage("fruit4",fruit4_Image)
  }
  fruit.y=Math.round(random(50,340));
    
    fruit.velocityX=-(7+(score/4));
   
    
 fruitGroup.add(fruit);
  }
}
  
function enemy(){
  if(World.frameCount%100===0){
    monster=createSprite(900,200,20,20);
    monster.addImage("alien1",monsterImage);
    monster.y=Math.round(random(100,300));
    monster.velocityX=-(8+(score/4));
    monster.setLifetime=50;
    
    enemyGroup.add(monster)
  }
}
   