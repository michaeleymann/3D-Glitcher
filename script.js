


// VARIABLES

let numbRect = 12; //max15
let positions = [];
let boxSize = 90
let size = 500;
let noiseScale = 0.01;
let camSpeed = 0.001;
let col;

let options = {
    red_blue: [16,-3,-1],
    black_white: [16,-1,-1],
    blue_white: [17,-1,-3]
}




// FUNCTIONS
function drawSquare(x,y,size){
    return [{x: x, y: y}, {x: x+size, y: y}, {x: x+size, y: y+size}, {x: x, y: y+size}]
}





function rgbToHex(rgb) { 
    var hex = Number(rgb).toString(options[colorScheme][0]);
    if (hex.length < 2) {
        hex = "0" + hex;
    }
    last = hex.slice(options[colorScheme][1]);
    hex = last + hex.slice(options[colorScheme][2]);
    return hex;
  };

  function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
  }

  function mousePressed() {
      let fs = fullscreen();
      fullscreen(!fs);
  }

  // P5 SETUP
  function setup(){
    createCanvas(windowWidth, windowHeight, WEBGL);
    background(0);
    colorScheme = "blue_white";

    console.log(options[colorScheme])
    //noStroke();
    noFill()
    strokeWeight(1);

    for ( let x = 0; x < numbRect; x++ ){
        for ( let y = 0; y < numbRect; y++ ){
            for ( let z = 0; z < numbRect; z++ ){
                let X = map( x, 0, numbRect-1, -size, size );
                let Y = map( y, 0, numbRect-1, -size, size );
                let Z = map( z, 0, numbRect-1, -size, size );
                positions.push({x: X, y: Y, z: Z})
            }
        }
    }
  }


function draw(){
    //clear();
    myCamera = camera(0, 0, size*sin(frameCount*camSpeed*0.5), size*sin(frameCount*camSpeed), size*cos(frameCount*2.1*camSpeed), size*cos(frameCount*2.8*camSpeed))
    for ( let p of positions ) {
        push();
        let pF = noiseScale + frameCount*0.000003
        let perlin = noise ( p.x*pF, p.y*pF, p.z*pF )
        let c = Math.floor(perlin*256)
        col = color("#"+rgbToHex(c)+rgbToHex(c))
        //col.setAlpha(255)
        stroke(col)
        // go to position stored in positions
        translate( p.x, p.y, p.z );
        box(boxSize);
        pop();
    }
   
}