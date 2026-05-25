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

    let pecas = [
        {id: "1", width: cellWidth, height: cellHeight, color: "red", text: "I"},
        {id: "2", width: cellWidth, height: cellHeight, color: "blue", text: "O"},
        {id: "3", width: cellWidth, height: cellHeight, color: "green", text: "T"},
    ]
    
}
drawGrid(2, 80, 60, "black")

