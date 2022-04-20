var id = null;
var animationIndex = 0; //used to keep track of the current animation step

//background image variables
var elem = document.getElementById("animation");
var parentX = elem.offsetLeft;
var parentY = elem.offsetTop;
var parentWidth = elem.offsetWidth;
var parentHeight = elem.offsetHeight;

//plot area variables
var xAxisStart = 0.4*parentWidth; //bottom left corner of the plotting area
var yAxisStart = 0.8*parentHeight; //bottom left corner of plotting area
var xAxisWidth = Math.round(parentWidth*0.5); //plot width as percentage of background image
var yAxisHeight = Math.round(parentHeight*0.5);//plot height as percentage of background image
var xAxisEnd = xAxisStart + xAxisWidth; //lower right corner of plotting area
var yAxisEnd = yAxisStart - yAxisHeight; //upper left corner of plotting area

//dinosaur dataset
var dataset = "[{\"Name\":\"Albertosaurus\",\"Continent\":\"NorthAmerica\",\"Geological_Period\":\"Cretaceous\",\"Diet\":\"Carnivore\",\"Hip_Type\":\"Lizard\",\"Length_Meters\":9,\"Height_Meters\":3.5},{\"Name\":\"Allosaurus\",\"Continent\":\"Africa,NorthAmerica,Australia\",\"Geological_Period\":\"Jurassic\",\"Diet\":\"Carnivore\",\"Hip_Type\":\"Lizard\",\"Length_Meters\":12,\"Height_Meters\":5},{\"Name\":\"Baryonyx\",\"Continent\":\"Europe\",\"Geological_Period\":\"Cretaceous\",\"Diet\":\"Carnivore\",\"Hip_Type\":\"Lizard\",\"Length_Meters\":10,\"Height_Meters\":4},{\"Name\":\"Camarasaurus\",\"Continent\":\"NorthAmerica\",\"Geological_Period\":\"Jurassic\",\"Diet\":\"Herbivore\",\"Hip_Type\":\"Lizard\",\"Length_Meters\":18,\"Height_Meters\":9},{\"Name\":\"Centrosaurus\",\"Continent\":\"NorthAmerica\",\"Geological_Period\":\"Cretaceous\",\"Diet\":\"Herbivore\",\"Hip_Type\":\"Bird\",\"Length_Meters\":6,\"Height_Meters\":2},{\"Name\":\"Chasmosaurus\",\"Continent\":\"NorthAmerica\",\"Geological_Period\":\"Cretaceous\",\"Diet\":\"Herbivore\",\"Hip_Type\":\"Bird\",\"Length_Meters\":5.2,\"Height_Meters\":3.6},{\"Name\":\"Coelophysis\",\"Continent\":\"NorthAmerica\",\"Geological_Period\":\"Triassic\",\"Diet\":\"Carnivore\",\"Hip_Type\":\"Lizard\",\"Length_Meters\":3,\"Height_Meters\":2},{\"Name\":\"Compsognathus\",\"Continent\":\"Europe\",\"Geological_Period\":\"Jurassic\",\"Diet\":\"Carnivore\",\"Hip_Type\":\"Lizard\",\"Length_Meters\":1,\"Height_Meters\":0.7},{\"Name\":\"Deinonychus\",\"Continent\":\"NorthAmerica\",\"Geological_Period\":\"Cretaceous\",\"Diet\":\"Carnivore\",\"Hip_Type\":\"Lizard\",\"Length_Meters\":3,\"Height_Meters\":1.5},{\"Name\":\"Diplodocus\",\"Continent\":\"NorthAmerica\",\"Geological_Period\":\"Jurassic\",\"Diet\":\"Herbivore\",\"Hip_Type\":\"Lizard\",\"Length_Meters\":26,\"Height_Meters\":8},{\"Name\":\"Dromaeosaurus\",\"Continent\":\"NorthAmerica\",\"Geological_Period\":\"Cretaceous\",\"Diet\":\"Carnivore\",\"Hip_Type\":\"Lizard\",\"Length_Meters\":1.8,\"Height_Meters\":0.8},{\"Name\":\"Edmontosaurus\",\"Continent\":\"NorthAmerica\",\"Geological_Period\":\"Cretaceous\",\"Diet\":\"Herbivore\",\"Hip_Type\":\"Bird\",\"Length_Meters\":13,\"Height_Meters\":3.5},{\"Name\":\"Euoplocephalus\",\"Continent\":\"NorthAmerica\",\"Geological_Period\":\"Cretaceous\",\"Diet\":\"Herbivore\",\"Hip_Type\":\"Bird\",\"Length_Meters\":6,\"Height_Meters\":1.8},{\"Name\":\"Gallimimus\",\"Continent\":\"Asia\",\"Geological_Period\":\"Cretaceous\",\"Diet\":\"Omnivore\",\"Hip_Type\":\"Lizard\",\"Length_Meters\":5.6,\"Height_Meters\":3},{\"Name\":\"Hypsilophodon\",\"Continent\":\"NorthAmerica,Europe\",\"Geological_Period\":\"Cretaceous\",\"Diet\":\"Herbivore\",\"Hip_Type\":\"Bird\",\"Length_Meters\":2,\"Height_Meters\":0.8},{\"Name\":\"Iguanodon\",\"Continent\":\"Africa,NorthAmerica,Europe,Asia\",\"Geological_Period\":\"Cretaceous\",\"Diet\":\"Herbivore\",\"Hip_Type\":\"Bird\",\"Length_Meters\":10,\"Height_Meters\":5},{\"Name\":\"Maiasaura\",\"Continent\":\"NorthAmerica\",\"Geological_Period\":\"Cretaceous\",\"Diet\":\"Herbivore\",\"Hip_Type\":\"Bird\",\"Length_Meters\":9,\"Height_Meters\":2.3},{\"Name\":\"Massospondylus\",\"Continent\":\"NorthAmerica\",\"Geological_Period\":\"Triassic\",\"Diet\":\"Herbivore\",\"Hip_Type\":\"Lizard\",\"Length_Meters\":4,\"Height_Meters\":1},{\"Name\":\"Orodromeus\",\"Continent\":\"NorthAmerica\",\"Geological_Period\":\"Cretaceous\",\"Diet\":\"Herbivore\",\"Hip_Type\":\"Bird\",\"Length_Meters\":2.5,\"Height_Meters\":1},{\"Name\":\"Oviraptor\",\"Continent\":\"Asia\",\"Geological_Period\":\"Cretaceous\",\"Diet\":\"Omnivore\",\"Hip_Type\":\"Lizard\",\"Length_Meters\":1.8,\"Height_Meters\":0.8},{\"Name\":\"Pachycephalosaurus\",\"Continent\":\"NorthAmerica\",\"Geological_Period\":\"Cretaceous\",\"Diet\":\"Herbivore\",\"Hip_Type\":\"Bird\",\"Length_Meters\":8,\"Height_Meters\":6},{\"Name\":\"Parasaurolophus\",\"Continent\":\"NorthAmerica\",\"Geological_Period\":\"Cretaceous\",\"Diet\":\"Herbivore\",\"Hip_Type\":\"Bird\",\"Length_Meters\":10,\"Height_Meters\":5.2},{\"Name\":\"Psittacosaurus\",\"Continent\":\"Asia\",\"Geological_Period\":\"Cretaceous\",\"Diet\":\"Herbivore\",\"Hip_Type\":\"Bird\",\"Length_Meters\":2.5,\"Height_Meters\":1},{\"Name\":\"Tenontosaurus\",\"Continent\":\"NorthAmerica\",\"Geological_Period\":\"Cretaceous\",\"Diet\":\"Herbivore\",\"Hip_Type\":\"Bird\",\"Length_Meters\":7.3,\"Height_Meters\":2.5},{\"Name\":\"Triceratops\",\"Continent\":\"NorthAmerica\",\"Geological_Period\":\"Cretaceous\",\"Diet\":\"Herbivore\",\"Hip_Type\":\"Bird\",\"Length_Meters\":9,\"Height_Meters\":3},{\"Name\":\"Troodon\",\"Continent\":\"NorthAmerica\",\"Geological_Period\":\"Cretaceous\",\"Diet\":\"Carnivore\",\"Hip_Type\":\"Lizard\",\"Length_Meters\":2,\"Height_Meters\":1.3},{\"Name\":\"Tuojiangosaurus\",\"Continent\":\"Asia\",\"Geological_Period\":\"Jurassic\",\"Diet\":\"Herbivore\",\"Hip_Type\":\"Bird\",\"Length_Meters\":7,\"Height_Meters\":2},{\"Name\":\"Tyrannosaurus\",\"Continent\":\"NorthAmerica\",\"Geological_Period\":\"Cretaceous\",\"Diet\":\"Carnivore\",\"Hip_Type\":\"Lizard\",\"Length_Meters\":12,\"Height_Meters\":5.6}]";
var datasetJSON = JSON.parse(dataset);

