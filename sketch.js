var dog,dogImg,dogImg1;
var database;
var feed,add;
var foodobject;
var Feedtime;
var Lastfeed;
var foodS,foodStock;

function preload(){
   dogImg=loadImage("Images/Dog.png");
   dogImg1=loadImage("Images/happy dog.png");
  
  }

//Function to set initial environment
function setup() {
  database=firebase.database();
  createCanvas(800,500);

  foodobject=new Food();
  dog=createSprite(250,300,150,150);
  dog.addImage(dogImg);
  dog.scale=0.15;

  foodStock=database.ref('Food');
  foodStock.on("value",readStock);
  textSize(20); 
  feed = createButton("FEED DOG");
  feed.position(900,60);
  feed.mousePressed(FeedDog);

  add = createButton("ADD FOOD");
  add.position(800,60);
  add.mousePressed(AddFood);

}

// function to display UI
function draw() {
  background(46,139,87);
 
 

  drawSprites();
  fill(255,255,254);
  stroke("black");
  text("Food remaining : "+foodS,170,200);
 
}

//Function to read values from DB
function readStock(data){
  foodS=data.val();
}

function showError(){
  console.log("Error in writing to the database");
}

//Function to write values in DB
function writeStock(x){
  if(x<=0){
    x=0;
  }else{
    x=x-1;
  } 
  database.ref('/').update({
    Food:x
  })
}
function AddFood(){
  foodS++;
  database.ref('/').update({
    Food:foodS
  }
  
  )
  }
  function FeedDog(){
  
  dog.addImage(dogImg1)
  foodobject.updateFoodStock(foodobject.getFoodStock()-1)
   database.ref('/').update({
     Food:foodobject.getFoodStock(),
     FeedTime:hour ()
   })
  }
