var id = null;
var animationIndex = 0; //used to keep track of the current animation step

//background image variables
var elem = document.getElementById("animation");
var maxWidth = 808;
var maxHeight = 520;
var parentX = elem.offsetLeft;
var parentY = elem.offsetTop;
var parentWidth = maxWidth;//elem.offsetWidth;
var parentHeight = maxHeight;//elem.offsetHeight;
var heightToWidthRatio = maxHeight/maxWidth;

//plot area variables
var xAxisStart = 325; //bottom left corner of the plotting area
var yAxisStart = 365; //bottom left corner of plotting area
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
    myCases.push(new image(
      elem, //parent div
      i, //id
      getRandomInt(xAxisWidth)+xAxisStart, //x
      getRandomInt(yAxisHeight)+yAxisStart-yAxisHeight, //y
      10, //width
      10, //height
      "assets/case-circle.png"));  //image source
  }
  
  //image constructor(elem, id, x , y, width , height, source)
  myHeightAttribute = new image(
    elem, //parent div
    "height-attribute", //id
    parentWidth*.0055, //x
    parentHeight*.388, //y
    parentWidth*.12, //width
    parentHeight*.11, //height
    "assets/height-attribute.png"); //image source
  myHeightAttribute.makeHidden();
  myLengthAttribute = new image(
    elem,
    "length-attribute",
    parentWidth*.0055,
    parentHeight*.276,
    parentWidth*.12,
    parentHeight*.11,
    "assets/length-attribute.png"); //image source
  myLengthAttribute.makeHidden();

  myActiveHeightAttribute = new image(
    elem, //parent div
    "active-height-attribute", //id
    parentWidth*.0055, //x
    parentHeight*.388, //y
    parentWidth*.12, //width
    parentHeight*.11, //height
    "assets/active-height-attribute.png"); //image source
  myActiveHeightAttribute.makeHidden();
  myActiveLengthAttribute = new image(
    elem,
    "active-length-attribute",
    parentWidth*.0055,
    parentHeight*.276,
    parentWidth*.12,
    parentHeight*.11,
    "assets/active-length-attribute.png");
  myActiveLengthAttribute.makeHidden();

  myXAxis = new image(
    elem, //parent div
    "x-axis", //id
    xAxisStart*.98, //x
    yAxisStart*1.05, //y
    parentWidth*.53, //width
    parentHeight*.02, //height
    "assets/x-axis.png"); //image source
  myXAxis.makeHidden();
  myYAxis = new image(
    elem, //parent div
    "y-axis", //id
    xAxisStart*.935, //x
    yAxisEnd*.92, //y
    parentWidth*.015, //width
    parentHeight*.54, //height
    "assets/y-axis.png"); //image source
  myYAxis.makeHidden();

  myXAxisWithLengthAttribute = new image(
    elem, //parent div
    "x-axis-with-attribute", //id
    298, //x
    398, //y
    764-298, //width
    429-398, //height
    "assets/xaxis-length.png"); //image source
  myXAxisWithLengthAttribute.makeHidden();
  myYAxisWithHeightAttribute = new image(
    elem, //parent div
    "y-axis-with-attribute", //id
    268, //x
    88, //y
    299-268, //width
    399-88, //height
    "assets/yaxis-height.png"); //image source
  myYAxisWithHeightAttribute.makeHidden();

  myCursor = new image(
    elem, //parent div
    "cursor", //id
    parentWidth*0.5, //x
    parentHeight*0.5, //y
    20, //width
    20, //height
    "assets/cursor.png"); //image source

  //once images are loaded, start the animation
  animationLoop(animationIndex);
}

