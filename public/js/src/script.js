"use strict";
var cnv;
var s;
var food;
var boxSize = 10;
function setup() {
    cnv = createCanvas(windowWidth, windowHeight);
    s = new snake();
    frameRate(20);
    fruitLocation();

}
function draw() {
    background(51);
    s.collision()
    s.update();
    s.draw();
    if (s.eat(food)) {
        fruitLocation();
    }

    fill(255, 0, 100)
    rect(food.x, food.y, boxSize, boxSize)
}
function windowResized() {
    s = new snake();
    fruitLocation();
    resizeCanvas(windowWidth, windowHeight);
}
function fruitLocation() {
    food = randomColRow();
}
function keyPressed() {
    switch (keyCode) {
        case UP_ARROW: if (s.ySpeed !== 1) { s.direction(0, -1) }; break;
        case DOWN_ARROW: if (s.ySpeed !== -1) { s.direction(0, 1) }; break;
        case LEFT_ARROW: if (s.xSpeed !== 1) { s.direction(-1, 0) }; break;
        case RIGHT_ARROW: if (s.xSpeed !== -1) { s.direction(1, 0) }; break;
    }
}
function mousePressed() {
    s.points++;
}
function restart() {
    alert('You lost!')
    s = new snake();
    fruitLocation();
}
function randomColRow() {
    let col = floor(width / boxSize);
    let row = floor(height / boxSize);
    let obj = createVector(floor(random(col)), floor(random(row)));
    obj.mult(boxSize);
    while (obj.x == 0 || obj.y == 0 || obj.x == width - boxSize || obj.y == height - boxSize) {
        col = floor(width / boxSize);
        row = floor(height / boxSize);
        obj = createVector(floor(random(col)), floor(random(row)));
        obj.mult(boxSize);
    }
    return obj;
}
function snake() {
    let init = randomColRow();
    this.x = init.x
    this.y = init.y
    this.xSpeed = 0;
    this.ySpeed = 0;
    this.points = 0;
    this.tail = [];
    this.update = function () {
        if (this.points === this.tail.length) {
            for (let i = 0; i < this.tail.length; i++) {
                this.tail[i] = this.tail[i + 1];
            }
        }
        this.tail[this.points - 1] = createVector(this.x, this.y)
        this.x += (this.xSpeed * boxSize);
        this.y += (this.ySpeed * boxSize);
        this.x = constrain(this.x, 0, width - boxSize)
        this.y = constrain(this.y, 0, height - boxSize)
    };
    this.collision = function () {
        if (this.x == 0 || this.y == 0 || this.x == (width - boxSize) || this.y == (height - boxSize)) {
            restart();
        }
        for (let tail of this.tail) {
            if (tail.x == this.x && tail.y == this.y) {
                restart();
            }
        }
    }
    this.draw = function () {
        fill(255);
        for (let tail of this.tail) {
            rect(tail.x, tail.y, boxSize, boxSize);
        }
        rect(this.x, this.y, 10, 10);
    }
    this.direction = function (x, y) {
        this.xSpeed = x;
        this.ySpeed = y;
    }
    this.eat = function (pos) {
        if (this.x == pos.x && this.y == pos.y) {
            this.points++;
            return true
        } else {
            return false;
        }
    }
}
