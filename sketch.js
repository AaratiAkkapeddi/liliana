
let playing = false;
let video;
let gridSize = 10; //resolution of grid
let velocityGridSize = 24
let flow;               // Calculated flow for entire image
let previousPixels;     // Copy of previous frame
let ignoreThresh = 16;  // Ignore movements below this level
let sr = 20; //symbol size
let span8;
/*CONTROLS */
let sliderResolution;

let sliderSymbolSize0;
let sliderSymbolSize1;
let sliderSymbolSize2;
let sliderSymbolSize3;
let sliderSymbolSize4;
let sliderSymbolSize5;

let shade0;
let shade1;
let shade2;
let shade3;
let shade4;
let shade5;

let noises = [];

/*************************/
/*************************/
/*************************/
/* start sort/process images  */
let imgs=[];
let arrow =["./symbols/arrow/1.png",
            "./symbols/arrow/2.png",
            "./symbols/arrow/3.png",
            "./symbols/arrow/4.png",
            "./symbols/arrow/5.png",
            "./symbols/arrow/6.png",
            "./symbols/arrow/7.png",
            "./symbols/arrow/8.png"];
let circle=["./symbols/circle/1.png",
            "./symbols/circle/2.png",
            "./symbols/circle/3.png",
            "./symbols/circle/4.png",
            "./symbols/circle/5.png",
            "./symbols/circle/6.png",
            "./symbols/circle/7.png",
            "./symbols/circle/8.png",
            "./symbols/circle/9.png",
            "./symbols/circle/10.png",
            "./symbols/circle/11.png",
            "./symbols/circle/12.png",
            "./symbols/circle/13.png",
            "./symbols/circle/14.png",
            "./symbols/circle/15.png",
            "./symbols/circle/16.png",
            "./symbols/circle/17.png",
            "./symbols/circle/18.png",
            "./symbols/circle/19.png",
            "./symbols/circle/20.png",
            "./symbols/circle/21.png",
            "./symbols/circle/22.png"];
let diagonal=["./symbols/diagonal/1.png",
              "./symbols/diagonal/2.png",
              "./symbols/diagonal/3.png",
              "./symbols/diagonal/4.png",
              "./symbols/diagonal/5.png",
              "./symbols/diagonal/6.png",
              "./symbols/diagonal/7.png"];
let line_horizontal=["./symbols/line horizontal/1.png",
                    "./symbols/line horizontal/2.png",
                    "./symbols/line horizontal/3.png",
                    "./symbols/line horizontal/4.png",
                    "./symbols/line horizontal/5.png",
                    "./symbols/line horizontal/6.png",
                    "./symbols/line horizontal/7.png",
                    "./symbols/line horizontal/8.png",
                    "./symbols/line horizontal/9.png",
                    "./symbols/line horizontal/10.png",
                    "./symbols/line horizontal/11.png",
                    "./symbols/line horizontal/12.png",
                    "./symbols/line horizontal/13.png"];
let line_vertical=["./symbols/line vertical/1.png",
                    "./symbols/line vertical/2.png",
                    "./symbols/arrow/3.png",
                    "./symbols/line vertical/4.png",
                    "./symbols/line vertical/5.png",
                    "./symbols/line vertical/6.png",
                    "./symbols/line vertical/7.png",
                    "./symbols/line vertical/8.png",
                    "./symbols/line vertical/9.png",
                    "./symbols/line vertical/10.png",
                    "./symbols/line vertical/11.png",
                    "./symbols/line vertical/12.png",
                    "./symbols/line vertical/13.png",
                    "./symbols/line vertical/14.png",
                    "./symbols/line vertical/15.png",
                    "./symbols/line vertical/16.png",
                    "./symbols/line vertical/17.png"];
