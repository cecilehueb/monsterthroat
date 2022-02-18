

function setup() {
    createCanvas(windowWidth, windowHeight);
    background(0);

}

let r = 20;
let g = 20;
let b = 20;
let firstTime = true;
let elX, elY, elWidth;
elWidth = 30;

function draw() {

    r = map(mouseX, 0, windowWidth, 0, 255);
    g = map(mouseX, 0, windowWidth, 255, 0);
    b = map(mouseY, 0, windowHeight, 0, 225);


    // pointer
    noStroke()
    fill(r, g, b, 100);
    ellipse(mouseX, mouseY, 30);

    // random bubbles
    elX = random(windowWidth);
    elY = random(windowHeight);
    fill(r, g, b, 30)
    ellipse(elX, elY, elWidth)
   
}

function mousePressed() {
    // r = random(255);
    // g = random(255);
    // b = random(255);
    elWidth += 10;

}

