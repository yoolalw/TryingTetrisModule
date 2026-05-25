let contReg = document.getElementById("contReg")
let tempoRest = 4

const intervalo = setInterval(() => {
    tempoRest--;

    if (tempoRest > 0) {
        contReg.textContent = tempoRest
    }
    else if (tempoRest == 0) {
        contReg.textContent = ""
    }

}, 1000)

let myCanvas = document.querySelector("#canvas");
let context = myCanvas.getContext("2d");

function drawGrid(lineWidth, cellWidth, cellHeight, color, speed) {
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
drawGrid(2, 80, 60, "black")

function drawPeca1(posY) {
    
    let peca1 = [
        { id: "1", width: cellWidth, height: cellHeight, color: "blue", speed: 1 }
    ];
    for (let i = 0; i < peca1.length; i++) {
        let peca = peca1[i]
        context.beginPath()
        context.fillStyle = peca.color
        context.fillRect(cellWidth, cellHeight, peca.width * 3, peca.height)
        context.fillRect(cellWidth * 3, i * cellHeight, peca.width, peca.height)
        dx = 1 * peca.speed
        context.stroke()
    }

}
drawPeca1(0)