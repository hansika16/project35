var d1,happyDog,dog
var database,foodS,foodStock
var feed,addFood,fedTime,lastFed

function preload()
{
  d1=loadImage("dogImg.png") 
  happyDog=loadImage("dogImg1.png")
}

function setup()
{
  createCanvas(500,500);
  background(46,139,87)
  database=firebase.database();
  
  dog=createSprite(250,250,10,10)
  dog.addImage(d1)
  dog.scale=0.2

  foodStock=database.ref('Food').on("value",readStock)

  feed=createButton("Feed the dog")
  feed.position(700,95)
  feed.mousePressed(feedDog)

  addFood=createButton("Add food")
  addFood.position(800,95)
  addFood.mousePressed(addFoods)
}


function draw() 
{  
  background("black")

  textSize(20)
  text("Note: Press up arrow to feed the dog Milk!",100,100)

  if(lastFeed>=12)
  {
    text("Last Feed: "+lastFeed%12+"PM",350,30)
  }
  else if(lastFeed===0)
  {
    text("Last Feed: 12 AM",350,30)
  }
  else
  {
    text("Last Feed: "+lastFed+ "AM",350,30)
  }

    fedTime=database.ref('FeedTime')
    fedTime.on("value",function(data){
    lastFed=data.val() 
  })

  food.display()
  drawSprites();
}

function readStock(data)
{
  foodS=data.val()
}

function writeStock(x)
{
  if(x<0)
  {
    x=0
  }
  else
  {
    x=x-1
  }
  database.ref('/').update({
    Food:x 
  })
}

function addFood()
{
  foodS++
  database.ref('/').update({
    Food:foodS 
  })
}

function feedDog()
{
  dog.addImage(happyDog)

  foodObj.updateFoodStock(foodObj.getFoodStock()-1)
  database.ref('/').update({
    Food:foodObj.getFoodStock()
    //FeedTime:hour()
  })
}



