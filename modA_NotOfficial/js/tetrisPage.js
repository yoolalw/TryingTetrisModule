let contReg = document.getElementById("contReg")
let tempoRest = 4

const intervalo = setInterval(() => {
    tempoRest--;

    if (tempoRest > 0) {
        contReg.textContent = tempoRest
    }
    else if(tempoRest == 0){
        contReg.textContent = ""
    }

}, 1000)
