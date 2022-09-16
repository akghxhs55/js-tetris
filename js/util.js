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
    let holdBlock = null;
    let holdUsed = false;
    let pause = false;
    let ghost = new Set();

    return { bag, map, movingBlock, movingRow, movingCol, movingStat, holdBlock, holdUsed, pause, ghost };
}


function isOverlap(game) {
    for (let [dx, dy] of BLOCKSTAT[game.movingBlock][game.movingStat]) {
        let x = game.movingRow + dx;
        let y = game.movingCol + dy;

        if (x < 0 || x >= ROWS || y < 0 || y >= COLS) {
            return true;
        }

        if (game.map[x][y] != 0) {
            return true;
        }
    }

    return false;
}


function isLock(game) {
    game.movingRow++;

    let result = isOverlap(game);

    game.movingRow--;

    return result;
}


function reSizeScreen(game, unit) {
    for (let i = 2; i < ROWS; i++) {
        let cells = game.gameTable.rows[i - 2].cells;
        for (let j = 0; j < COLS; j++) {
            let div = cells[j].firstChild;
            div.style.top = (i - 2) * unit + 'px';
            div.style.left = j * unit + 'px';

            let img = div.firstChild;
            img.style.width = unit + 'px';
            img.style.height = unit + 'px';
        }
    }
}


function updateScreen(game) {
    for (let img of game.ghost) {
        img.remove();
    }
    game.ghost.clear();

    for (let [dx, dy] of BLOCKSTAT[game.movingBlock][game.movingStat]) {
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
            div.firstChild.style.opacity = '1';
            if (div.dataset.type != game.map[i][j]) {
                div.dataset.type = game.map[i][j];
                div.firstChild.src = 'img/block_' + game.map[i][j] + '.png';
            }
        }
    }

    for (let [dx, dy] of BLOCKSTAT[game.movingBlock][game.movingStat]) {
        let x = game.movingRow + dx;
        let y = game.movingCol + dy;
        
        if (x < 0 || x >= ROWS || y < 0 || y >= COLS) {
            continue;
        }

        game.map[x][y] = 0;
    }


    let [originRow, originCol] = [game.movingRow, game.movingCol];
    while (true) {
        game.movingRow++;
        if (isOverlap(game)) {
            game.movingRow--;
            break;
        }
    }

    for (let [dx, dy] of BLOCKSTAT[game.movingBlock][game.movingStat]) {
        let x = game.movingRow + dx;
        let y = game.movingCol + dy;
        
        if (x < 2 || x >= ROWS || y < 0 || y >= COLS) {
            continue;
        }

        let div = rows[x - 2].cells[y].firstChild;
        
        let ghostImg = document.createElement('img');
        ghostImg.className = 'ghost-img'
        ghostImg.src = 'img/block_' + game.movingBlock + '.png';
        ghostImg.style.width = div.firstChild.style.width;
        ghostImg.style.height = div.firstChild.style.height;
        div.appendChild(ghostImg);

        game.ghost.add(ghostImg);
    }

    [game.movingRow, game.movingCol] = [originRow, originCol];
}