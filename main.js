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

function moveLeft() {
    //TODO テトロミノを消す処理
    //undraw()

    //左端にない場合は左に動く
    const isAtLeft = current.some(index => ((currentPosition + index) % width === 0))
    if(!isAtLeft) {
        currentPosition -= 1
    }

    //動いた先にテトロミノがある場合は戻る
    if(current.some(index => squares[currentPosition + index].classList.contains('taken'))) {
        currentPosition += 1
    }

    //TODO テトロミノを再描画
    //draw()
}

function moveRight() {
    //TODO テトロミノを消す処理
    //undraw()

    //右端にない場合は右に動く
    const isAtRight = current.some(index => ((currentPosition + index) % width === width - 1))
    if(!isAtRight) {
        currentPosition += 1
    }

    //動いた先にテトロミノがある場合は戻る
    if(current.some(index => squares[currentPosition + index].classList.contains('taken'))) {
        currentPosition -= 1
    }
    
    //TODO テトロミノを再描画
    //draw()
}

function moveDown() {
    //TODO テトロミノを消す処理
    //undraw()
    currentPosition += width;
    //TODO テトロミノを再描画
    //draw()
}