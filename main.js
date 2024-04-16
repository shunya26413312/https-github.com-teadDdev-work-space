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