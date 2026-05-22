console.log("aaaa")

let tetrisContainer = document.querySelector('#tetris');
let context = tetrisContainer.getContext('2d');

var windowHeigh = window.innerHeight
var windowWidth = window.innerWidth

tetrisContainer.width = windowWidth

context.fillStyle = "#fff"

context.fillRect(0, 0, 100, 200)

context.beginPath();
context.strokeStyle = "red"
context.lineWidth = 20
context.arc(100, 400, 50, 0, Math.PI * 2, false)
context.stroke()
context.closePath()

class Circle {
    constructor(xpos, ypos, radius, color) {
        this.xpos = xpos
        this.ypos = ypos
        this.radius = radius
        this.color = color
    }

    draw(context) {
        context.beginPath();
        context.lineWidth = 4
        context.arc(this.xpos, this.ypos, this.radius, 0, Math.PI * 2, false)
        context.stroke()
        context.closePath()
    }
}

let allCircles = []

let createCircles = function(circle){
    circle.draw(context)
}

for (var numbers = 0; numbers < 10; numbers++) {
    let randomX = Math.random() * windowWidth
    let randomY = Math.random() * windowHeigh
    let myCircle = new Circle(randomX, randomY, 50, "black")
    allCircles.push(myCircle);
    createCircles(allCircles[numbers]);
}