//image variables
var myCases = [];
var myCursor = null;
var myHeightAttribute = null;
var myLengthAttribute = null;
var myYAxis = null;
var myXAxis = null;
var myActiveHeightAttribute = null;
var myActiveLengthAttribute = null;
var myYAxisWithHeightAttribute = null;
var myXAxisWithLengthAttribute = null;

function loadAnimation() {
  //when adding the image elements to the page
  //make sure cases are added first, then attribute, then cursor always last
  //this will ensure the cursor will always appear on top

  //creates the case images in a mixed up state
  for(var i = 0 ; i < datasetJSON.length ; i++){
    myCases.push(new image(elem, i,
      getRandomInt(xAxisWidth)+xAxisStart,
      getRandomInt(yAxisHeight)+yAxisStart-yAxisHeight,
      10,10,"assets/case-circle.png"));
  }
  
  myHeightAttribute = new image(elem,"height-attribute",parentWidth*.006,parentHeight*.445,parentWidth*.12,parentHeight*.11,"assets/height-attribute.png");
  myHeightAttribute.makeHidden();
  myLengthAttribute = new image(elem,"length-attribute",parentWidth*.006,parentHeight*.34,parentWidth*.12,parentHeight*.11,"assets/length-attribute.png");
  myLengthAttribute.makeHidden();
  
  myXAxis = new image(elem,"x-axis",parentWidth*.39,parentHeight*.82,parentWidth*.53,parentHeight*.02,"assets/x-axis.png");
  myXAxis.makeHidden();
  myYAxis = new image(elem,"y-axis",parentWidth*.38,parentHeight*.26,parentWidth*.015,parentHeight*.56,"assets/y-axis.png");
  myYAxis.makeHidden();

  myActiveHeightAttribute = new image(elem,"active-height-attribute",parentWidth*.006,parentHeight*.445,parentWidth*.12,parentHeight*.11,"assets/active-height-attribute.png");
  myActiveHeightAttribute.makeHidden();
  myActiveLengthAttribute = new image(elem,"active-length-attribute",parentWidth*.006,parentHeight*.34,parentWidth*.12,parentHeight*.11,"assets/active-length-attribute.png");
  myActiveLengthAttribute.makeHidden();

  myXAxisWithLengthAttribute = new image(elem,"x-axis-with-attribute",parentWidth*.373,parentHeight*.844,parentWidth*.57,parentHeight*.055,"assets/xaxis-length.png");
  myXAxisWithLengthAttribute.makeHidden();
  myYAxisWithHeightAttribute = new image(elem,"y-axis-with-attribute",parentWidth*.336,parentHeight*.229,parentWidth*.039,parentHeight*.62,"assets/yaxis-height.png");
  myYAxisWithHeightAttribute.makeHidden();

  myCursor = new image(elem,"cursor",parentWidth*0.5,parentHeight*0.5,20,20,"assets/cursor.png");

  //once images are loaded, start the animation
  animationLoop(animationIndex);
}

