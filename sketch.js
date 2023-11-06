/*
VIDEO PIXELS - Aarati Akkapeddi MODIFIED FRom
Jeff Thompson | 2021 | jeffreythompson.org
*/
let playing = false;
let video;
let imgs = [];
let rs;
let rs2;
let rs3;
let rx;
let ry;
let rx2;
let ry2;
let rx3;
let ry3;
let ri;
let ri2;
let ri3;

function preload(){
  for(let i = 0; i < 56; i++){
    imgs.push(loadImage((i + 1) + ".png"))
  }
  
}


function setup() {
  createCanvas(600, 600);
  video = createVideo("street.mp4");
  // webcam capture (at the size of the window)
  video.size(width, height);
  video.volume(0);
  video.loop()
  rs = random(100,300);
  rs2 = random(100,300);
  rs3 = random(100,300);
  rx = random(width)
  ry = random(height)
  rx2 = random(width)
  ry2 = random(height)
  rx3 = random(width)
  ry3 = random(height)
  ri = imgs[floor(random(0,55))];
    ri2 = imgs[floor(random(0,55))];
    ri3 = imgs[floor(random(0,55))];

  // video.hide();
  frameRate(15);
}

function draw() { 
  background(255);

  // try experimenting with this
  let gridSize = int(map(0, 0,width, 15,150));

  // the video has pixels just like an image!
  video.loadPixels();
  for (let y=0; y<video.height; y+=gridSize) {
    for (let x=0; x<video.width; x+=gridSize) {
      
      let index = (y * video.width + x) * 4;
      let r = video.pixels[index];
      let dia;
      if(r > 100){
        dia = map(r, 0,255, gridSize,random(3,8));
      }else{
        dia = map(r, 0,255, gridSize,random(10,70));
      }
      
      
      fill(0);
      noStroke();
      if(dia > 0){
       
        image(imgs[floor(dia)],x+gridSize/2 + random(-2,2),y+gridSize/2 + random(-2,2), dia*2.5,dia*2.5)
        
      }
    }
  }
  
  if(frameCount % 1 == 0){
    rs = random(100,300);
    rs2 = random(100,300);
    rs3 = random(100,300);
    rx = random(width)
    ry = random(height)
    rx2 = random(width)
    ry2 = random(height)
    rx3 = random(width)
    ry3 = random(height)
    ri = imgs[floor(random(0,55))];
    ri2 = imgs[floor(random(0,55))];
    ri3 = imgs[floor(random(0,55))];
  }
  

  image(ri,rx,ry, rs,rs)
  // image(ri2,rx2,ry2, rs2,rs2)
  // image(ri3,rx3,ry3, rs3,rs3)
  // image(imgs[floor(random(0,55))],random(width),random(height), rs4,rs4)
  // image(imgs[floor(random(0,55))],random(width),random(height), rs5,rs5)
  
}

