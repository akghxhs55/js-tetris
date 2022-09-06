'use strict';


let game = document.getElementById('game');

let gameTable = document.createElement('table');
gameTable.className = 'game-table';
game.appendChild(gameTable);

let unit = +game.clientWidth / 10;

for (let i = 2; i < ROWS; i++) {
    let row = document.createElement('tr');
    gameTable.appendChild(row);

    for (let j = 0; j < COLS; j++) {
        let cell = document.createElement('td');
        row.appendChild(cell);

        let div = document.createElement('div');
        div.className = 'cell';
        div.dataset.type = '0';
        div.style.top = (i - 2) * unit + 'px';
        div.style.left = j * unit + 'px';
        cell.appendChild(div);

        let img = document.createElement('img');
        img.src = 'img/block_0.png';
        img.style.width = unit + 'px';
        img.style.height = unit + 'px';
        div.appendChild(img);
    }
}


let nowGame = newGame();
nowGame.gameTable = gameTable;

updateScreen(nowGame);