function animationLoop(animationIndex) {
  console.log("animation index "+animationIndex);

  var currentFrame = 0;
  var totalFrames = 300;
  clearInterval(id);
  id = setInterval(frame, 1);

  function frame() {

    if (currentFrame == totalFrames) {
      //when the animation is over, 
      //increment the animation index,
      //then we will start the next animation in 2 seconds
      clearInterval(id);
      animationIndex++;
      if(animationIndex==7){
        animationIndex=0;
        //need to reset xy values for some images
        myCursor.resetXY();
        myLengthAttribute.resetXY();
        myHeightAttribute.resetXY();
      }

      setTimeout(() => {animationLoop(animationIndex)},500);

    } else {
      //depending on animation index, 
      //we do different animations

      if(animationIndex == 0){
        //move cursor to length attribute
        if(currentFrame==0) {
          myCursor.setStartEnd(parentWidth*0.5,parentHeight*0.5,myLengthAttribute.x + myLengthAttribute.w/2,myLengthAttribute.y + myLengthAttribute.h/2);
        }
        myCursor.moveMe(totalFrames);

      } 
      else if (animationIndex == 1){
        //drag length attribute to x-axis
        if(currentFrame==0) {
          myCursor.setStartEnd(myLengthAttribute.x + myLengthAttribute.w/2,myLengthAttribute.y + myLengthAttribute.h/2,myXAxisWithLengthAttribute.x+myXAxisWithLengthAttribute.w/2,myXAxisWithLengthAttribute.y+myXAxisWithLengthAttribute.h/2);
          myLengthAttribute.setStartEnd(myLengthAttribute.x + myLengthAttribute.w/2,myLengthAttribute.y + myLengthAttribute.h/2,myXAxisWithLengthAttribute.x+myXAxisWithLengthAttribute.w/2,myXAxisWithLengthAttribute.y+myXAxisWithLengthAttribute.h/2);
        }
        if(myLengthAttribute.isVisible==false) myLengthAttribute.makeVisible();
        myCursor.moveMe(totalFrames);
        myLengthAttribute.moveMe(totalFrames);

      } 
      else if (animationIndex == 2){
        //create dot plot
        if(currentFrame==0) calculateCaseDotPlotXYDestination();
        if(myLengthAttribute.isVisible==true) myLengthAttribute.makeHidden();
        if(myXAxis.isVisible==false) myXAxis.makeVisible();
        if(myXAxisWithLengthAttribute.isVisible==false) myXAxisWithLengthAttribute.makeVisible();
        if(myActiveLengthAttribute.isVisible==false) myActiveLengthAttribute.makeVisible();
        
        moveCases(totalFrames);

      } 
      else if (animationIndex == 3){
        //move cursor to height attribute
        if(currentFrame==0) {
          myCursor.setStartEnd(myXAxisWithLengthAttribute.x+myXAxisWithLengthAttribute.w/2,myXAxisWithLengthAttribute.y+myXAxisWithLengthAttribute.h/2,parentWidth*.006+ myHeightAttribute.w/2,parentHeight*.445+ myHeightAttribute.h/2);
        }

        myCursor.moveMe(totalFrames);
      }
      else if (animationIndex == 4){
        //drag height attribute to y-axis
        if(currentFrame==0) {
          myCursor.setStartEnd(parentWidth*.006+ myHeightAttribute.w/2,parentHeight*.445 + myHeightAttribute.h/2,myYAxisWithHeightAttribute.x+myYAxisWithHeightAttribute.w/2,myYAxisWithHeightAttribute.y+myYAxisWithHeightAttribute.h/2);
          myHeightAttribute.setStartEnd(myHeightAttribute.x + myHeightAttribute.w/2,myHeightAttribute.y + myHeightAttribute.h/2,parentWidth*.35,parentHeight*.55);
        }
        if(myHeightAttribute.isVisible==false) myHeightAttribute.makeVisible();

        myCursor.moveMe(totalFrames);
        myHeightAttribute.moveMe(totalFrames);
      }
      else if (animationIndex == 5){
        //create scatter plot
        if(currentFrame==0) calculateCaseScatterPlotXYDestination();
        if(myHeightAttribute.isVisible==true) myHeightAttribute.makeHidden();
        if(myActiveHeightAttribute.isVisible==false) myActiveHeightAttribute.makeVisible();
        if(myYAxis.isVisible==false) myYAxis.makeVisible();
        if(myYAxisWithHeightAttribute.isVisible==false) myYAxisWithHeightAttribute.makeVisible();

        moveCases(totalFrames);
      }
      else if (animationIndex == 6){
        //reset plot

        if(currentFrame==0) {
          calculateRandomCaseXYDestination();
          myCursor.setStartEnd(parentWidth*.35,parentHeight*.5,parentWidth*0.5,parentHeight*0.5);
        }
        if(myXAxis.isVisible==true) myXAxis.makeHidden();
        if(myXAxisWithLengthAttribute.isVisible==true) myXAxisWithLengthAttribute.makeHidden();
        if(myActiveLengthAttribute.isVisible==true) myActiveLengthAttribute.makeHidden();
        if(myActiveHeightAttribute.isVisible==true) myActiveHeightAttribute.makeHidden();
        if(myYAxis.isVisible==true) myYAxis.makeHidden();
        if(myYAxisWithHeightAttribute.isVisible==true) myYAxisWithHeightAttribute.makeHidden();
        
        moveCases(totalFrames);
        myCursor.moveMe(totalFrames);
      }
      currentFrame++; 
    }
  }
}

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

