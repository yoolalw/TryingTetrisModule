console.log("aaaa")

let tetrisContainer = document.querySelector('#tetris');
let context = tetrisContainer.getContext('2d');

var windowHeight = window.innerHeight
var windowWidth = window.innerWidth

tetrisContainer.width = windowWidth

context.fillStyle = "#fff"

context.fillRect(0, 0, 100, 400)

context.beginPath();
context.strokeStyle = "red"
context.lineWidth = 20
context.arc(100, 400, 50, 0, Math.PI * 2, false)
context.stroke()
context.closePath()

class Circle {
    constructor(xpos, ypos, radius, color, text) {
        this.xpos = xpos
        this.ypos = ypos
        this.radius = radius
        this.color = color
        this.text = text
    
    }


    draw(context) {
        context.beginPath();
        
        context.fillText(this.text, this.xpos, this.ypos)
        context.textAlign = "center"
        context.textBaseline = "middle"
        context.font = "20px Arial"

        context.lineWidth = 4
        context.arc(this.xpos, this.ypos, this.radius, 0, Math.PI * 2, false)
        context.stroke()
        context.closePath()
    }

}

let circleCounter = 1;

let allCircles = []

let createCircles = function(circle){
    circle.draw(context)
}

for (var numbers = 0; numbers < 10; numbers++) {
    let randomX = Math.random() * windowHeight
    let randomY = Math.random() * windowWidth
    let myCircle = new Circle(randomX, randomY, 50, "black", circleCounter)
    allCircles.push(myCircle);
    createCircles(allCircles[numbers]);
    circleCounter++;
}

