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
const canvas = document.getElementById('c')
const ctx = canvas.getContext("2d")


let width = ctx.canvas.width
let height = ctx.canvas.height


function grid(lineWidth, cellWidth, cellHeight, color) {
    ctx.strokeStyle = color
    ctx.lineWidth = lineWidth
    for (let x = 0; x <= width; x += cellWidth) {
        ctx.beginPath()
        ctx.moveTo(x, 0)
        ctx.lineTo(x, height)
        ctx.stroke()
    } for (let y = 0; y <= height; y += cellHeight) {
        ctx.beginPath()
        ctx.moveTo(0, y)
        ctx.lineTo(width, y)
        ctx.stroke()

    }
}

const pecas = [
    { x: 1, y: 0, w: 150, h: 60, cor: '#AED6F1', vel: 15 },
    { x: 200, y: 0, w: 150, h: 60, cor: '#A2DED0', vel: 15 },
    { x: 150, y: 0, w: 75, h: 180, cor: '#333', vel: 15 }
]

document.addEventListener('keydown', e => {
    if (e.key === 'ArrowLeft') pecas[0].x -= 20
    if (e.key === 'ArrowRight') pecas[0].x += 20
    if (e.key === 'ArrowUp') pecas[0].y += 1
})

function draw() {
    ctx.clearRect(0, 0, width, height)
    grid(3, 75, 60, "#333")

    pecas.forEach(p => {
        if (p.y + p.h < height) p.y += p.vel
        if(p.y + p.h < p.h) p.y -= p.vel
        ctx.fillStyle = p.cor
        ctx.fillRect(p.x, p.y, p.w, p.h)
    })
    requestAnimationFrame(draw)
}

draw()