let star=["./symbols/star/1.png",
          "./symbols/star/2.png",
          "./symbols/star/3.png",
          "./symbols/star/4.png",
          "./symbols/star/5.png",
          "./symbols/star/6.png",
          "./symbols/star/7.png",
          "./symbols/star/8.png",
          "./symbols/star/9.png",
          "./symbols/star/10.png",
          "./symbols/star/11.png",
          "./symbols/star/12.png",
          "./symbols/star/13.png"];

let arrow_imgs = [];
let circle_imgs = [];
let line_horizontal_imgs = [];
let line_vertical_imgs = [];
let star_imgs = [];
let diagonal_imgs = [];
let none_imgs = [];

function preload(){
  
  for(let i = 0; i < arrow.length; i++){
    arrow_imgs.push(loadImage(arrow[i]))
  }
  for(let i = 0; i < circle.length; i++){
    circle_imgs.push(loadImage(circle[i]))
  }
  for(let i = 0; i < line_vertical.length; i++){
    line_vertical_imgs.push(loadImage(line_vertical[i]))
  }
  for(let i = 0; i < line_horizontal.length; i++){
    line_horizontal_imgs.push(loadImage(line_horizontal[i]))
  }
  
  for(let i = 0; i < diagonal.length; i++){
    diagonal_imgs.push(loadImage(diagonal[i]))
  }
  for(let i = 0; i < star.length; i++){
    star_imgs.push(loadImage(star[i]))
  }
  
}
/*************************/
/* end process images  */
/*************************/
/*************************/
/*************************/
let shades = ["arrow","circle","diagonal","line horizontal","line vertical","star"]