function moveCases(totalFrames){
  for(var i = 0 ; i < myCases.length ; i++){
    myCases[i].moveMe(totalFrames);
  }
}

function calculateCaseScatterPlotXYDestination(){
  //calculating the destinations for the cases to create a dot plot
  var maxX = 0;
  var minX = 1000000;
  var maxY = 0;
  var minY = 1000000;
  for(var i = 0 ; i < datasetJSON.length ; i++){
    if(datasetJSON[i].Length_Meters>maxX) maxX = datasetJSON[i].Length_Meters;
    if(datasetJSON[i].Length_Meters<minX) minX = datasetJSON[i].Length_Meters;
    if(datasetJSON[i].Height_Meters>maxY) maxY = datasetJSON[i].Height_Meters;
    if(datasetJSON[i].Height_Meters<minY) minY = datasetJSON[i].Height_Meters;
  }

  for(var i = 0 ; i < myCases.length ; i++){
    var x = translate(datasetJSON[i].Length_Meters,minX,maxX,xAxisStart,xAxisEnd);
    var y = translate(datasetJSON[i].Height_Meters,minY,maxY,yAxisStart,yAxisEnd);
    myCases[i].xEnd = x;
    myCases[i].yEnd = y;
    myCases[i].xStart = myCases[i].x;
    myCases[i].yStart = myCases[i].y
  }
}

