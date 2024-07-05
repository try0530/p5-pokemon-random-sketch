function setup() {
  let canvasV;
  if (windowWidth > windowHeight) {
    canvasV = windowHeight;
  } else {
    canvasV = windowWidth;
  }
  // createCanvas(800, 800);
  createCanvas(canvasV, canvasV);
  rectMode(CENTER);

  translate(width / 2, height / 2);
  scale(0.9);
  translate(-width / 2, -height / 2);

  //外框
  background(255);
  strokeWeight(1.5);
  stroke(0);
  noFill();
  rect(width / 2, height / 2, width, height);

  let seg = int(random(7, 12)); //segmentation  randomly cut the frame into 7 - 11 pieces
  let w = width / seg; // width in every piece
  for (let i = 0; i < seg; i++) {
    for (let j = 0; j < seg; j++) {
      let x = i * w + w / 2;
      let y = j * w + w / 2;
      randomShape(x, y, w, seg);
    }
  }
}

function randomShape(x, y, w, seg) {
  let shapeControl = int(random(4));
  push();
  translate(x, y);
  rotate((int(random(4)) * TAU) / 4);

  if (shapeControl == 0) {
    //Plusle & Minun
    drawPM(0, w * 0.1, w * 0.8, seg);
    line(w / 2, w / 2, -w / 2, w / 2);
  } else if (shapeControl == 1) {
    // pokemon ball
    pokemonBall(0, w * 0.2, w * 0.5);
    line(w / 2, w / 2, -w / 2, w / 2);
  } else if (shapeControl == 2) {
    // pikachu tail
    pikachuTail(0, w / 2 - 4, w, seg / 4);
    line(w / 2, w / 2, -w / 2, w / 2);
  }
  pop();
}

//plusle&minun 正負電拍拍
function drawPM(x, y, w, seg) {
  let colors = ["#e9545d", "#00b8ee"]; //red, blue
  let rndColor = random(colors);
  let skin = "#fff3c2";
  let rndMouth = int(random(2));

  push();
  translate(x, y);
  noFill();

  //face
  stroke(0);
  arc(0, w / 2, w + 3, w, PI, TAU);

  //eyes
  let eyx = w * 0.18;
  let eyy = w * 0.19;
  let eyw = w * 0.1;
  ellipse(eyx, eyy, eyw, eyw);
  ellipse(-eyx, eyy, eyw, eyw);

  //cheek
  fill(rndColor);
  eyx = w * 0.35;
  eyy = w * 0.35;
  eyw = w * 0.2;
  ellipse(eyx, eyy, eyw, eyw);
  ellipse(-eyx, eyy, eyw, eyw);
  //+-
  fill("white");
  noStroke();
  if (rndColor == "#00b8ee") {
    rect(eyx, eyy, eyw - 3, 1);
    rect(-eyx, eyy, eyw - 3, 1);
  } else {
    rect(eyx, eyy, eyw - 3, 1);
    rect(eyx, eyy, 1, eyw - 3);
    rect(-eyx, eyy, eyw - 3, 1);
    rect(-eyx, eyy, 1, eyw - 3);
  }

  //mouse
  noFill();
  stroke(0);
  if (rndMouth == 0) {
    arc(0, w / 4, w * 0.1, w * 0.2, TAU, PI);
  } else {
    triangle(0, w / 4, -w * 0.1, w / 3, w * 0.1, w / 3); //x1, y1, x2, y2, x3, y3
  }

  //ears
  fill(rndColor);
  ears(x, y, w);
  pop();
}

// pulse & minum ears
function ears(x, y, w) {
  stroke(0);
  translate(x, y);
  push();
  rotate(-PI / 8);
  ellipse(-w / 4, -w / 3, w * 0.25, w * 0.45);
  fill("white");
  ellipse(-w / 4, -w / 5, w * 0.15, w * 0.15);
  pop();

  push();
  rotate(PI / 8);
  ellipse(w / 4, -w / 3, w * 0.25, w * 0.45);
  fill("white");
  ellipse(w / 4, -w / 5, w * 0.15, w * 0.15);
  pop();
}

// pokemon ball
function pokemonBall(x, y, w) {
  push();
  strokeWeight(2);
  ellipseMode(RADIUS);
  fill("#e9545d");
  arc(x, y, w * 0.5, w * 0.5, PI, TAU, CHORD);
  fill("white");
  arc(x, y, w * 0.5, w * 0.5, TAU, PI, CHORD);
  ellipse(x, y, w * 0.2, w * 0.2);
  strokeWeight(1);
  // stroke('grey');
  ellipse(x, y, w * 0.1, w * 0.1);
  pop();
}

// pikachu tail
function pikachuTail(x, y, w, seg) {
  // for different screen size
  let yHighest;
  if (100 / seg > w) {
    yHighest = -w / 2 + 2 / seg;
  } else {
    yHighest = y - 100 / seg;
  }

  //從邊線w開始畫，才不會導致rotate或是大小變換時超出界線範圍
  //質除以seg為了依據幾等份去放大縮小
  beginShape();
  fill("black");
  vertex(x, y);
  vertex(x + 15 / seg, y - 17 / seg);
  vertex(x + 5 / seg, y - 25 / seg);
  vertex(x + 10 / seg, y - 30 / seg);
  vertex(x + 5 / seg, y - 35 / seg);
  vertex(x, y - 30 / seg);
  vertex(x - 5 / seg, y - 40 / seg);
  vertex(x - 15 / seg, y - 30 / seg);
  vertex(x - 2 / seg, y - 18 / seg);
  vertex(x - 10 / seg, y - 10 / seg);
  vertex(x, y);
  endShape();

  fill("#FFFEB6");
  beginShape();
  vertex(x + 10 / seg, y - 30 / seg);
  vertex(x + 20 / seg, y - 40 / seg);
  vertex(x + 5 / seg, y - 50 / seg);
  vertex(x + 30 / seg, y - 70 / seg);
  // vertex(x, y-100/seg);
  vertex(x, yHighest);
  vertex(x - 30 / seg, y - 60 / seg);
  vertex(x - 5 / seg, y - 40 / seg);
  vertex(x, y - 30 / seg);
  vertex(x + 5 / seg, y - 35 / seg);
  vertex(x + 10 / seg, y - 30 / seg);
  endShape();
}