function animationLoop(animationIndex) {
  // console.log("animation index "+animationIndex);

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
          myCursor.setStartEnd(
            parentWidth*0.5,
            parentHeight*0.5,
            myLengthAttribute.x + myLengthAttribute.w/2,
            myLengthAttribute.y + myLengthAttribute.h/2);
        }
        myCursor.moveMe(totalFrames);

      } 
      else if (animationIndex == 1){
        //drag length attribute to x-axis
        if(currentFrame==0) {
          myCursor.setStartEnd(
            myLengthAttribute.x + myLengthAttribute.w/2,
            myLengthAttribute.y + myLengthAttribute.h/2,
            myXAxisWithLengthAttribute.x+myXAxisWithLengthAttribute.w/2,
            myXAxisWithLengthAttribute.y+myXAxisWithLengthAttribute.h/2);
          myLengthAttribute.setStartEnd(
            myLengthAttribute.x + myLengthAttribute.w/2,
            myLengthAttribute.y + myLengthAttribute.h/2,
            myXAxisWithLengthAttribute.x+myXAxisWithLengthAttribute.w/2,
            myXAxisWithLengthAttribute.y+myXAxisWithLengthAttribute.h/2);
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
          myCursor.setStartEnd(
            myXAxisWithLengthAttribute.x+myXAxisWithLengthAttribute.w/2,
            myXAxisWithLengthAttribute.y+myXAxisWithLengthAttribute.h/2,
            myHeightAttribute.x+ myHeightAttribute.w/2,
            myHeightAttribute.y+ myHeightAttribute.h/2);
        }

        myCursor.moveMe(totalFrames);
      }
      else if (animationIndex == 4){
        //drag height attribute to y-axis
        if(currentFrame==0) {
          myCursor.setStartEnd(
            myHeightAttribute.x+ myHeightAttribute.w/2,
            myHeightAttribute.y + myHeightAttribute.h/2,
            myYAxisWithHeightAttribute.x+myYAxisWithHeightAttribute.w/2,
            myYAxisWithHeightAttribute.y+myYAxisWithHeightAttribute.h/2);
          myHeightAttribute.setStartEnd(
            myHeightAttribute.x + myHeightAttribute.w/2,
            myHeightAttribute.y + myHeightAttribute.h/2,
            myYAxisWithHeightAttribute.x+myYAxisWithHeightAttribute.w/2,
            myYAxisWithHeightAttribute.y+myYAxisWithHeightAttribute.h/2);
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

      //To Do: Work on Responsiveness for the image
      //check if we need to resize the images
      // if(document.readyState === "complete"){
        // console.log(elem.parentElement.style.offsetWidth);
        // if(elem.offsetWidth!=parentWidth){
          // console.log("Width: " + elem.offsetWidth + " Height: "+elem.offsetHeight);
          // elem.offsetHeight=elem.offsetWidth*heightToWidthRatio+"px";
          // parentWidth=elem.offsetWidth;
          // parentHeight=elem.offsetHeight;
          // updateSizes();
        // }
      // }
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

//To Do: this function will handle the resizing of all images and positions to make the animation responsive
// function updateSizes(){
//   console.log("size changed");
  
//   var scale = elem.offsetWidth/maxWidth;
//   console.log(scale);

//   //update background image dimensions and store them
//   parentX = elem.offsetLeft;
//   parentY = elem.offsetTop;
//   parentWidth = elem.offsetWidth;
//   parentHeight = elem.offsetHeight;
//   //update plot area variables
//   xAxisStart = 325*scale; //bottom left corner of the plotting area
//   yAxisStart = 365*scale; //bottom left corner of plotting area
//   xAxisWidth = Math.round(parentWidth*0.5)*scale; //plot width as percentage of background image
//   yAxisHeight = Math.round(parentHeight*0.5)*scale;//plot height as percentage of background image
//   xAxisEnd = xAxisStart + xAxisWidth; //lower right corner of plotting area
//   yAxisEnd = yAxisStart - yAxisHeight; //upper left corner of plotting area

//   //go through each image and update their dimensions
//   for(var i = 0 ; i < datasetJSON.length ; i++){
//     myCases[i].scaleImageDimensionsAndPosition(scale);
//     // if(i==0){
//     //   console.log("X: "+myCases[i].x+" Y: "+myCases[i].y+" W: "+myCases[i].w+" H: "+myCases[i].h)
//     // }
//   }
//   myCursor.scaleImageDimensionsAndPosition(scale);
//   myHeightAttribute.scaleImageDimensionsAndPosition(scale);
//   myLengthAttribute.scaleImageDimensionsAndPosition(scale);
//   myYAxis.scaleImageDimensionsAndPosition(scale);
//   myXAxis.scaleImageDimensionsAndPosition(scale);
//   myActiveHeightAttribute.scaleImageDimensionsAndPosition(scale);
//   myActiveLengthAttribute.scaleImageDimensionsAndPosition(scale);
//   myYAxisWithHeightAttribute.scaleImageDimensionsAndPosition(scale);
//   myXAxisWithLengthAttribute.scaleImageDimensionsAndPosition(scale);
// }

class image {
  constructor(elem,id,_x,_y,_w,_h,source){
    this.w = _w;
    this.h = _h;
    this.initW = _w; //to keep track of initial width
    this.initH = _h; //to keep track of initial height
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

  //following code is buggy. currently doesn't scale properly
  // scaleImageDimensionsAndPosition(scale){
  //   document.getElementById(this.myImage.id).style.width=this.initW*scale;
  //   document.getElementById(this.myImage.id).style.height=this.initH*scale;
  //   this.setX(this.x0*scale);
  //   this.setY(this.y0*scale);
  //   this.setStartEnd(
  //     this.xStart*scale,
  //     this.yStart*scale,
  //     this.xEnd*scale,
  //     this.yEnd*scale);
  //   this.updateImgXY();
  // }
}

// for debugging locations in the image:
// function printMousePos(event) {
//   console.log(
//     "clientX: " + event.clientX +
//     " - clientY: " + event.clientY);
// }

// document.addEventListener("click", printMousePos);