function calculateCaseDotPlotXYDestination(){
  //calculating the destinations for the cases to create a dot plot
  var maxX = 0;
  var minX = 1000000;
  for(var i = 0 ; i < datasetJSON.length ; i++){
    if(datasetJSON[i].Length_Meters>maxX) maxX = datasetJSON[i].Length_Meters;
    if(datasetJSON[i].Length_Meters<minX) minX = datasetJSON[i].Length_Meters;
  }

  for(var i = 0 ; i < myCases.length ; i++){
    var x = translate(datasetJSON[i].Length_Meters,minX,maxX,xAxisStart,xAxisEnd);
    var y = yAxisStart;
    myCases[i].xEnd = x;
    myCases[i].yEnd = y;
    myCases[i].xStart = myCases[i].x;
    myCases[i].yStart = myCases[i].y
  }

  //check if cases overlap
  for(var i = 0 ; i < myCases.length ; i++){
    for(var j = 0 ; j < myCases.length ; j++){
      if(i==j) continue;
      if(dist(myCases[i].xEnd, myCases[i].yEnd, 
          myCases[j].xEnd, myCases[j].yEnd)<myCases[i].w){
        myCases[j].yEnd=myCases[j].yEnd-myCases[j].w;
      }
    }
  }
}

function calculateRandomCaseXYDestination(){
  for(var i = 0 ; i < myCases.length ; i++){
    myCases[i].xEnd = getRandomInt(xAxisWidth)+xAxisStart;
    myCases[i].yEnd = getRandomInt(yAxisHeight)+yAxisStart-yAxisHeight;
    myCases[i].xStart = myCases[i].x;
    myCases[i].yStart = myCases[i].y
  }
}

