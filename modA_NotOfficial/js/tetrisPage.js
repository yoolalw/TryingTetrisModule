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



function tetris() {

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


    const cellW = 60
    const cellH = 80

    function drawPeca(x, y, height, width, color) {

        context.fillStyle = color
        context.fillRect(x, y, height, width)

    }

    const peca1 = {
        x: 0,
        y: 60,
        width: cellH * 3,
        height: cellW,
        speed: 2,
        color: "#A2DED0"
    }

    const peca1_top = {
        x: 160,
        y: 0,
        width: cellH,
        height: cellW,
        speed: 2,
        color: "#A2DED0"
    }

    console.log("a")
    function anim() {
        context.clearRect(0, 0, myCanvas.width, myCanvas.height);
        context.fillStyle = "blue"

        drawGrid(2, 80, 60, "#333333")
        drawPeca(peca1.x, peca1.y, peca1.width, peca1.height, peca1.color)
        drawPeca(peca1_top.x, peca1_top.y, peca1_top.width, peca1_top.height, peca1_top.color)


        if (peca1.y + peca1.height < myCanvas.height) peca1.y += peca1.speed
        if (peca1_top.y + peca1_top.height < peca1.y) peca1_top.y += peca1_top.speed

        requestAnimationFrame(anim)
    }
    anim()
} 