//cria um bloco especifico com base nas coordenadas dele


class Block {
    constructor(x, y, color) {
        this.x = x
        this.y = y
        this.color = color
    }

    draw() {
        push()
        let s = width / 6
        rect(s * this.x, s * this.y, s, s)
        pop()
    }

}

//é a movimentacao que fica de acordo com a coordenada e o tamanho da peça
//sendo criados passando as coordenadas, num switch case, sendo reconhecido tambem como o shape da peça;

class Mov {
    constructor(x, y, shape) {
        this.x = x
        this.y = y
        this.shape = shape
    }


    //funcao de criar repetidamente os blocos passando as coordenadas.

    creatBlocks() {
        let blocks = []
        switch (this.shape) {
            case 1:
                blocks = [new Block(-1, 0), new Block(0, 0), new Block(0, -1), new Block(1, -1)]
                break;

            case 2:
                blocks = [new Block(0, 1), new Block(1, 0), new Block(0, 1), new Block(1, 1), new Block(-1, 1)];
                break;
        }

        // adiciona a movimentacao "somando" e mapeando pra baixo sempre.

        blocks = blocks.map(b =>
            new Block(b.x + this.x, b.y + this.y)
        )
        return blocks;
    }

    //"desenha" a peca na tela, ent "redesenha" a funcao novamente
    //passa um let blocks com a funcao especifica, um for por cima dos blocos
    //e a cada bloco encontrado ele passa um b.draw()
    draw() {
        let blocks = this.creatBlocks();
        for (let b of blocks) {
            b.draw()
        }
    }

    //recria varias peças.
    copy() {
        return new Mov(this.x, this.y, this.shape);
    }
}

class Field {

    constructor() {
        this.tiles = [
            [1, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 1],
            [1, 1, 1, 1, 1, 1]
        ]
    }


    //faz a verificacao onde se x e y forem menor, vai retornar 1 a cada mov
    tileAt(x, y) {
        if (x < 0 || x >= 6 || y < 0 || y >= 11) return 1;
        return this.tiles[y][x];
    }
    //fixa o bloco no campo
    putBlock(x, y) {
        this.tiles[y][x] = 1;
    }

    //encontra uma linha e se ela tiver igual a y, ela avanca ate encontrar uma linha igual a 1    
    findLineFilled() {
        for (let y = 0; y < 10; y++) {
            let isFilled = this.tiles[y].every(t =>
                t === 1);

            if (isFilled) return y;
        }
        return -1;
    }

    cutLine(y) {
        this.tiles.splice(y, 1);
        this.tiles.unshift([1, 0, 0, 0, 0, 1]);
    }
    draw() {
        for (let y = 0; y < 10; y++) {
            for (let x = 0; x < 6; x++) {
                if (this.tileAt(x, y) === 0) continue;
                new Block(x, y).draw();
            }
        }
    }

}
class Game {
    constructor() {
        this.mov = Game.makeMov()
        this.movVx = 0;
        this.movDrop = false;
        this.movV = 0;
        this.field = new Field()
        this.fc = 0;
    }
    static makeMov() { //retorna uma nova atualizacao de lugar e gera aleatoriamente uma das 2 pecas
        return new Mov(2, 2, floor(random(1, 3)))
    }

    // pega os blocos de acordo com o mov e retorna a atualizacao de acordo com a funcao de verificacao, onde ele sempre vai criar onde é 0
    static isMovMovable(mov, field) {
        let blocks = mov.creatBlocks();
        return blocks.every(b => field.tileAt(b.x, b.y) === 0);
    }

    proc() {
        const tryMove = (dx = 0, dy = 0) => {
            const f = this.mov.copy() // cria uma copia atual da peca

            f.x += dx;
            f.y += dy;
            if (Game.isMovMovable(f, this.field)) { // verifica se a copia ta numa posicao valida 
                this.mov.x += dx; // se for valida, modifique
                this.mov.y += dy;
                return true //movimento funcionand
            }
            return false
        }

        if (this.movDrop || (this.fc % 20) === 19) {
            if (!tryMove(0, 1)) {
                //fixa cada bloco no campo
                for (let b of this.mov.creatBlocks())
                    this.field.putBlock(b.x, b.y);
                //cria nova peca aleatoria 
                this.mov = Game.makeMov()
            }
            //remove todas as linhas cheias do field
            let line;
            while ((line = this.field.findLineFilled()) !== -1)
                this.field.cutLine(line);
            //reseta o flag do drop
            this.movDrop = false
        }

        if (this.movVx !== 0) {
            tryMove(this.movVx);
            this.movVx = 0;
        }

        background(64)

        this.mov.draw()
        this.field.draw()

        this.fc++;


    }

}
let game;

function keyPressed() {
    if (keyCode === 65) game.movVx = -1
    if (keyCode === 68) game.movVx = 1
    if (keyCode === 83) game.movDrop = true
}

function setup() {
    let canvas = createCanvas(300, 550);
    game = new Game()
}
function draw() {
    game.proc()
}