let pixels = [];
let indexes = [];
function setup() {
  createCanvas(800, 800);
  video = createVideo("trimmed.mp4");//to change the video you replace the filename here
  // webcam capture (at the size of the window)
  video.size(width, height);
  video.volume(0);
  video.loop()
  rs = random(100,300);
  rx = random(width)
  ry = random(height)
  ri = imgs[floor(random(0,67))];
  // video.hide();
  frameRate(15);
  flow = new FlowCalculator(velocityGridSize);
  noises.push(new Noise(random(width), random(height), random(shades), random(50,200)));
  noises.push(new Noise(random(width), random(height), random(shades), random(50,200)));
  noises.push(new Noise(random(width), random(height), random(shades), random(50,200)));

  /* CONTROLS */


 

  

 

  let addNoise = createButton('add noise');
  addNoise.position(window.innerWidth - 100, 100);

  // Call repaint() when the button is pressed.
  addNoise.mousePressed(function(){
    noises.push(new Noise(random(width), random(height), random(shades), random(50,200)));

  });

  let removeNoise = createButton('remove noise');
  removeNoise.position(window.innerWidth - 200, 100);

  // Call repaint() when the button is pressed.
  removeNoise.mousePressed(function(){
    if(noises.length > 0){
      noises.pop()
    }
  });

 

  shade0 = createSelect();
  shade0.position(10, 100);
  let span2 = createSpan('Shade 0 (darkest)');
  span2.position(10, 80);
  sliderSymbolSize0 = createSlider(5, 100, 28, 1);
  sliderSymbolSize0.position(window.innerWidth-270, 200);
  sliderSymbolSize0.size(200);
  let span = createSpan('symbol size for Arrow (currently 28)');
  span.position(window.innerWidth-270, 230);
  sliderSymbolSize0.input(function(){
    span.html("symbol size for Arrow (currently "+sliderSymbolSize0.value() +")")
  });


  shade1 = createSelect();
  shade1.position(10, 180);
  
  let span3 = createSpan('Shade 1');
  span3.position(10, 150);
  sliderSymbolSize1 = createSlider(5, 100, 20, 1);
  sliderSymbolSize1.position(window.innerWidth-270, 280);
  sliderSymbolSize1.size(200);

  let span9 = createSpan('symbol size for circle (currently 20)');
  span9.position(window.innerWidth-270, 300);
  sliderSymbolSize1.input(function(){
    span9.html("symbol size for circle (currently "+sliderSymbolSize1.value() +")")
  });

  shade2 = createSelect();
  shade2.position(10, 250);

  let span4 = createSpan('Shade 2');
  span4.position(10, 230);

  sliderSymbolSize2 = createSlider(5, 100, 100, 1);
  sliderSymbolSize2.position(window.innerWidth-270, 350);
  sliderSymbolSize2.size(200);

  let span10 = createSpan('symbol size for Diagonal (currently 100)');
  span10.position(window.innerWidth-270, 370);
  sliderSymbolSize2.input(function(){
    span10.html("symbol size for shade Diagonal (currently "+sliderSymbolSize2.value() +")")
  });

  shade3 = createSelect();
  shade3.position(10, 330);

  let span5 = createSpan('Shade 3');
  span5.position(10, 300);

  sliderSymbolSize3 = createSlider(5, 100, 20, 1);
  sliderSymbolSize3.position(window.innerWidth-270, 420);
  sliderSymbolSize3.size(200);

  let span11 = createSpan('symbol size for Horizontal (currently 20)');
  span11.position(window.innerWidth-270, 450);
  sliderSymbolSize3.input(function(){
    span11.html("symbol size for Horizontal (currently "+sliderSymbolSize3.value() +")")
  });

  shade4 = createSelect();
  shade4.position(10, 400);
  
  let span6 = createSpan('Shade 4');
  span6.position(10, 380);

  sliderSymbolSize4 = createSlider(5, 100, 20, 1);
  sliderSymbolSize4.position(window.innerWidth-270, 480);
  sliderSymbolSize4.size(200);

  let span12 = createSpan('symbol size for Vertical (currently 20)');
  span12.position(window.innerWidth-270, 500);
  sliderSymbolSize4.input(function(){
    span12.html("symbol size for Vertical (currently "+sliderSymbolSize4.value() +")")
  });


  shade5 = createSelect();
  shade5.position(10, 470);
  let span7 = createSpan('Shade 5 (lightest)');
  span7.position(10, 440);
  sliderSymbolSize5 = createSlider(5, 100, 20, 1);
  sliderSymbolSize5.position(window.innerWidth-270, 530);
  sliderSymbolSize5.size(200);

  let span13 = createSpan('symbol size for Star (currently 20)');
  span13.position(window.innerWidth-270, 550);
  sliderSymbolSize5.input(function(){
    span13.html("symbol size for Star (currently "+sliderSymbolSize5.value() +")")
  });

  sliderResolution = createSlider(5, 30, 10, 1);
  sliderResolution.position(10, 10);
  sliderResolution.size(200);
  span8 = createSpan('image resolution');
  span8.position(10, 40);
  sliderResolution.input(updateSize);
 


  
  // Add color options.
  shade0.option('arrow');
  shade0.option('circle');
  shade0.option('line horizontal');
  shade0.option('line vertical');
  shade0.option('diagonal');
  shade0.option('star');
  shade0.option('none');

  // Set the selected option to "red".
  shade0.selected('none');

  // Add color options.
  shade1.option('arrow');
  shade1.option('circle');
  shade1.option('line horizontal');
  shade1.option('line vertical');
  shade1.option('diagonal');
  shade1.option('star');
  shade1.option('none');

  // Set the selected option to "red".
  shade1.selected('circle');

  // Add color options.
  shade2.option('arrow');
  shade2.option('circle');
  shade2.option('line horizontal');
  shade2.option('line vertical');
  shade2.option('diagonal');
  shade2.option('star');
  shade2.option('none');

  // Set the selected option to "red".
  shade2.selected('diagonal');



  // Add color options.
  shade3.option('arrow');
  shade3.option('circle');
  shade3.option('line horizontal');
  shade3.option('line vertical');
  shade3.option('diagonal');
  shade3.option('star');
  shade3.option('none');

  // Set the selected option to "red".
  shade3.selected('line horizontal');

  // Add color options.
  shade4.option('arrow');
  shade4.option('circle');
  shade4.option('line horizontal');
  shade4.option('line vertical');
  shade4.option('diagonal');
  shade4.option('star');
  shade4.option('none');

  // Set the selected option to "red".
  shade4.selected('line vertical');


  // Add color options.
  shade5.option('arrow');
  shade5.option('circle');
  shade5.option('line horizontal');
  shade5.option('line vertical');
  shade5.option('diagonal');
  shade5.option('star');
  shade5.option('none');

  // Set the selected option to "red".
  shade5.selected('star');

}

