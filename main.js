document.addEventListener('DOMContentLoaded', () => {
	// create grid
	const grid = document.querySelector('#grid');
	let gridSquares = Array.from({length: 200}, () => document.createElement('div'));
	gridSquares.forEach(square => grid.appendChild(square))
	const startBtn = document.getElementById('start-button');

	for (var i = 90; i < 100 ; i++ ){
		gridSquares[i].classList.add('tetromino');
	}

	// create next-grid
	const nextGrid = document.querySelector('#next-grid');
	let nextGridSquares = Array.from({length: 16}, () => document.createElement('div'));
	nextGridSquares.forEach(square => nextGrid.appendChild(square))	

	const colors = [
		'orange',
    	'red',
    	'purple',
    	'green',
    	'blue',
    	'yellow'
	]

	//ボタン押下時のアクション定義
	document.addEventListener('keydown', function(event) {
	    if (event.key == 'ArrowLeft') {
	        moveLeft();
	    } else if (event.key == 'ArrowRight') {
	        moveRight();
	    } else if (event.key == 'ArrowUp') {
	        rotate();
	    } else if (event.key == 'ArrowDown') {
	        moveDown();
	    }
	});

	startBtn.addEventListener('click', () => {
		if (timerId) {
		  clearInterval(timerId)
		  timerId = null
		} else {
		  draw()
		  timerId = setInterval(moveDown, 1000)
		  nextRandom = Math.floor(Math.random()*tetoriminos.length)
		  displayNextTeto()
		}
	})

	//画面の幅
	const width = 10;
	//次のテトリミノ表示グリッド幅
	const dispWidth = 4;
	const dispIndex = 0;

	//L字型テトリミノ
	const lTetorimino = [
		[0, width, width * 2, width * 2 + 1],
		[0, 1, 2, width * 1 + 2],
		[1, width + 1, width * 2 + 1, width * 2],
		[0, 1, 2, width]
	]

	//O字型テトリミノ
	const oTetorimino = [
		[1, 2, 1 + width, 2 + width],
		[1, 2, 1 + width, 2 + width],
		[1, 2, 1 + width, 2 + width],
		[1, 2, 1 + width, 2 + width]
	]

	//S字型テトリミノ
	const sTetorimino = [
		[1, 2, width, width + 1],
		[1, width + 1, width + 2, width * 2 + 2],
		[1, 2, width, width + 1],
		[1, width + 1, width + 2, width * 2 + 2]
	]

	//Z字型テトリミノ
	const zTetrimino = [
		[0, 1, width + 1, width + 2],
		[2, width + 1, width + 2, width * 2 + 1],
		[0, 1, width + 1, width + 2],
		[2, width + 1, width + 2, width * 2 + 1]
	];

	//I字型テトリミノ
	const iTetorimino = [
		[0, width, width * 2, width * 3],
		[0, 1, 2, 3],
		[0, width, width * 2, width * 3],
		[0, 1, 2, 3]
	]

	//T字型テトリミノ
	const tTetrimino = [
		[1, width, width + 1, width + 2],
		[1, width + 1, width + 2, width * 2 + 1], 
		[width, width + 1, width + 2, width * 2 + 1], 
		[1, width, width + 1, width * 2 + 1]
	];

	const tetoriminos = [lTetorimino,oTetorimino,sTetorimino,zTetrimino,iTetorimino,tTetrimino];

	let timerId;
	let nextRandom = Math.floor(Math.random() * tetoriminos.length);

	//最初に描画される際の場所を設定
	let currentPosition = 4;
	//回転時の変数
	let currentRotation = 0;

	//どのテトロミノが出力されるかをランダムに決める
	let random = Math.floor(Math.random()*tetoriminos.length)
	let currentTeto = tetoriminos[random][currentRotation];

	

	//テトロミノ描画
	function draw() {
		currentTeto.forEach(index => {
			const actualIndex = currentPosition + index;
			if (actualIndex >= 0 && actualIndex < gridSquares.length) {
				gridSquares[actualIndex].classList.add('tetromino');
				gridSquares[actualIndex].style.backgroundColor = colors[random];
			}
		});

		if (chkGameOver()) {
			gameOver();
		}
	}

	//テトロミノ削除
	function undraw() {
		currentTeto.forEach(index => {
			gridSquares[currentPosition + index].classList.remove('tetromino');
			gridSquares[currentPosition + index].style.backgroundColor = '';
		})
	}
	
	function moveLeft() {
		undraw();
		// 左端にいるかチェック
		const isAtLeftEdge = currentTeto.some(index => (currentPosition + index) % width === 0);
		if (!isAtLeftEdge) {
			currentPosition -= 1;
			if (currentTeto.some(index => gridSquares[currentPosition + index].classList.contains('taken'))) {
				// もし移動先に既にブロックがあれば、戻す
				currentPosition += 1;  
			}
		}
		draw();
	}
	
	function moveRight() {
		undraw();
		// 右端にいるかチェック
		const isAtRightEdge = currentTeto.some(index => (currentPosition + index + 1) % width === 0);
		if (!isAtRightEdge) {
			currentPosition += 1;
			if (currentTeto.some(index => gridSquares[currentPosition + index].classList.contains('taken'))) {
				// もし移動先に既にブロックがあれば、戻す
				currentPosition -= 1;  
			}
		}
		draw();
	}

	function freeze() {
		if (currentTeto.some(index => currentPosition + index + width >= gridSquares.length || gridSquares[currentPosition + index + width].classList.contains('taken'))) {
			currentTeto.forEach(index => {
				gridSquares[currentPosition + index].classList.add('taken');
				gridSquares[currentPosition + index].style.backgroundColor = colors[random];
			});
			random = nextRandom;
			nextRandom = Math.floor(Math.random() * tetoriminos.length);
			currentTeto = tetoriminos[random][currentRotation];
			currentPosition = 4;
			displayNextTeto();
			draw();
			deleteLines();
		}
	}
	
	function moveDown() {
		undraw();
		currentPosition += width;
	
		if (!chkCollision()) { 
			currentPosition -= width; 
			freeze(); 
		} else {
			draw(); 
		}
	}
	
	function rotate() {
		undraw();
		const originalRotation = currentRotation;
		currentRotation = (currentRotation + 1) % 4;
		currentTeto = tetoriminos[random][currentRotation];
	
		const offset = currentTeto.some(index => (currentPosition + index) % width === 0) ? 1 : currentTeto.some(index => (currentPosition + index) % width === width - 1) ? -1 : 0;
		currentPosition += offset;
	
		if (!chkCollision()) {
			currentRotation = originalRotation;
			currentTeto = tetoriminos[random][currentRotation];
			currentPosition -= offset;
		}

		draw();
	}

	//衝突判定
	function chkCollision() {
    for (let index of currentTeto) {
        let nextPosition = currentPosition + index;
        if (nextPosition < 0 || nextPosition >= gridSquares.length || gridSquares[nextPosition].classList.contains('taken')) {
			// 衝突発生
            return false; 
        }
    }
    return true; // 衝突なし
}
//次のテトリスを表示する
function displayNextTeto() {
	nextGridSquares.forEach(square => {
		square.classList.remove('tetromino');
		square.style.backgroundColor = '';
	});

	let nextTetrimino = tetoriminos[nextRandom][0];
	nextTetrimino.forEach(index => {
		 // 元のグリッドの x 座標
		let x = index % width;
		 // 元のグリッドの y 座標
		let y = Math.floor(index / width);
		 // nextGrid でのインデックス
		let nextIndex = x + y * dispWidth;

		if (nextIndex < nextGridSquares.length) {
			nextGridSquares[nextIndex].classList.add('tetromino');
			nextGridSquares[nextIndex].style.backgroundColor = colors[nextRandom];
		}
	});
}

function chkGameOver() {
	return currentTeto.some(index => gridSquares[currentPosition + index].classList.contains('taken'));
}

function gameOver() {
	clearInterval(timerId);
	alert('Game Over');
}

function deleteLines() {
    let linesCleared = 0;
    for (let y = 0; y < 20; y++) {
      let blockCount = 0;
      for (let x = 0; x < width; x++) {
        if (gridSquares[y * width + x].classList.contains('taken')) {
          blockCount++;
        }
      }

      if (blockCount === width) {
        // 埋まった行のブロックを全て削除
        for (let x = 0; x < width; x++) {
          let idx = y * width + x;
          gridSquares[idx].classList.remove('taken', 'tetromino');
          gridSquares[idx].style.backgroundColor = '';
        }

        //上の行を下の行へ移動
        for (let moveY = y; moveY > 0 ; moveY--) {
            for (let x = 0; x < width; x++) {
                let currentIdx = moveY * width + x;
                let aboveIdx = (moveY - 1) * width + x;
                gridSquares[currentIdx].className = gridSquares[aboveIdx].className;
                gridSquares[currentIdx].style.backgroundColor = gridSquares[aboveIdx].style.backgroundColor;
        }

        // 削除した行を配列から削除
        let removedRow = gridSquares.slice(y * width, (y + 1) * width);
        gridSquares.splice(y * width, width);

        for (let x = 0; x < width; x++) {
            let idx = x; // 最上行のインデックス
            gridSquares[idx].classList.remove('taken', 'tetromino');
            gridSquares[idx].style.backgroundColor = '';
        }

    return linesCleared;
        }
    }
}}
});	
