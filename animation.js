// currentobject SCROLL

const textbox = document.querySelector('.text');
let currentObj = 'come';

textbox.addEventListener('scroll', (e) => {
    let elements = document.querySelectorAll(".scrollobject");
    for (let i = 0; i <elements.length; i++) {

        let position = elements[i].getBoundingClientRect();

        // checking whether fully visible
        // if(position.top >= 0 && position.bottom <= textbox.innerHeight) {
        //     console.log(okee);
        // }

        // checking for partial visibility
        if(position.top < textbox.offsetHeight && position.bottom >= 0) {
            currentObj = elements[i].id;
        }
    }

});

//  MAP VARIABLES 

let canvas;
let map;
const mappa = new Mappa('Leaflet');

let offices = [];
let centre;
let randomBubbles = [];
let bubbles = [];
let doors = [];
let alpha = 255;
let timely = true;



const options = {
    lat: 52.371628,
    lng: 4.899455,
    zoom: 13,
    style: 'http://{s}.basemaps.cartocdn.com/dark_nolabels/{z}/{x}/{y}.png'
    
}

// p5.js preload 

listOffices();

// p5.js setup


function setup(){
  canvas = createCanvas(900, 450);
    map = mappa.tileMap(options);
    map.overlay(canvas);
    map.onChange(drawPoints);
}

function drawPoints() {
    let centrePos = map.latLngToPixel(52.374981, 4.896451);
    centre = new Bubble(centrePos.x, centrePos.y, 20, 255, 255, 30, 100, 1);

    bubbles.splice(0, bubbles.length)
    for (i=0; i<offices.length; i++) {
        let officePos = map.latLngToPixel(offices[i].lat, offices[i].lon);
        let bubble = new Bubble(officePos.x, officePos.y, 20, 255, 255, 30, 0, 0);
        bubbles.push(bubble);
    }
 
}


// p5.js draw


function draw(){
  clear();

//  this piece of code only executes one time 
  if (timely) {
    let centrePos = map.latLngToPixel(52.374981, 4.896451);
    centre = new Bubble(centrePos.x, centrePos.y, 20, 255, 255, 30, 100, 1);  

    for (let i=0; i<30; i++) {
        let randomBubble = new Bubble(random(width), random(height), 20, 255, 255, 30, 100, 1);
        randomBubbles.push(randomBubble);
    }



    setTimeout(() => {
        for (i=0; i<offices.length; i++) {
            let officePos = map.latLngToPixel(offices[i].lat, offices[i].lon);
            let bubble = new Bubble(officePos.x, officePos.y, 20, 255, 255, 30, 0, 0);
            bubbles.push(bubble);
        }
    }, 1000);
    timely = false;

    let x = 40;
    let y = 40;


    // for (let i=0; i<10; i++) {
    //     let door = new Door(x, y, random(30, 50), random(50, 80), random(-30, 10));
    //     doors.push(door);
    //     x = x + 30;
    //     if (y<300) {
    //         y = y + 50;
    //     }
    // }
  }
  
//  TIMESCEDULE
    if(currentObj === 'title') {
        canvas.background(0, alpha);
    }
    if (currentObj === 'come') {
        canvas.background(0, alpha);
        // for (let i = 0; i<randomBubbles.length; i++) {
        //     randomBubbles[i].show();
        //     randomBubbles[i].shake(2);

        // }

    } else if (currentObj === 'totters') {
        canvas.background(0, alpha);
        // for (let i = 0; i<randomBubbles.length; i++) {
        //     randomBubbles[i].show();
        //     randomBubbles[i].shake(4);
        // }
        
        centre.show();
    } else if (currentObj === 'removed') {
        canvas.background(0, alpha);
        centre.changeColor(255, 66, 26);
        centre.show();
        // centre.grow(150, 20);
    }
    else if (currentObj === 'centre' || currentObj === 'church') {

        if (alpha > 0) {
            alpha = alpha - 5;
        }

        canvas.background(0, alpha);
        centre.show();
        centre.grow(200, 20);

    } else if (currentObj === 'city') {
        canvas.background(255, alpha);
        
            for (let i = 0; i<bubbles.length; i++) {
                bubbles[i].show();
                bubbles[i].fadein(0.5);
            }
    } else if (currentObj === 'nostalgic' || currentObj === 'gone') {
        canvas.background(255, alpha);
        for (let i = 0; i<bubbles.length; i++) {
            bubbles[i].show();
            // bubbles[i].fadein(0.5);
        }

        let randompos = random(bubbles.length);

        setTimeout(() => {
            bubbles.splice(randompos, 1);
        }, 2000)
        
    } else if (currentObj === 'now') {

        if (alpha < 255) {
            alpha = alpha + 2;
        }
        canvas.background(255, alpha);

    }

    else if (currentObj === 'hallway') {
        canvas.background(255, alpha);


        setTimeout(() => {
        let door = new Door(random(width), random(height), random(30, 50), random(50, 80), random(-30, 10));
            doors.push(door);
        }, 5000)

        for (let i = 0; i<doors.length; i++) {
            doors[i].show();
        }

    }


}




class Bubble {
    constructor(x, y, r, cr, cg, cb, alpha, growth) {
        this.x = x;
        this.y = y;
        this.r = r;
        this.cr = cr;
        this.cg = cg;
        this.cb = cb;
        this.alpha = alpha;
        this.growth = growth;
    }


    grow(max, min) {
        if (this.r > max || this.r < min) {
            this.growth = this.growth *-1;
        }
        this.r = this.r + this.growth;
    }

    fadein(factor){
        if (this.alpha < 100) {
        this.alpha = this.alpha + factor;
        }
    }

    shake(factor) {
        this.x = this.x + random(-factor, factor);
        this.y = this.y + random(-factor, factor);
    }

    fadeout(factor) {
        if (this.alpha > 0) {
            this.alpha = this.alpha - factor;
        }
    }

    show() {
        noStroke();
        fill(this.cr, this.cg, this.cb, this.alpha);
        ellipse(this.x, this.y, this.r);
    }

    changeColor(cr, cg, cb) {
        if (this.cr > cr) {
            this.cr = this.cr -1;
        } else {this.cr = this.cr+1};

        if (this.cg > cg) {
            this.cg = this.cg -1;
        } else {this.cg = this.cg+1};

        if (this.cb > cb) {
            this.cb = this.cb -1;
        } else {this.cb = this.cb+1};
        
    }


}

class Door {
    constructor(x, y, w, h, e) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.e = e;
    }

    show() {
        noFill();
        stroke(0);
        rect(this.x, this.y, this.w, this.h);
        quad(this.x, this.y, this.x+this.w+this.e, this.y+this.e, this.x+this.w+this.e, this.y+this.h+this.e, this.x, this.y+this.h);
        fill(0)
        ellipse(this.x+this.w-10, this.y+0.5*this.h, 10, 10)
    }
}

async function listOffices() {
    const data = await getData()
        .catch(error => {
            console.log("error")
        });
    console.log(data);
    for (let i = 0; i < data.length; i++) {
        let office = data[i];
        offices.push(office);
    }
}


// fetch data

async function getData() {

    const response = await fetch('postoffices.json');
    const json = await response.json();
    return json;

}