function draw() { 
  gridSize = sliderResolution.value()
  background(255);
 shades = [
  shade0.selected(),shade1.selected(),shade2.selected(),shade3.selected(),shade4.selected(),shade5.selected()
]

  video.loadPixels();


 

  




  
  if(frameCount == 2){
    
    for (let y=0; y<video.height; y+=gridSize) {
      for (let x=0; x<video.width; x+=gridSize) {
        
        let index = (y * video.width + x) * 4;
        indexes.push(index)
        let r = video.pixels[index]; //the grayscale value of the tile

        let nr = int(map(r, 0, 255, 0, 5))



        if(random([true,false])){
          pixels.push(new Pixel(x+gridSize/2 + random(-5,5), y+gridSize/2 + random((-1 * (gridSize)),(gridSize)), shades[nr], 1, r))

        }else{
          pixels.push(new Pixel(x+gridSize/2 + random(-2,2), y+gridSize/2 + random((-1 * (gridSize*2)),(gridSize*2)), shades[nr], sr,r))

        }


      }
    }
  }else if(frameCount > 2){
    
    indexes.forEach((index, i) => {
      let r = video.pixels[index]; //the grayscale value of the tile
      let nr = int(map(r, 0, 255, 0, 5))
      pixels[i].update(shades[nr], r);
      pixels[i].draw()
    })





  }


  noises.forEach((noise)=> noise.draw())




  if (video.pixels.length > 0) {

    // Calculate flow (but skip if the current and previous frames are the same)
    if (previousPixels) {
      if (same(previousPixels, video.pixels, 4, width)) {
        return;
      }
      flow.calculate(previousPixels, video.pixels, video.width,video.height);
    }
  
    // Display the video
  
  
    // Ff flow zones have been found, display them for us!
    if (flow.zones) {
      for (let zone of flow.zones) {
        
        // Ff a zone's flow magnitude (strength) is less than a set threshold, don't display
        if (zone.mag < ignoreThresh) {
          continue;
        }
        pixels.forEach((pixel) => {
          if(dist(pixel.x, pixel.y, zone.pos.x, zone.pos.y) < 10){
            pixel.x = zone.pos.x;
            pixel.y = zone.pos.y
            pixel.angle = zone.angle;
          }
        })
        // Otherwise, draw a little arrow!
        push();
        translate(zone.pos.x, zone.pos.y);
        rotate(zone.angle);
        strokeWeight(20);
        stroke(0,255,0);
        // line(0,0, zone.mag,0);
        // line(zone.mag,0, zone.mag-5,-5);
        // line(zone.mag,0, zone.mag-5,5);
        pop();
      }
    }
  
    // Copy the current pixels into previous for the next frame
    previousPixels = copyImage(video.pixels, previousPixels);
  }
  
  
  




}
function updateSize(){
  video.loadPixels();
  pixels = [];
  indexes = [];
   gridSize = sliderResolution.value();
   span8.html("image resolution (currently "+sliderResolution.value() +")")

  for (let y=0; y<video.height; y+=gridSize) {
    for (let x=0; x<video.width; x+=gridSize) {
      
      let index = (y * video.width + x) * 4;
      indexes.push(index)
      let r = video.pixels[index]; //the grayscale value of the tile

      let nr = int(map(r, 0, 255, 0, 5))



      if(random([true,false])){
        pixels.push(new Pixel(x+gridSize/2 + random(-5,5), y+gridSize/2 + random((-1 * (gridSize)),(gridSize)), shades[nr], 1, r))

      }else{
        pixels.push(new Pixel(x+gridSize/2 + random(-2,2), y+gridSize/2 + random((-1 * (gridSize*2)),(gridSize*2)), shades[nr], sr,r))

      }


    }

}
}

