'use strict';


function newBag() {
    let array = [];

    for (let i = 1; i <= 7; i++) {
        array.push(i);
    }

    for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }

    return array;
}


function newGame() {
    let bag = newBag().concat(newBag());

    let map = [];
    for (let i = 0; i < ROWS; i++) {
        map[i] = [];
        for (let j = 0; j < COLS; j++) {
            map[i][j] = 0;
        }
    }

    let movingBlock = bag.pop();
    let movingRow = 2;
    let movingCol = 4;
    let movingStat = 0;

    return { bag, map, movingBlock, movingRow, movingCol, movingStat };
}


function updateScreen(game) {
    for (let [dx, dy] of blockStat[game.movingBlock][game.movingStat]) {
        let x = game.movingRow + dx;
        let y = game.movingCol + dy;
        
        if (x < 0 || x >= ROWS || y < 0 || y >= COLS) {
            continue;
        }

        game.map[x][y] = game.movingBlock;
    }

    let rows = game.gameTable.rows;
    for (let i = 2; i < ROWS; i++) {
        let cells = rows[i - 2].cells;
        for (let j = 0; j < COLS; j++) {
            let div = cells[j].firstChild;
            if (div.dataset.type != game.map[i][j]) {
                div.dataset.type = game.map[i][j];
                div.firstChild.src = 'img/block_' + game.map[i][j] + '.png';
            }
        }
    }

    for (let [dx, dy] of blockStat[game.movingBlock][game.movingStat]) {
        let x = game.movingRow + dx;
        let y = game.movingCol + dy;
        
        if (x < 0 || x >= ROWS || y < 0 || y >= COLS) {
            continue;
        }

        game.map[x][y] = 0;
    }
}