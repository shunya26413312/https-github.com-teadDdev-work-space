

document.addEventListener('DOMContentLoaded', () => {
	// create grid
	const grid = document.querySelector('#grid');
	let gridSquares = Array.from({length: 200}, () => document.createElement('div'));
	gridSquares.forEach(square => grid.appendChild(square))

	// create next-grid
	const nextGrid = document.querySelector('#next-grid');
	let nextGridSquares = Array.from({length: 16}, () => document.createElement('div'));
	nextGridSquares.forEach(square => nextGrid.appendChild(square))
});


class Tetrimino {
    constructor(){
        this.Tetrimino =[
            [
                [[0,1],[1,1],[2,1],[3,1]], // 棒形
            [[1,0],[1,1],[2,0],[2,1]], // 正方形
            [[0,1],[1,0],[1,1],[2,0]], // S字
            [[0,0],[1,0],[1,1],[2,1]], // Z字
            [[0,0],[0,1],[1,1],[2,1]], // J字
            [[0,1],[1,1],[2,0],[2,1]], // L字
            [[0,1],[1,0],[1,1],[2,1]] 
            ]
        ];
    // テトリミノの形状
    }

    // ランダムにテトリミノを取得
    static getramdaoTetrimino(){
        let ramdomtetrimino = Math.floor(Math.random()*this.Tetrimino.length)+1;
        return this.Tetrimino[ramdomtetrimino];
}    
    // テトリミノの形状を取得
    static getTypePoint(type) {
        return this.getTypePointArray()[type - 1];
}
    
    
}



class TetrisGame {
    constructor() {
        this.score = 0;
        this.linesCleared = 0;
    }


    // ラインが完成したかどうかをチェックし、スコアを更新
    checkLines() {
        let linesToClear = [];
        for (let y = 0; y < this.gameField.height; y++) {
            let isFullLine = true;
            for (let x = 0; x < this.gameField.width; x++) {
                if (!this.gameField.grid[x][y]) {
                    isFullLine = false;
                    break;
                }
            }
            if (isFullLine) linesToClear.push(y);
        }
        this.clearLines(linesToClear);
    }

    // ラインを消去し、スコアを計算
    clearLines(linesToClear) {
        const scores = {1: 100, 2: 300, 3: 500, 4: 800};
        if (linesToClear.length > 0) {
            for (let y of linesToClear) {
                for (let x = 0; x < this.gameField.width; x++) {
                    this.gameField.grid[x].splice(y, 1);
                    this.gameField.grid[x].unshift(0);
                }
            }
            this.score += scores[linesToClear.length] || 0;
            this.linesCleared += linesToClear.length;
            this.updateScoreBoard();
        }
    }

    // スコアボードを更新
    updateScoreBoard() {
        console.log(`Score: ${this.score}, Lines: ${this.linesCleared}`);
    }
    // ゲームオーバーを判定
    checkGameOver() {
        if (this.gameField.isCollision(this.currentTetrimino)) {
            this.gameOver();
        }
    }

    // ゲームオーバー時の処理
    gameOver() {
        console.log("Game Over");
        console.log(`Final Score: ${this.score}`);
        // ゲームオーバー画面表示やリスタートのためのUI更新
    }

    // タイマーによるテトリミノの自動落下
    startGame() {
        this.timer = setInterval(() => {
            if (!this.moveDown()) {
                this.fixTetrimino();
                this.checkLines();
                this.checkGameOver();
                if (!this.isGameOver) {
                    this.spawnNewTetrimino();
                }
            }
        }, this.downTime);
    }

    // ゲームの一時停止と再開
    pauseGame() {
        clearInterval(this.timer);
    }

    resumeGame() {
        this.startGame();
    }
}