class Pixel {
  constructor(x, y, c,r, color) {
    this.x = x;
    this.y = y;
    this.c = c;
    this.r = r;
    this.color = color;
    this.angle = 0;
    
    // this.i = random(this.c)
    let nc;
    switch (c) {
      case 'arrow':
        nc = arrow_imgs
        break
      case 'circle':
        nc = circle_imgs
        break
      case 'diagonal':
        nc = diagonal_imgs
        break
      case 'line horizontal':
        nc = line_horizontal_imgs
        break
      case 'line vertical':
        nc = line_vertical_imgs
        break
      case 'star':
        nc = star_imgs
        break
      case 'none':
        nc = none_imgs
        break
    }
    this.cmap  = int(map(this.color, 200, 255, 0, nc.length - 1));
    if(random[true,true]){
      this.cmap = int(random(nc.length-1))
    }
    this.i = nc[this.cmap]

    this.changed = false;
  }
  draw(){
    switch (this.c) {
      case 'arrow':
        this.r = sliderSymbolSize0.value()
        break
      case 'circle':
        this.r = sliderSymbolSize1.value()
        break
      case 'diagonal':
        this.r = sliderSymbolSize2.value()
        break
      case 'line horizontal':
        this.r = sliderSymbolSize3.value()
        break
      case 'line vertical':
        this.r = sliderSymbolSize4.value()
        break
      case 'star':
        this.r = sliderSymbolSize5.value()
        break
      case 'none':
        break
    }
    push()
    translate(this.x,this.y)
    rotate(this.angle)
    if(this.i){
      image(this.i,0, 0, this.r,this.r)
    }
    pop()
  }
  update(c, color){

    if(c != this.c){
      // this.i = random(this.c)
      this.c = c
      let nc;
     
      switch (c) {
        case 'arrow':
          nc = arrow_imgs
          this.r = sliderSymbolSize0.value()
          break
        case 'circle':
          nc = circle_imgs
          this.r = sliderSymbolSize1.value()
          break
        case 'diagonal':
          nc = diagonal_imgs
          this.r = sliderSymbolSize2.value()
          break
        case 'line horizontal':
          nc = line_horizontal_imgs
          this.r = sliderSymbolSize3.value()
          break
        case 'line vertical':
          nc = line_vertical_imgs
          this.r = sliderSymbolSize4.value()
          break
        case 'star':
          nc = star_imgs
          this.r = sliderSymbolSize5.value()
          break
        case 'none':
          nc = none_imgs
          break
      }
      this.color = color;
      
      this.cmap = int(random(nc.length-1))

      this.i = nc[this.cmap]

    }

  }
}



class Noise {
  constructor(x, y, c,r) {
    this.x = x;
    this.y = y;
    this.c = c;
    this.r = r;

    
    // this.i = random(this.c)
    let nc;
    switch (c) {
      case 'arrow':
        nc = arrow_imgs
        break
      case 'circle':
        nc = circle_imgs
        break
      case 'diagonal':
        nc = diagonal_imgs
        break
      case 'line horizontal':
        nc = line_horizontal_imgs
        break
      case 'line vertical':
        nc = line_vertical_imgs
        break
      case 'star':
        nc = star_imgs
        break
      case 'none':
        nc = none_imgs
        break
    }

   
    this.i = nc[int(random(nc.length-1))]

  }
  draw(){
    
    if(random([true,true,false])){
      this.x = random(this.x-10, this.x + 10)
      this.y = random(this.y-5, this.y + 10)
    }
    if(this.i){
      image(this.i,this.x, this.y, this.r,this.r)
    }

  }
  

  
}

