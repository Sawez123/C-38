var p1,p2,corona1,corona2,corona3;
var blast,blastImage,space,spaceImage;
var spaceShip,spaceShipImage, laserImage;
var shoot = 0;
var score = 0;
var laser,virusGroup,laserGroup;
var explosionSound,laserSound,explasionImage;
var instruction = 0;
var play = 1;
var end = 2;
var gameState = instruction;
var endline,canvas;
function preload() {
  spaceImage = loadImage("space.png");
  spaceShipImage = loadImage("spaceship.png");
  laserImage = loadImage("laser.png");
  corona1 = loadImage("corona1.jpeg");
  corona2 = loadImage("corona2.jpg");
  corona3 = loadImage("corona3.jpeg");
  blastImage = loadImage("blast.png");
  explasionImage = loadImage("blast.png");
  explosionSound = loadSound("explosion.mp3");
  laserSound = loadSound("laser sound.mp3");
}

function setup() {  
  canvas = createCanvas(1000,700);
  space = createSprite(250,350,30,20);
  space.addImage(spaceImage);
  space.velocityY = (5 + score/10);

  spaceShip = createSprite(250,600);
  spaceShip.addImage(spaceShipImage);
  spaceShip.scale = 0.6;
  
  p1 = createSprite(250,600);
  //p1.debug = true;
  p1.setCollider("rectangle",70,-27,5,265,156);
  p1.visible = false;
  p2 = createSprite(250,600); 
  p2.setCollider("rectangle",-70,-27,5,265,24);
  //p2.debug = true;
  p2.visible = false;
  
  virusGroup = new Group;
  laserGroup = new Group;
  
  endline = createSprite(250,700,500,5);
  endline.visible = false;
}

function draw() {
  background(0);

  if(gameState === play) {
    // console.log(frameCount);
    
    if(space.y > 800) {
      space.y = 300;
    }
    
    shoot = shoot - 1;

    if(keyDown("space") && shoot < 460) {
      laser = createSprite(spaceShip.x,spaceShip.y - 130);
      laser.addImage(laserImage);
      laser.velocityY = -8; 
      laser.scale = 0.7;
      laserGroup.add(laser);
      laserSound.play();
      //console.log(laser.x);
      shoot = laser.y;
    }  

    if(keyDown("right") && spaceShip.x < 1400) {
      spaceShip.x = spaceShip.x + 10;
      p1.x = p1.x + 10;
      p2.x = p2.x + 10;
    }

    if(keyDown("left") && spaceShip.x > 50) {
      spaceShip.x = spaceShip.x - 10;
      p1.x = p1.x - 10;
      p2.x = p2.x - 10;
    }
    
    if(virusGroup.isTouching(p2) || virusGroup.isTouching(p1)) {
      virusGroup.destroyEach();
      var blast = createSprite(spaceShip.x,spaceShip.y - 50);
      blast.addImage(blastImage);
      blast.lifetime = 25;
      explosionSound.play();
      spaceShip.destroy();
      gameState = end;
    }
    
    if(virusGroup.isTouching(laserGroup)) {
      virusGroup.destroyEach();
      laserGroup.destroyEach();
      explosionSound.play();
      score = score + 1;
    }

    covid();
    drawSprites();
    
    stroke("white");
    fill("white");
    textSize(30);
    text("score : " + score,210,60)
    
    if(virusGroup.isTouching(endline)) {
      virusGroup.destroyEach();
    }
    
  }
  else if(gameState === end) {
    space.velocityY = 0;
    stroke("white");
    fill(0,227,146);
    textSize(40);
    text("GAME OVER!",canvas.width/2-400,canvas.height/2);
    text("You got infected by the virus",canvas.width/2-400,canvas.height/2+100);
    text("Your final score:"+score,canvas.width/2-400,canvas.height/2+200);

    
  }


  if(gameState === instruction) {
    stroke("white");
    fill(0,227,146);
    textFont("trebuchetMS")
    textSize(50);
    text("------VIRUS KILLER------",canvas.width/2-300,canvas.height/2-300);
    text("ENJOY THE GAME!",canvas.width/2-300,canvas.height/2+100);
    stroke("yellow");
    fill("yellow");
    textSize(35);
    text("year 2020 .....",canvas.width/2-300,canvas.height/2-250);
    text(" Some viruses are coming towords you.",canvas.width/2-300, canvas.height/2 - 210);
    text("  You are in space, Don't let the virus touch you or enter **EARTH**.",canvas.width/2-500,canvas.height/2-170);
    text("  Protect yourself from getting infected. !",canvas.width/2-300,canvas.height/2-130);
    text("  press 'space' to shoot and kill the virus.",canvas.width/2-300,canvas.height/2-90);
    text("  use right and left arrows to move.",canvas.width/2-300,canvas.height/2-50);
    text("  press 's' to start game.",canvas.width/2,canvas.height/2-10);
    
    if(keyDown("s")) {
      gameState = play;
    } 
    if(keyDown("r")) {
      gameState = instruction;
    }
  }
}
  

function covid() {
  if(frameCount % 110 === 0) {
  
    var virus = createSprite(Math.round(random(50,1350)),-20);
    virus.velocityY = (6 + score/10);
    virus.lifetime = 200;
    virus.scale = random(0.4,0.5);
    //virus.debug = true;

    var rand = Math.round(random(1,3));
    switch(rand) {
      case 1: virus.addImage(corona1);
      virus.setCollider("circle",-80,10,160);
              break;
      case 2: virus.addImage(corona2);
              virus.setCollider("circle",50,0,150);
              break;
      case 3: virus.addImage(corona3);
              virus.setCollider("circle",0,0,170)
      default: break;
    }
    
    //console.log(virus.x);
    virusGroup.add(virus);
  }
}