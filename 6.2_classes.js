const textbox = document.querySelector('.text');
let currentObj;

textbox.addEventListener('scroll', (e) => {
    let elements = document.querySelectorAll(".scrollobject");
    for (let i = 0; i <elements.length; i++) {

        let position = elements[i].getBoundingClientRect();

        // checking whether fully visible
        // if(position.top >= 0 && position.bottom <= window.innerHeight) {
        // }

        // checking for partial visibility
        if(position.top < window.innerHeight && position.bottom >= 0) {
            console.log(elements[i]);
            currentObj = i;
        }
    }

});



let bubbles = [];

function setup() {
    var myCanvas = createCanvas(600, 400);
    myCanvas.parent("visuals");
    background(150);

    for (let i =0; i<7; i++) {
        let bubble = new Bubble(random(width), random(height), random(10, 50));
        bubbles.push(bubble);
    }

    // another way
    // for (let i =0; i<7; i++) {
    //     bubbles[i] = new Bubble(random(width), random(height), random(10, 50));
    // }
}

function mouseClicked() {
    for ( let i = bubbles.length -1; i>=0; i--) {
        if (bubbles[i].contains(mouseX, mouseY)) {
            bubbles.splice(i, 1);
        } 
    }
}

function draw() {
    background(150);

    for (let i =0; i<bubbles.length; i++) {
        // if (bubbles[i].contains(mouseX, mouseY)) {
        //     bubbles[i].changeAlpha(100);
        // } else {
        //     bubbles[i].changeAlpha(255)
        // }
        
        bubbles[i].move();
        bubbles[i].show();

        let overlapping = false;
        let other;

        for (let p = 0; p<bubbles.length; p++) {
            if(p !== i && bubbles[i].intersects(bubbles[p])) {
                overlapping = true;
                overlapper = p;
            };
        }

        if (overlapping) {

            bubbles.splice(i, 1);
            bubbles.splice(other, 1);
            // bubbles[i].changeAlpha(100);
        } 
        
    }


}

class Bubble {
    constructor(x, y, r) {                        
        this.x = x;                   // this is a keyword, referring that 'x' is an eigenschap of the Bubble
        this.y = y;
        this.r = r;
        this.cr = random(255);
        this.cg = random(255);
        this.cb = random(255);
        this.growth = 0;
        this.speed = 1;
        this.alpha = 255;
    };



    contains(mx, my) {              // checks if the mouse contains a bubble
        let d = dist(mx, my, this.x, this.y);
        return (d < this.r);        // returns bolean
    };

    intersects(other) {
        let d = dist(this.x, this.y, other.x, other.y);
        return (d< this.r + other.r);
    }

    changeAlpha(bright) {
        this.alpha = bright;
    }

    pop(mx, my) {
        
    }

    move() {
        this.x = this.x + random(-2, 2);

        if (this.y>height) {
            this.speed = -1;
        } else if (this.y<0) {
            this.speed = 1;
        }
        this.y = this.y + this.speed;

    };

    show() {
        noStroke();
        fill(this.cr, this.cg, this.cb, this.alpha);
        ellipse(this.x, this.y, this.r*2);
    }


}



