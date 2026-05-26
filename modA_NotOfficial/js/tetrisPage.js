let contReg = document.getElementById("contReg")
let tempoRest = 4

const intervalo = setInterval(() => {
    tempoRest--;

    if (tempoRest > 0) {
        contReg.textContent = tempoRest
    }
    else if (tempoRest == 0) {
        contReg.textContent = ""
        tetris()
        return
    }

}, 1000)


let myCanvas = document.querySelector("#canvas");
let context = myCanvas.getContext("2d");

function drawGrid(lineWidth, cellWidth, cellHeight, color) {
    context.strokeStyle = color;
    context.lineWidth = lineWidth;

    let width = myCanvas.width;
    let height = myCanvas.height;


    for (let x = 0; x <= width; x += cellWidth) {
        context.beginPath()
        context.moveTo(x, 0);
        context.lineTo(x, height);
        context.stroke()

        for (let y = 0; y <= height; y += cellHeight) {
            context.beginPath()
            context.moveTo(0, y)
            context.lineTo(width, y)
            context.stroke()

        }
    }
}
drawGrid(2, 80, 60, "#333333")

function tetris() {

    const cellW = 60
    const cellH = 80

    function drawPeca(x, y, height, width, color) {

        context.fillStyle = color
        context.fillRect(x, y, height, width)

    }

    const pecas = [
        {
            x: 0,
            y: 0,
            width: cellH * 3,
            height: cellW,
            speed: 0.5,
            color: "#A2DED0"
        },
        {
            x: 100,
            y: 0,
            width: cellH,
            height: cellW * 3,
            speed: 0.5,
            color: "#333"
        }
    ]


    document.addEventListener("keydown", function (e) {
        pecas.forEach(p => {

            if (e.key === 'w') {
                p.speed += 0.1
            } else if
                (e.key === 'a') {
                if (p.x > 0) p.x -= p.speed

            } else if
                (e.key === 'd') {
                if (p.x + p.width < myCanvas.width) p.x += p.speed
            }
        })
    })

    function spawnPeca() {
        const tipo = pecas[Math.floor(Math.random() * pecas.length)]
        return { 
            x: Math.floor(Math.random() * myCanvas.width - tipo.width),
            y:0, 
            width: tipo.width,
            height: tipo.height,
            speed: 0.5,
            color: tipo.color
        }
    } 
    const spawn = [spawnPeca()]

    console.log("a")
    function anim() {
        context.clearRect(0, 0, myCanvas.width, myCanvas.height);
        context.fillStyle = "blue"


        drawGrid(2, 80, 60, "#333333")

        pecas.forEach((p) => {
            drawPeca(p.x, p.y, p.width, p.height, p.color)
            if (p.y + p.height < myCanvas.height) { 
                p.y += p.speed 
            } else {
                pecas[i] = spawnPeca() }   

        })

        requestAnimationFrame(anim)
    }
    anim()
} 