//cria um bloco especifico com base nas coordenadas dele

class Block {
    constructor(x, y, color) {
        this.x = x
        this.y = y
        this.color = color
    }

    draw() {
        push()
        let s = width / 12
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
                blocks = [new Block(0, 1), new Block(1, 1), new Block(0, 1), new Block(0, -1)];
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
        return new Mov(this.x, this.y, this.color, this.shape);
    }
}

class Field {

    constructor() {
        this.tiles = [
            [0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0],
            [1, 1, 1, 1, 1, 1]
        ]
    }


    //faz a verificacao onde se x e y forem menor, vai retornar 1 a cada mov
    tileAt(x, y) {
        if (x < 0 || x >= 6 || y < 0 || y >= 10) return 1;
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
        this.tiles.unshift([0, 0, 0, 0, 0, 0]);
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
        this.mino = Game.makeMino()
        this.minoVx = 0;
        this.minoDrop = false;
        this.minoVr = 0;
        this.field = new Field()
        this.fc = 0;
    }
    static makeMino(){
        return new Mino(5,2,0, floor(random(0,1)))
    }
}


