console.log("aaaa")

let tetrisContainer = document.querySelector('#tetris');
let context = tetrisContainer.getContext('2d');

var windowHeight = window.innerHeight
var windowWidth = window.innerWidth

tetrisContainer.width = windowWidth
tetrisContainer.height = windowHeight


context.fillStyle = "#fff"

context.fillRect(0, 0, 800, 500)

context.beginPath();
context.strokeStyle = "red"
context.lineWidth = 20
context.arc(100, 400, 50, 0, Math.PI * 2, false)
context.stroke()
context.closePath()

class Circle {
    constructor(xpos, ypos, radius, color, text, speed) {
        this.xpos = xpos
        this.ypos = ypos
        this.radius = radius
        this.color = color
        this.text = text
        this.speed = speed

        this.dx = 1 * this.speed
        this.dy = 1 * this.speed
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

    update() {
        
        this.draw(context);

        if ((this.xpos + this.radius) > windowWidth) {
            this.dx = -this.dx;
            this.draw(context)
        }

        if ((this.xpos - this.radius) < 0) {
            this.dx = -this.dx;

            this.draw(context)
        }

        if ((this.ypos - this.radius) < 0) {
            this.dy = -this.dy;
            this.draw(context)
        }

        if ((this.ypos + this.radius) > windowHeight) {
            this.dy = -this.dy
            this.draw(context)
        }

        this.xpos += this.dx;
        this.ypos += this.dy;
    }

}

let circleCounter = 1;

let allCircles = []

let randomX = Math.random() * windowHeight
let randomY = Math.random() * windowWidth
let myCircle = new Circle(100, 100, 50, "black", circleCounter++, 3)
let myCircle2 = new Circle(70, 300, 50, "black", circleCounter++, 3)


let updateCircle = function () {

    context.clearRect(0, 0, windowWidth, windowHeight)

    myCircle.update()

    myCircle2.update()
    

    requestAnimationFrame(updateCircle);

}

updateCircle()

/*
for (var numbers = 0; numbers < 10; numbers++) {
    let randomX = Math.random() * windowHeight
    let randomY = Math.random() * windowWidth
    let myCircle = new Circle(randomX, randomY, 50, "black", circleCounter, 1)
    allCircles.push(myCircle);
    createCircles(allCircles[numbers]);
    circleCounter++;
}

*/