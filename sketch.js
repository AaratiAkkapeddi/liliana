/*
VIDEO PIXELS - Aarati Akkapeddi MODIFIED FRom
Jeff Thompson | 2021 | jeffreythompson.org
*/
let playing = false;
let video;
let imgs = [];
let rs;
let rx;
let ry;
let ri;

function preload(){
  for(let i = 0; i < 56; i++){
    imgs.push(loadImage((i + 1) + ".png"))
  }
  
}


function setup() {
  createCanvas(600, 600);
  video = createVideo("street.mp4");//to change the video you replace the filename here
  // webcam capture (at the size of the window)
  video.size(width, height);
  video.volume(0);
  video.loop()
  rs = random(100,300);
  rx = random(width)
  ry = random(height)
  ri = imgs[floor(random(0,55))];

  // video.hide();
  frameRate(15);
}

function draw() { 
  background(255);

  // try experimenting with this ("resolution of grid")
  let gridSize = int(map(0, 0,width, 15,150));

  // the video has pixels just like an image!
  video.loadPixels();
  for (let y=0; y<video.height; y+=gridSize) {
    for (let x=0; x<video.width; x+=gridSize) {
      
      let index = (y * video.width + x) * 4;
      let r = video.pixels[index];
      let dia;
      //this if statement is for the threshold of black vs white the grid size is smaller (between 3 and 8) if it's "white"
      if(r > 100){
        dia = map(r, 0,255, gridSize,random(3,8));
      }else{
        dia = map(r, 0,255, gridSize,random(10,70));
      }
      
      

      if(dia > 0){
       
      image(imgs[floor(dia)],x+gridSize/2 + random(-2,2),y+gridSize/2 + random(-2,2), dia*2.5,dia*2.5)
        
      }
    }
  }
  
  if(frameCount % 1 == 0){
    //these are random images that add noise to the video. They just appear in random places and sizes
    rs = random(100,300);
    rx = random(width)
    ry = random(height)
    ri = imgs[floor(random(0,55))];

  }
  

  image(ri,rx,ry, rs,rs)

}

