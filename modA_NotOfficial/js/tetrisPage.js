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

const ctx = document.getElementById('c').getContext('2d')

const width = ctx.width
const height = ctx.height

function grid(lineWidth, cellWidth, cellHeight, color){
    ctx.strokeStyle = color
    ctx.lineWidth = lineWidth
    for(x=0;x<=width;x += cellWidth){
        ctx.beginPath()
        ctx.moveTo(x, 0)
        ctx.lineTo(x, height)
        ctx.stroke()
        for(y=0;y<=height;y += cellHeight){
            ctx.beginPath()
            ctx.moveTo(0, y)
            ctx.lineTo(width, y)
            ctx.stroke()
        }
    }
}
grid(2, 80, 60, "#333")

const pecas = [
    { x: 100, y: 0, w: 60, h: 30, cor: 'cyan', vel: 2 },
    { x: 200, y: 0, w: 30, h: 60, cor: 'orange', vel: 3 }
]

document.addEventListener('keydown', e => {
    if (e.key === 'ArrowLeft') pecas[0].x -= 20
    if (e.key === 'ArrowRight') pecas[0].x += 20
    if (e.key === 'ArrowUp') pecas[0].y += 100
})

function draw() {
    ctx.clearRect(0, 0, 300, 600)

    grid(2, 80, 60, "#333")

    pecas.forEach(p => {
        p.y += p.vel
        if (p.y + p.h > 600) p.y = 0

        ctx.fillStyle = p.cor
        ctx.fillRect(p.x, p.y, p.w, p.h)
    })

    requestAnimationFrame(draw)
}

draw()