function dist(x1,y1,x2,y2){
  return Math.sqrt((x2-x1)*(x2-x1)+(y2-y1)*(y2-y1))
}

function translate(value, leftMin, leftMax, rightMin, rightMax){
    // Figure out how 'wide' each range is
    leftSpan = leftMax - leftMin
    rightSpan = rightMax - rightMin

    // Convert the left range into a 0-1 range (float)
    valueScaled = parseFloat(value - leftMin) / parseFloat(leftSpan)

    // Convert the 0-1 range into a value in the right range.
    return rightMin + (valueScaled * rightSpan)
}

class image {
  constructor(elem,id,_x,_y,_w,_h,source){
    this.w = _w;
    this.h = _h;
    this.myImage = new Image(this.w,this.h);
    this.myImage.src = source;
    this.myImage.style.position = "absolute";
    this.myImage.id = id;
    this.x = _x;
    this.y = _y;
    this.x0 = this.x; //starting x, used for reseting animation
    this.y0 = this.y; //starting y, used for reseting animation
    this.xStart = this.x; 
    this.yStart = this.y;
    this.xEnd = this.x;
    this.yEnd = this.y;
    this.left = this.x;
    this.top = this.y;
    elem.appendChild(this.myImage);
    this.updateImgXY();
    this.deltaX = 0;
    this.deltaY = 0;
    this.isVisible = true;
  }

  updateImgXY(){
    var img = document.getElementById(this.myImage.id);
    img.style.left = this.left +"px";
    img.style.top = this.top +"px";
  }

  setX(x){
    this.left = x;
    this.x = x;
  }

  setY(y){
    this.top = y;
    this.y = y;
  }

  moveMe(totalFrames){
    this.deltaX = (this.xEnd-this.xStart)/totalFrames;
    this.deltaY = (this.yEnd-this.yStart)/totalFrames;
    this.setX(this.deltaX+this.x);
    this.setY(this.deltaY+this.y);
    this.updateImgXY();
  }

  makeHidden(){
    document.getElementById(this.myImage.id).style.visibility = "hidden";
    this.isVisible = false;
  }

  makeVisible(){
    document.getElementById(this.myImage.id).style.visibility = "visible";
    this.isVisible = true;
  }

  setStartEnd(_x1,_y1,_x2,_y2){
    this.xStart = _x1;
    this.yStart = _y1;
    this.xEnd = _x2;
    this.yEnd = _y2;
  }

  resetXY(){
    this.setX(this.x0);
    this.setY(this.y0);
    this.setStartEnd(this.x0,this.y0,this.x0,this.y0);
  }
}

//for debugging locations in the image:
// function printMousePos(event) {
//   console.log(
//     "clientX: " + event.clientX +
//     " - clientY: " + event.clientY);
// }

// document.addEventListener("click", printMousePos);